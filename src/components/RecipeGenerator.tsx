"use client";

import { useState } from "react";
import ImageUpload from "./ImageUpload";
import RecipeDisplay from "./RecipeDisplay";
import { Loader2, Settings, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RecipeGenerator() {
  const [images, setImages] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_VOLC_API_KEY || "");
  const [endpointId, setEndpointId] = useState(process.env.NEXT_PUBLIC_VOLC_ENDPOINT_ID || "");
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localMode] = useState(false);

  const localAnalyze = async () => {
    if (!inputText.trim() && images.length > 0 && !inputText.trim()) {
      setError("本地模式暂不支持图片自动识别，请填写文字描述中的食材与偏好");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    const known = [
      "土豆","马铃薯","胡萝卜","西红柿","番茄","洋葱","鸡蛋","鸡胸肉","鸡肉",
      "猪肉","牛肉","虾","豆腐","青椒","西兰花","米饭","面条","大蒜","蒜","姜","葱","香菜","蘑菇","玉米"
    ];
    const text = inputText.trim();
    const detectedSet = new Set<string>();
    known.forEach(k => { if (text.includes(k)) detectedSet.add(k === "番茄" ? "西红柿" : k); });

    const prefs = {
      noSpicy: /不辣|清淡|少辣|不要辣/.test(text),
      spicy: /辣|麻辣|重口/.test(text) && !/不辣|清淡|少辣|不要辣/.test(text),
      quick: /快手|快速|省事|简单/.test(text),
    };

    const kcalMap: Record<string, number> = {
      "鸡蛋": 78, "西红柿": 22, "番茄": 22, "土豆": 110, "胡萝卜": 41, "洋葱": 40,
      "豆腐": 76, "米饭": 240, "面条": 260, "橄榄油": 119, "食用油": 119,
      "辣椒": 18, "蒜": 4, "大蒜": 4, "黑胡椒": 0
    };
    const approxCalories = (names: string[]) => {
      let sum = 0;
      names.forEach((n) => { sum += kcalMap[n] ?? 30; });
      return Math.round(sum * (prefs.quick ? 1 : 1.2));
    };

    const ings = Array.from(detectedSet);
    if (ings.length === 0 && !text) {
      setError("请在文本框中输入至少一种食材名称，例如：土豆、鸡蛋、西红柿等");
      setLoading(false);
      return;
    }

    const pickTime = () => (prefs.quick ? "15 分钟" : "25-35 分钟");
    const servings = "2 人份";

    const makeNonSpicy = (t: string) => prefs.noSpicy ? t.replace(/辣|麻辣|剁椒/g, "清淡") : t;
    const addSpicyTip = (t?: string) => {
      if (prefs.spicy) return (t ? t + "。" : "") + "可加入辣椒或豆瓣酱增辣。";
      if (prefs.noSpicy) return (t ? t + "。" : "") + "不吃辣则不加辣椒，改用葱姜提味。";
      return t || "";
    };

    const recipes: any[] = [];

    const has = (x: string) => ings.includes(x);
    const needFlag = (n: string) => !has(n);

    if (has("西红柿") && has("鸡蛋")) {
      recipes.push({
        title: "番茄炒蛋",
        time: pickTime(),
        servings,
        ingredients: [
          { name: "西红柿", quantity: "2", unit: "个", needToBuy: needFlag("西红柿") },
          { name: "鸡蛋", quantity: "3", unit: "个", needToBuy: needFlag("鸡蛋") },
          { name: "葱花", quantity: "适量", needToBuy: needFlag("葱") },
          { name: "食用油", quantity: "2", unit: "汤匙", needToBuy: false },
          { name: "盐", quantity: "1/2", unit: "茶匙", needToBuy: false },
          prefs.spicy
            ? { name: "辣椒", quantity: "少许", needToBuy: needFlag("辣椒") }
            : { name: "白糖", quantity: "1/2", unit: "茶匙", needToBuy: false }
        ],
        steps: [
          "西红柿切块，鸡蛋打散加少许盐",
          "热锅入油，炒蛋至半熟盛出",
          makeNonSpicy("锅中补油，下西红柿翻炒至出汁"),
          "倒回鸡蛋翻匀，调味后起锅",
        ],
        tips: addSpicyTip("可加少许白糖平衡酸味"),
        shoppingList: [
          ...(needFlag("西红柿") ? [{ name: "西红柿", quantity: "2", unit: "个" }] : []),
          ...(needFlag("鸡蛋") ? [{ name: "鸡蛋", quantity: "3", unit: "个" }] : []),
          ...(prefs.spicy && needFlag("辣椒") ? [{ name: "辣椒", quantity: "少许" }] : [])
        ],
        calories_kcal: approxCalories(["西红柿","鸡蛋","食用油"])
      });
    }

    if (has("土豆") && has("胡萝卜")) {
      recipes.push({
        title: "家常土豆胡萝卜炖菜",
        time: pickTime(),
        servings,
        ingredients: [
          { name: "土豆", quantity: "2", unit: "个", needToBuy: needFlag("土豆") },
          { name: "胡萝卜", quantity: "1", unit: "根", needToBuy: needFlag("胡萝卜") },
          { name: "洋葱", quantity: "1/2", unit: "个", needToBuy: needFlag("洋葱") },
          prefs.spicy
            ? { name: "辣椒", quantity: "1", unit: "个", needToBuy: needFlag("辣椒") }
            : { name: "香叶", quantity: "1", unit: "片", needToBuy: false },
          { name: "盐", quantity: "适量", needToBuy: false },
          { name: "食用油", quantity: "1", unit: "汤匙", needToBuy: false },
        ],
        steps: [
          "土豆胡萝卜去皮切块，洋葱切丝",
          makeNonSpicy("锅中入油，下洋葱与香叶炒香"),
          "加入土豆胡萝卜翻炒，倒入没过的水小火炖 15-20 分钟",
          "加盐调味，收汁至粘稠后出锅",
        ],
        tips: addSpicyTip("可加入少量酱油增色"),
        shoppingList: [
          ...(needFlag("土豆") ? [{ name: "土豆", quantity: "2", unit: "个" }] : []),
          ...(needFlag("胡萝卜") ? [{ name: "胡萝卜", quantity: "1", unit: "根" }] : []),
          ...(needFlag("洋葱") ? [{ name: "洋葱", quantity: "1/2", unit: "个" }] : []),
          ...(prefs.spicy && needFlag("辣椒") ? [{ name: "辣椒", quantity: "1", unit: "个" }] : []),
        ],
        calories_kcal: approxCalories(["土豆","胡萝卜","洋葱","食用油"])
      });
    }

    if (recipes.length < 2 && has("豆腐")) {
      recipes.push({
        title: prefs.noSpicy ? "清煎豆腐" : "香煎豆腐辣酱",
        time: pickTime(),
        servings,
        ingredients: [
          { name: "北豆腐", quantity: "1", unit: "块", needToBuy: needFlag("豆腐") },
          { name: "蒜末", quantity: "1", unit: "瓣", needToBuy: needFlag("大蒜") },
          { name: "生抽", quantity: "1", unit: "汤匙", needToBuy: false },
          prefs.spicy
            ? { name: "辣酱", quantity: "1", unit: "汤匙", needToBuy: needFlag("辣酱") }
            : { name: "香油", quantity: "1", unit: "茶匙", needToBuy: false },
          { name: "盐", quantity: "适量", needToBuy: false },
        ],
        steps: [
          "豆腐切厚片，擦干表面水分",
          "平底锅热油，中火煎至两面金黄",
          makeNonSpicy("调入蒜末生抽与香油，翻匀出锅"),
        ],
        tips: addSpicyTip("煎豆腐前擦干可防粘并更酥香"),
        shoppingList: [
          ...(needFlag("豆腐") ? [{ name: "北豆腐", quantity: "1", unit: "块" }] : []),
          ...(needFlag("大蒜") ? [{ name: "大蒜", quantity: "1", unit: "瓣" }] : []),
          ...(prefs.spicy && needFlag("辣酱") ? [{ name: "辣酱", quantity: "1", unit: "汤匙" }] : []),
        ],
        calories_kcal: approxCalories(["豆腐","食用油"])
      });
    }

    if (recipes.length < 2 && has("面条")) {
      recipes.push({
        title: "蒜香意面（中式风）",
        time: pickTime(),
        servings,
        ingredients: [
          { name: "面条", quantity: "200", unit: "g", needToBuy: needFlag("面条") },
          { name: "蒜末", quantity: "2", unit: "瓣", needToBuy: needFlag("大蒜") },
          { name: "橄榄油", quantity: "2", unit: "汤匙", needToBuy: false },
          { name: "盐", quantity: "适量", needToBuy: false },
          prefs.spicy
            ? { name: "干辣椒", quantity: "适量", needToBuy: needFlag("辣椒") }
            : { name: "黑胡椒", quantity: "少许", needToBuy: false },
        ],
        steps: [
          "面条煮至偏硬捞出",
          makeNonSpicy("锅中热油，下蒜末与黑胡椒小火炒香"),
          "倒入面条翻炒，调味后起锅",
        ],
        tips: addSpicyTip("可加西红柿丁提升酸香"),
        shoppingList: [
          ...(needFlag("面条") ? [{ name: "面条", quantity: "200", unit: "g" }] : []),
          ...(needFlag("大蒜") ? [{ name: "大蒜", quantity: "2", unit: "瓣" }] : []),
          ...(prefs.spicy && needFlag("辣椒") ? [{ name: "干辣椒", quantity: "适量" }] : []),
        ],
        calories_kcal: approxCalories(["面条","食用油"])
      });
    }

    if (recipes.length < 2 && has("米饭") && has("鸡蛋")) {
      recipes.push({
        title: "快手蛋炒饭",
        time: "12-15 分钟",
        servings,
        ingredients: [
          { name: "米饭", quantity: "2", unit: "碗", needToBuy: needFlag("米饭") },
          { name: "鸡蛋", quantity: "2", unit: "个", needToBuy: needFlag("鸡蛋") },
          { name: "葱花", quantity: "适量", needToBuy: needFlag("葱") },
          { name: "盐", quantity: "适量", needToBuy: false },
          { name: "食用油", quantity: "1", unit: "汤匙", needToBuy: false },
        ],
        steps: [
          "鸡蛋打散入锅炒至半凝固盛出",
          "锅中入油，下米饭翻散，加入鸡蛋与葱花翻炒",
          "加盐调味，出锅前滴少许香油",
        ],
        tips: "隔夜米饭更松散不粘锅",
        shoppingList: [
          ...(needFlag("米饭") ? [{ name: "米饭", quantity: "2", unit: "碗" }] : []),
          ...(needFlag("鸡蛋") ? [{ name: "鸡蛋", quantity: "2", unit: "个" }] : []),
          ...(needFlag("葱") ? [{ name: "葱", quantity: "适量" }] : []),
        ],
        calories_kcal: approxCalories(["米饭","鸡蛋","食用油"])
      });
    }

    if (recipes.length === 0) {
      recipes.push({
        title: "清炒时蔬拼盘",
        time: pickTime(),
        servings,
        ingredients: [
          { name: "蔬菜", quantity: "300", unit: "g", needToBuy: needFlag("西兰花") && needFlag("青椒") },
          { name: "蒜片", quantity: "1", unit: "瓣", needToBuy: needFlag("大蒜") },
          { name: "盐", quantity: "适量", needToBuy: false },
          { name: "食用油", quantity: "1", unit: "汤匙", needToBuy: false },
        ],
        steps: [
          "蔬菜洗净切片",
          "热锅入油，下蒜片炒香，投入蔬菜大火快炒",
          "加盐调味，保持脆嫩出锅",
        ],
        tips: addSpicyTip("不吃辣则仅用蒜与葱提升香气"),
        shoppingList: [
          ...(needFlag("大蒜") ? [{ name: "大蒜", quantity: "1", unit: "瓣" }] : []),
        ],
        calories_kcal: approxCalories(["蔬菜","食用油"])
      });
    }

    const data = {
      detectedIngredients: ings.length ? ings : ["文本识别的食材"],
      recipes: recipes.slice(0, 2),
    };

    setResult(data);
    setLoading(false);
  };

  const handleAnalyze = async (variant?: boolean) => {
    if (images.length === 0 && !inputText.trim()) return;
    if (localMode) {
      await localAnalyze();
      return;
    }
    if (!apiKey || !endpointId) {
        setShowSettings(true);
        return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images, text: inputText, apiKey, endpointId, variant: !!variant }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl space-y-8 pb-20">
      {/* Settings Toggle */}
      <div className="flex justify-end">
        <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center text-sm text-gray-500 hover:text-orange-600 transition-colors"
        >
            <Settings className="w-4 h-4 mr-1" />
            {(apiKey && endpointId) ? "已配置 API (Doubao)" : "设置豆包 API"}
        </button>
      </div>

      {/* API Key Input */}
      {showSettings && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100 animate-in fade-in slide-in-from-top-2 space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">火山引擎 API Key</label>
                <div className="relative">
                    <input
                        type={showApiKey ? "text" : "password"}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="请输入您的火山引擎 API Key"
                        className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none font-mono text-sm"
                    />
                    <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">模型接入点 ID (Endpoint ID)</label>
                <input
                    type="text"
                    value={endpointId}
                    onChange={(e) => setEndpointId(e.target.value)}
                    placeholder="例如：ep-20250101010101-abcde"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none font-mono text-sm"
                />
            </div>

            <div className="text-xs text-gray-500 mt-3 space-y-2 bg-gray-50 p-3 rounded border border-gray-100">
                <p className="font-medium text-gray-700">🔍 如何获取？</p>
                <ul className="list-disc list-inside space-y-1 ml-1">
                    <li>登录 <a href="https://console.volcengine.com/ark/region:ark+cn-beijing/endpoint" target="_blank" className="underline text-orange-600 font-medium hover:text-orange-700">火山引擎方舟控制台</a>。</li>
                    <li>确保您已开通 <strong>Doubao-Vision-pro</strong> (或类似支持视觉的模型)。</li>
                    <li>复制该模型的 <strong>接入点 ID (Endpoint ID)</strong>。</li>
                    <li>在 <a href="https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey" target="_blank" className="underline text-orange-600 font-medium hover:text-orange-700">API Key 管理</a> 页面获取 API Key。</li>
                </ul>
            </div>
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">1. 输入食材信息</h2>
        <div className="space-y-6">
            <div className="flex items-center justify-end">
                <span className="text-xs text-gray-500">当前使用：豆包 API</span>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">上传图片（可选，可多张）</label>
                <ImageUpload onImagesSelect={setImages} selectedImages={images} />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">文字描述（可选）</label>
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="例如：冰箱里还有一些土豆和胡萝卜，不想吃辣..."
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none min-h-[100px] resize-y"
                />
            </div>
        </div>
        
        {(images.length > 0 || inputText.trim()) && !result && (
            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => handleAnalyze()}
                    disabled={loading || (!apiKey || !endpointId)}
                    className={cn(
                        "px-8 py-4 rounded-full font-bold text-lg text-white shadow-lg transition-all transform hover:scale-105 active:scale-95",
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-orange-200",
                        (!apiKey || !endpointId) && "opacity-50 cursor-not-allowed"
                    )}
                >
                    {loading ? (
                        <span className="flex items-center">
                            <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                            AI 正在分析中...
                        </span>
                    ) : (!apiKey || !endpointId) ? (
                        "请先在上方设置豆包 API"
                    ) : (
                        "生成美味菜谱 🍳"
                    )}
                </button>
            </div>
        )}
        
        {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg text-center border border-red-100">
                {error}
            </div>
        )}
      </div>

      {/* Actions and Result */}
      {result && (
        <div className="space-y-4">
          <div className="flex justify-center gap-3">
            <button
              onClick={() => handleAnalyze(true)}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-medium shadow hover:opacity-95"
            >
              换一批
            </button>
            <button
              onClick={() => {
                setImages([]);
                setInputText("");
                setResult(null);
                setError(null);
              }}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300"
            >
              重新定制美食
            </button>
          </div>
          <RecipeDisplay data={result} />
        </div>
      )}
    </div>
  );
}
