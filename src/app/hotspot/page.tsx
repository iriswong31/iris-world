"use client";

import { useMemo, useRef, useState } from "react";
import { Loader2, Play, Pause, Clipboard, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = {
  title: string;
  url: string;
  what_happened: string;
  highlights: string[];
  value_meaning: string;
};
type Summary = {
  date: string;
  theme: string;
  overview: string;
  items: Item[];
  podcastScript: string;
};

export default function HotspotPage() {
  const [urlsText, setUrlsText] = useState("");
  const [theme, setTheme] = useState("行业资讯（创业 / AI / 投资）");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [speaking, setSpeaking] = useState(false);

  const urls = useMemo(
    () =>
      urlsText
        .split(/\n|,|，|；|;|\s+/)
        .map((s) => s.trim())
        .filter((s) => s.startsWith("http")),
    [urlsText]
  );

  const generate = async () => {
    if (urls.length === 0) {
      setError("请至少粘贴一个链接（可多条，换行或逗号分隔）");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls, theme }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error || "生成失败");
      }
      setData(json as Summary);
    } catch (e: any) {
      setError(e?.message || "生成失败");
    } finally {
      setLoading(false);
    }
  };

  const play = () => {
    if (!data?.podcastScript) return;
    try {
      if (synthRef.current) {
        window.speechSynthesis.cancel();
        synthRef.current = null;
      }
      const u = new SpeechSynthesisUtterance(data.podcastScript);
      u.lang = "zh-CN";
      u.rate = 1.02;
      u.pitch = 1.0;
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      synthRef.current = u;
      window.speechSynthesis.speak(u);
      setSpeaking(true);
    } catch {
      setSpeaking(false);
    }
  };
  const pause = () => {
    try {
      window.speechSynthesis.cancel();
    } finally {
      setSpeaking(false);
    }
  };

  const copyScript = async () => {
    if (!data?.podcastScript) return;
    await navigator.clipboard.writeText(data.podcastScript);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-orange-600 mb-4">今日热点播客</h1>
        <p className="text-gray-600 mb-6">
          粘贴你今天关注的文章链接（可多条），点击“生成播客”，快速获取发生了什么、亮点是什么、价值与意义。
        </p>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">主题（可改）</label>
          <input
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        <div className="space-y-4 mt-4">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-orange-500" /> 链接（换行或逗号分隔）
          </label>
          <textarea
            value={urlsText}
            onChange={(e) => setUrlsText(e.target.value)}
            placeholder="https://mp.weixin.qq.com/... \nhttps://example.com/article2 ..."
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none font-mono text-sm"
          />
          <div className="text-xs text-gray-500">当前解析到 {urls.length} 个链接</div>
        </div>

        <div className="mt-6">
          <button
            onClick={generate}
            disabled={loading}
            className={cn(
              "px-4 py-2 rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-colors",
              loading && "opacity-70 cursor-not-allowed"
            )}
          >
            {loading ? <span className="inline-flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> 生成播客</span> : "生成播客"}
          </button>
        </div>

        {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
      </div>

      {data && (
        <div className="bg-orange-50 rounded-2xl p-6 md:p-8 border border-orange-100 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-orange-700">今日综述</h2>
              <p className="text-sm text-gray-600 mt-1">{data.date} · {data.theme}</p>
            </div>
            <div className="flex items-center gap-3">
              {!speaking ? (
                <button onClick={play} className="px-3 py-1 rounded-md bg-orange-600 text-white flex items-center gap-1">
                  <Play className="w-4 h-4" /> 播放
                </button>
              ) : (
                <button onClick={pause} className="px-3 py-1 rounded-md bg-gray-700 text-white flex items-center gap-1">
                  <Pause className="w-4 h-4" /> 停止
                </button>
              )}
              <button onClick={copyScript} className="px-3 py-1 rounded-md bg-white text-orange-700 border border-orange-300 flex items-center gap-1">
                <Clipboard className="w-4 h-4" /> 复制脚本
              </button>
            </div>
          </div>

          <p className="text-gray-700">{data.overview}</p>

          <div className="space-y-6">
            {data.items?.map((it, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border border-orange-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">{it.title || `条目 ${idx + 1}`}</h3>
                  {it.url && <a href={it.url} target="_blank" className="text-sm text-orange-600 underline">原文</a>}
                </div>
                <div className="mt-2 text-gray-700">
                  <div className="mb-2"><span className="font-semibold">发生了什么：</span>{it.what_happened}</div>
                  <div className="mb-2"><span className="font-semibold">亮点：</span>{(it.highlights || []).join("；")}</div>
                  <div><span className="font-semibold">价值与意义：</span>{it.value_meaning}</div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">播客脚本</h3>
            <pre className="bg-white rounded-xl p-4 border border-orange-100 whitespace-pre-wrap text-gray-800 text-sm">{data.podcastScript}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
