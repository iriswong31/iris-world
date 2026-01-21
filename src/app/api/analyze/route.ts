import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      images = [],
      text: userText,
      apiKey: clientApiKey,
      endpointId: clientEndpointId,
      variant
    } = body;

    const apiKey = clientApiKey || process.env.VOLC_API_KEY;
    const endpointId = clientEndpointId || process.env.VOLC_ENDPOINT_ID;

    if ((images.length === 0 && !userText) || !apiKey || !endpointId) {
      return NextResponse.json(
        { error: "Image/Text input, API Key, and Endpoint ID are required" },
        { status: 400 }
      );
    }

    const client = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://ark.cn-beijing.volces.com/api/v3",
    });

    const messages: any[] = [
      {
        role: "system",
        content: `你是一位专业大厨。请根据提供的信息（图片或文字描述）推荐菜谱。
        
        请严格返回纯净 JSON（不含代码块标记）。结构：
        {
          "detectedIngredients": ["食材1","食材2"],
          "recipes": [
            {
              "title": "菜谱名称",
              "time": "30 分钟",
              "servings": "2 人份",
              "ingredients": [
                {"name":"鸡蛋","quantity":"3","unit":"个","needToBuy":false},
                {"name":"西红柿","quantity":"2","unit":"个","needToBuy":true}
              ],
              "calories_kcal": 520,
              "steps": ["第一步说明","第二步说明..."],
              "tips": "可选贴士",
              "shoppingList": [
                {"name":"西红柿","quantity":"2","unit":"个"}
              ]
            }
          ]
        }
        规则：
        - ingredients 需标注数量与单位；若不在用户已有食材中，将 needToBuy 设为 true。
        - shoppingList 列出需要购买的食材及数量单位。
        - calories_kcal 为整道菜约热量（千卡），基于常见食材估算。
        - 若无法识别或生成，返回 {"error":"原因"}。`
      }
    ];

    const userContent: any[] = [];

    if (images && images.length > 0) {
      images.slice(0, 6).forEach((img: string, idx: number) => {
        userContent.push({
          type: "image_url",
          image_url: { url: img }
        });
      });
      userContent.push({ type: "text", text: "请综合分析以上多张图片中的食材。" });
    }

    if (userText) {
      userContent.push({
        type: "text",
        text: `用户补充描述/偏好：${userText}。请务必结合这些要求（如忌口、偏好口味、指定食材等）进行推荐。`
      });
    }
    if (variant) {
      userContent.push({
        type: "text",
        text: "请在以上食材基础上换一批不同的菜谱，不要与之前的组合重复。若无法想到更多，请返回 {\"error\":\"抱歉，我想不到别的食谱了\"}。"
      });
    }

    messages.push({
      role: "user",
      content: userContent
    });

    const completion = await client.chat.completions.create({
      messages: messages,
      model: endpointId,
    });

    let responseText = completion.choices[0].message.content || "";
    
    // Clean up response if it contains markdown code blocks
    responseText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
        const json = JSON.parse(responseText);
        const norm = (s: string) => {
          if (!s) return "";
          let t = s.toLowerCase();
          t = t.replace(/[（）()]/g, "");
          t = t.replace(/\s+/g, "");
          t = t.replace(/番茄/g, "西红柿");
          t = t.replace(/鸡胸肉/g, "鸡肉");
          return t;
        };
        const detectedSet = new Set<string>(
          Array.isArray(json.detectedIngredients)
            ? json.detectedIngredients.map((x: string) => norm(String(x)))
            : []
        );
        if (Array.isArray(json.recipes)) {
          json.recipes = json.recipes.map((r: any) => {
            if (Array.isArray(r.ingredients)) {
              r.ingredients = r.ingredients.map((ing: any) => {
                const name = typeof ing === "string" ? ing : ing?.name;
                const n = norm(String(name || ""));
                const matched =
                  detectedSet.has(n) ||
                  Array.from(detectedSet).some((d) => n.includes(d) || d.includes(n));
                if (typeof ing === "object") {
                  return { ...ing, needToBuy: matched ? false : !!ing.needToBuy };
                }
                return ing;
              });
            }
            const toBuy = Array.isArray(r.ingredients)
              ? r.ingredients.filter((x: any) => typeof x === "object" && x.needToBuy)
              : [];
            r.shoppingList = toBuy.map((x: any) => ({
              name: x.name,
              quantity: x.quantity,
              unit: x.unit,
            }));
            return r;
          });
        }
        if (json.error) {
            return NextResponse.json({ error: json.error }, { status: 400 });
        }
        return NextResponse.json(json);
    } catch (e) {
        console.error("JSON parse error:", responseText);
        return NextResponse.json({ error: "Failed to parse AI response. Please try again." }, { status: 500 });
    }

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
