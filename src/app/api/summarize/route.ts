import { NextResponse } from "next/server";
import OpenAI from "openai";

type SummarizeReq = {
  urls?: string[];
  theme?: string;
};

const stripHtml = (html: string) => {
  const withoutScripts = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
  const text = withoutScripts.replace(/<\/?[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();
  return text;
};

export async function POST(req: Request) {
  try {
    const body: SummarizeReq = await req.json();
    const urls = Array.isArray(body.urls) ? body.urls.filter(Boolean) : [];
    const theme = body.theme || "行业资讯（创业 / AI / 投资）";

    if (!urls.length) {
      return NextResponse.json({ error: "请提供至少一个链接" }, { status: 400 });
    }

    // Fetch and clean contents
    const contents: { url: string; text: string }[] = [];
    for (const u of urls.slice(0, 8)) {
      try {
        const res = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0 HotspotDigestBot" } });
        const html = await res.text();
        const text = stripHtml(html).slice(0, 15000);
        contents.push({ url: u, text });
      } catch (e) {
        contents.push({ url: u, text: "抓取失败或不可访问" });
      }
    }

    const client = new OpenAI({
      apiKey: process.env.VOLC_API_KEY || "",
      baseURL: "https://ark.cn-beijing.volces.com/api/v3",
    });
    const endpointId = process.env.VOLC_ENDPOINT_ID || "";
    if (!client.apiKey || !endpointId) {
      return NextResponse.json({ error: "服务端未配置 VOLC_API_KEY 或 VOLC_ENDPOINT_ID" }, { status: 500 });
    }

    const messages: any[] = [
      {
        role: "system",
        content:
          `你是一位资深资讯编辑与播客主持人。请基于提供的网页正文，生成“今日热点播客”的结构化总结与播客脚本。
严格返回纯净 JSON：
{
  "date": "YYYY-MM-DD",
  "theme": "主题",
  "overview": "当天总体概览，用两三句话",
  "items": [
    {
      "title": "文章标题或主题",
      "url": "原文链接",
      "what_happened": "发生了什么（事实）",
      "highlights": ["亮点1","亮点2"],
      "value_meaning": "对个人/行业的价值与意义（落地建议可选）"
    }
  ],
  "podcastScript": "适合朗读的中文播客稿，语气亲切简洁，先概览，再分段，结尾给行动建议"
}
规则：
- 只基于提供的正文内容，不要虚构。
- 用中文，短句优先，信息密度高，避免照本宣科。
- 表达要通俗易懂、接地气，可用生活化示例或类比解释关键点。
- 每条 items 的“价值与意义”部分请直给：为什么重要、对个人或创业者有什么启发，一句话行动建议（可选）。
- 每条 items 保持精炼，避免泛泛而谈。
`,
      },
      {
        role: "user",
        content: [
          { type: "text", text: `主题：${theme}` },
          ...contents.map((c) => ({ type: "text", text: `URL: ${c.url}\n正文：${c.text}` })),
        ],
      },
    ];

    const completion = await client.chat.completions.create({
      model: endpointId,
      messages,
    });

    let responseText = completion.choices[0].message.content || "";
    responseText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
      const json = JSON.parse(responseText);
      return NextResponse.json(json);
    } catch {
      return NextResponse.json({ error: "解析模型输出失败，请重试" }, { status: 500 });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "服务器错误" }, { status: 500 });
  }
}
