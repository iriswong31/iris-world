"use client";

import { useMemo, useState } from "react";
import VoiceInput from "@/components/VoiceInput";
import { Loader2, CheckCircle2, ArrowRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";

type FlagData = {
  antiVision: string;
  vision: string;
  yearlyGoals: string[];
  monthlyProjects: string[];
  dailyActions: string[];
  principles: string[];
};

type Question = {
  id: string;
  label: string;
  placeholder: string;
  stage: number;
};

export default function FlagPage() {
  const questions: Question[] = useMemo(
    () => [
      { id: "antiVision", label: "反愿景：如果不改变，最糟糕的几年会是什么样？", placeholder: "用一两句话描述你绝不想成为的状态", stage: 1 },
      { id: "vision", label: "愿景：2026 年底你希望成为怎样的人？", placeholder: "用身份化语言描述，例如：我是一个...", stage: 1 },
      { id: "goal1", label: "年度目标 1", placeholder: "例如：健康体脂 ≤ 18%", stage: 2 },
      { id: "goal2", label: "年度目标 2", placeholder: "例如：关键职业里程碑达成", stage: 2 },
      { id: "goal3", label: "年度目标 3", placeholder: "例如：高质量亲密关系维护", stage: 2 },
      { id: "proj1", label: "月度项目（目标1）", placeholder: "例如：每月完成 4 次力量训练周期", stage: 3 },
      { id: "proj2", label: "月度项目（目标2）", placeholder: "例如：每月产出 2 篇行业洞察", stage: 3 },
      { id: "proj3", label: "月度项目（目标3）", placeholder: "例如：每月 2 次深度交流", stage: 3 },
      { id: "daily1", label: "每日行动 1", placeholder: "例如：30 分钟晨间力量训练", stage: 4 },
      { id: "daily2", label: "每日行动 2", placeholder: "例如：晚间 20 分钟反思复盘", stage: 4 },
      { id: "daily3", label: "每日行动 3", placeholder: "例如：阅读 20 分钟专业书籍", stage: 4 },
      { id: "principle1", label: "底线原则 1", placeholder: "例如：不熬夜；原则性拒绝无效社交", stage: 4 },
      { id: "principle2", label: "底线原则 2", placeholder: "例如：每日只做 3 件最重要的事", stage: 4 },
    ],
    []
  );

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [flag, setFlag] = useState<FlagData | null>(null);
  const [exporting, setExporting] = useState(false);

  const stage = questions[current]?.stage ?? 1;
  const progress = Math.round(((current) / questions.length) * 100);

  const onVoiceResult = (text: string) => {
    const q = questions[current];
    if (!q) return;
    setAnswers((prev) => ({ ...prev, [q.id]: text }));
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    }
  };
  const prev = () => {
    if (current > 0) {
      setCurrent((c) => c - 1);
    }
  };

  const finish = async () => {
    setSubmitting(true);
    try {
      const yearlyGoals = [answers.goal1, answers.goal2, answers.goal3].filter(Boolean);
      const monthlyProjects = [answers.proj1, answers.proj2, answers.proj3].filter(Boolean);
      const dailyActions = [answers.daily1, answers.daily2, answers.daily3].filter(Boolean);
      const principles = [answers.principle1, answers.principle2].filter(Boolean);
      const data: FlagData = {
        antiVision: answers.antiVision || "",
        vision: answers.vision || "",
        yearlyGoals,
        monthlyProjects,
        dailyActions,
        principles,
      };
      setFlag(data);
    } finally {
      setSubmitting(false);
    }
  };

  const exportPNG = async () => {
    if (!flag) return;
    setExporting(true);
    try {
      const width = 1200;
      const padding = 32;
      const lineHeight = 38;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const lines: string[] = [];
      const pushBlock = (title: string, items: string[]) => {
        lines.push(title);
        items.forEach((t) => {
          if (!t) return;
          const wrapped = wrapText(t, 28);
          wrapped.forEach((w, idx) => lines.push(idx === 0 ? `• ${w}` : `  ${w}`));
        });
        lines.push("");
      };
      const wrapText = (text: string, maxChars: number) => {
        const arr: string[] = [];
        let s = text.trim();
        while (s.length > maxChars) {
          arr.push(s.slice(0, maxChars));
          s = s.slice(maxChars);
        }
        if (s.length) arr.push(s);
        return arr;
      };
      const title = "2026 Flag";
      const subtitle = flag.vision || "";
      const bodyBlocks: string[] = [];
      const antiWrapped = wrapText(flag.antiVision, 36);
      const contentLines: string[] = [];
      contentLines.push("反愿景");
      antiWrapped.forEach((w, idx) => contentLines.push(idx === 0 ? `• ${w}` : `  ${w}`));
      contentLines.push("");
      const assemble = () => {
        pushBlock("年度目标", flag.yearlyGoals);
        pushBlock("月度项目", flag.monthlyProjects);
        pushBlock("每日行动", flag.dailyActions);
        pushBlock("底线原则", flag.principles);
      };
      assemble();
      const all = [title, subtitle, "", ...contentLines, ...lines];
      const height = padding * 2 + (all.length + 2) * lineHeight;
      canvas.width = width;
      canvas.height = Math.max(600, height);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#111827";
      ctx.font = "bold 48px system-ui, -apple-system, Segoe UI, Roboto";
      ctx.fillText(title, padding, padding + 12);
      ctx.font = "500 28px system-ui, -apple-system, Segoe UI, Roboto";
      ctx.fillStyle = "#f97316";
      ctx.fillText(subtitle, padding, padding + 12 + lineHeight);
      let y = padding + 12 + lineHeight * 3;
      const drawBlockTitle = (t: string) => {
        ctx.fillStyle = "#374151";
        ctx.font = "700 28px system-ui, -apple-system, Segoe UI, Roboto";
        ctx.fillText(t, padding, y);
        y += lineHeight;
      };
      const drawBullet = (t: string) => {
        ctx.fillStyle = "#111827";
        ctx.font = "400 22px system-ui, -apple-system, Segoe UI, Roboto";
        ctx.fillText(t, padding, y);
        y += lineHeight;
      };
      drawBlockTitle("反愿景");
      antiWrapped.forEach((w, idx) => drawBullet(idx === 0 ? `• ${w}` : `  ${w}`));
      drawBlockTitle("年度目标");
      flag.yearlyGoals.forEach((t) => {
        wrapText(t, 32).forEach((w, idx) => drawBullet(idx === 0 ? `• ${w}` : `  ${w}`));
      });
      drawBlockTitle("月度项目");
      flag.monthlyProjects.forEach((t) => {
        wrapText(t, 32).forEach((w, idx) => drawBullet(idx === 0 ? `• ${w}` : `  ${w}`));
      });
      drawBlockTitle("每日行动");
      flag.dailyActions.forEach((t) => {
        wrapText(t, 32).forEach((w, idx) => drawBullet(idx === 0 ? `• ${w}` : `  ${w}`));
      });
      drawBlockTitle("底线原则");
      flag.principles.forEach((t) => {
        wrapText(t, 32).forEach((w, idx) => drawBullet(idx === 0 ? `• ${w}` : `  ${w}`));
      });
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "2026-flag.png";
      a.click();
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-orange-600">IRIS出品</h2>
      {!flag && (
        <div className="bg-white rounded-2xl shadow p-6 space-y-6 border border-orange-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              阶段 {stage} / 4
            </div>
            <div className="w-40 h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-orange-500 rounded"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-semibold text-gray-800">{questions[current].label}</div>
            <textarea
              value={answers[questions[current].id] || ""}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, [questions[current].id]: e.target.value }))
              }
              placeholder={questions[current].placeholder}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none min-h-[110px]"
            />
            <div className="flex items-center justify-between">
              <VoiceInput onResult={onVoiceResult} disabled={submitting} />
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  disabled={current === 0}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium border",
                    current === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
                  )}
                >
                  上一题
                </button>
                {current < questions.length - 1 ? (
                  <button
                    onClick={next}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-orange-600 text-white flex items-center gap-2"
                  >
                    下一题
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={finish}
                    disabled={submitting}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium bg-green-600 text-white flex items-center gap-2",
                      submitting && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        生成中
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        完成并生成
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {flag && (
        <div className="bg-white rounded-2xl shadow p-6 space-y-6 border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800">2026 Flag</div>
              <div className="text-orange-600 font-medium">{flag.vision}</div>
            </div>
            <button
              onClick={exportPNG}
              disabled={exporting}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium bg-orange-600 text-white flex items-center gap-2",
                exporting && "opacity-50 cursor-not-allowed"
              )}
            >
              <Download className="w-4 h-4" />
              下载 PNG
            </button>
          </div>
          <Section title="反愿景" items={[flag.antiVision]} />
          <Section title="年度目标" items={flag.yearlyGoals} />
          <Section title="月度项目" items={flag.monthlyProjects} />
          <Section title="每日行动" items={flag.dailyActions} />
          <Section title="底线原则" items={flag.principles} />
          <div className="flex gap-2">
            <button
              onClick={() => setFlag(null)}
              className="px-4 py-2 rounded-full text-sm font-medium border hover:bg-gray-50"
            >
              返回修改
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="space-y-2">
      <div className="text-lg font-semibold text-gray-800">{title}</div>
      <ul className="space-y-2">
        {items.filter(Boolean).map((t, i) => (
          <li key={i} className="flex items-start gap-2 text-gray-700">
            <span className="mt-2 w-2 h-2 rounded-full bg-orange-500" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
