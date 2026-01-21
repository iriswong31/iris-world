import { ChefHat, Clock, Users, List, Sparkles, ShoppingCart } from "lucide-react";

type IngredientItem = string | { name: string; quantity?: number | string; unit?: string; needToBuy?: boolean };

interface Recipe {
  title: string;
  time: string;
  servings: string;
  ingredients: IngredientItem[];
  steps: string[];
  tips?: string;
  shoppingList?: { name: string; quantity?: number | string; unit?: string }[];
  calories_kcal?: number;
}

interface RecipeData {
  detectedIngredients: string[];
  recipes: Recipe[];
}

export default function RecipeDisplay({ data }: { data: RecipeData }) {
  if (!data || !data.recipes) return null;
  const norm = (s: string) => {
    if (!s) return "";
    let t = String(s).toLowerCase();
    t = t.replace(/[（）()]/g, "");
    t = t.replace(/\s+/g, "");
    t = t.replace(/番茄/g, "西红柿");
    t = t.replace(/鸡胸肉/g, "鸡肉");
    return t;
  };
  const detSet = new Set<string>(
    Array.isArray(data.detectedIngredients) ? data.detectedIngredients.map((x) => norm(x)) : []
  );
  const inDetected = (name: string) => {
    const n = norm(name);
    return detSet.has(n) || Array.from(detSet).some((d) => n.includes(d) || d.includes(n));
  };

  const shareRecipeImage = async (recipe: Recipe) => {
    const W = 1080;
    // 先创建一个超高画布用于绘制，最后裁剪
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = W;
    tempCanvas.height = 5000;
    const ctx = tempCanvas.getContext("2d")!;

    // 背景填充
    const g = ctx.createLinearGradient(0, 0, 0, tempCanvas.height);
    g.addColorStop(0, "#fff7ed");
    g.addColorStop(1, "#ffffff");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, tempCanvas.height);

    // 头部渐变条
    const headerGrad = ctx.createLinearGradient(0, 0, W, 0);
    headerGrad.addColorStop(0, "#fb923c");
    headerGrad.addColorStop(1, "#ef4444");
    ctx.fillStyle = headerGrad;
    ctx.fillRect(40, 40, W - 80, 120); // 增加高度

    // 标题
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px system-ui"; // 增大字号
    // 简单的标题换行处理
    const titleWords = recipe.title.split("");
    let titleLine = "";
    let titleY = 115;
    if (ctx.measureText(recipe.title).width > W - 140) {
        // 如果标题太长，简单缩小一点
        ctx.font = "bold 40px system-ui";
    }
    ctx.fillText(recipe.title, 60, titleY);

    // 辅助换行函数
    const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const words = text.split("");
      let line = "";
      for (let i = 0; i < words.length; i++) {
        const test = line + words[i];
        if (ctx.measureText(test).width > maxWidth && i > 0) {
          ctx.fillText(line, x, y);
          line = words[i];
          y += lineHeight;
        } else {
          line = test;
        }
      }
      ctx.fillText(line, x, y);
      return y + lineHeight;
    };

    let y = 200; // 初始 Y 坐标下移

    // Meta 信息
    ctx.font = "30px system-ui"; // 增大字号
    ctx.fillStyle = "#6b7280";
    const meta = [
      `⏱ ${recipe.time}`,
      `👥 ${recipe.servings}`,
      typeof recipe.calories_kcal === "number" ? `✨ ≈${recipe.calories_kcal} kcal` : ""
    ].filter(Boolean).join("    ");
    ctx.fillText(meta, 60, y);
    y += 60; // 增加间距

    // 绘制区块标题的辅助函数
    const drawSectionTitle = (title: string, yPos: number) => {
        // 背景框
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#f97316"; // 橙色边框
        ctx.lineWidth = 3;
        // 阴影
        ctx.shadowColor = "rgba(0,0,0,0.1)";
        ctx.shadowBlur = 10;
        ctx.fillRect(50, yPos, W - 100, 60);
        ctx.shadowBlur = 0;
        ctx.strokeRect(50, yPos, W - 100, 60);
        
        // 文字
        ctx.fillStyle = "#c2410c"; // 深橙色
        ctx.font = "bold 32px system-ui";
        ctx.fillText(title, 70, yPos + 40);
        
        return yPos + 80; // 返回内容开始的 Y
    };

    // 所需食材
    y = drawSectionTitle("所需食材", y);
    y += 20; // 内容与标题的间距

    ctx.font = "28px system-ui"; // 增大正文字号
    ctx.fillStyle = "#374151";
    recipe.ingredients.forEach((ing: IngredientItem) => {
      const isObj = typeof ing === "object";
      const name = isObj ? (ing as any).name : (ing as string);
      const qty = isObj ? (ing as any).quantity : undefined;
      const unit = isObj ? (ing as any).unit : undefined;
      const needRaw = isObj ? !!(ing as any).needToBuy : false;
      // 这里的逻辑与前端展示保持一致：如果识别到了，就不显示“需购买”
      const need = needRaw && !inDetected(String(name));
      
      const line = `${name}${qty ? ` ${qty}` : ""}${unit ? unit : ""}${need ? "（需购买）" : ""}`;
      
      // 绘制圆点
      ctx.beginPath();
      ctx.arc(70, y - 10, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#f97316";
      ctx.fill();

      ctx.fillStyle = "#374151";
      y = wrapText(line, 100, y, W - 200, 48); // 行高 48
      y += 12; // 段间距
    });

    y += 60; // 模块间距大幅增加

    // 烹饪步骤
    y = drawSectionTitle("烹饪步骤", y);
    y += 20;

    ctx.font = "28px system-ui";
    ctx.fillStyle = "#374151";
    recipe.steps.forEach((step, idx) => {
      // 序号
      ctx.fillStyle = "#ef4444";
      ctx.font = "bold 30px system-ui";
      ctx.fillText(`${idx + 1}.`, 60, y);
      
      // 内容
      ctx.fillStyle = "#374151";
      ctx.font = "28px system-ui";
      y = wrapText(step, 110, y, W - 180, 52); // 行高 52
      y += 24; // 步骤间距增加
    });

    y += 60; // 模块间距

    // 大厨贴士
    if (recipe.tips) {
      // 先计算贴士高度
      const tipsYStart = y;
      // 模拟绘制计算高度
      const dummyCtx = document.createElement("canvas").getContext("2d")!;
      dummyCtx.font = "26px system-ui";
      const tipsWords = recipe.tips.split("");
      let tipsLine = "";
      let tipsH = 0;
      const tipsLineHeight = 40;
      // 简单估算高度，或者直接用 wrapText 绘制
      
      // 直接画背景框，假设高度足够或者动态填充
      // 这里采用先画背景，后画文字的方式。为了确定背景高度，我们先“预演”一下 wrapText
      // 但为了简化，我们先画一个带标题的框，然后文字在下面
      
      ctx.fillStyle = "#fefce8"; // 黄色背景
      ctx.strokeStyle = "#fde047";
      ctx.lineWidth = 2;
      
      // 保存当前 Y
      const contentStartY = y + 50;
      
      // 绘制标题
      ctx.fillStyle = "#854d0e";
      ctx.font = "bold 28px system-ui";
      ctx.fillText("💡 大厨贴士", 70, y + 35);
      
      // 绘制内容并更新 Y
      ctx.font = "26px system-ui";
      ctx.fillStyle = "#854d0e";
      const endY = wrapText(recipe.tips, 70, contentStartY + 10, W - 140, 40);
      
      // 回过头画框（利用层级？不行，canvas 是覆盖的）
      // 所以必须先算高度。
      // 重新来：
      // 1. 计算文字高度
      const textHeight = endY - (contentStartY + 10) + 40; // + padding
      const totalBoxHeight = textHeight + 50; // + title height
      
      // 2. 画框
      ctx.globalCompositeOperation = "destination-over"; // 在现有内容下面画
      ctx.fillStyle = "#fefce8";
      ctx.fillRect(50, y, W - 100, totalBoxHeight);
      ctx.strokeStyle = "#fde047";
      ctx.strokeRect(50, y, W - 100, totalBoxHeight);
      ctx.globalCompositeOperation = "source-over"; // 恢复
      
      y = endY + 40;
    }

    y += 80; // 底部留白

    // 裁剪到实际高度
    const finalH = Math.min(y, 5000);
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = W;
    finalCanvas.height = finalH;
    const finalCtx = finalCanvas.getContext("2d")!;
    finalCtx.drawImage(tempCanvas, 0, 0, W, finalH, 0, 0, W, finalH);

    const dataUrl = finalCanvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${recipe.title}.png`;
    a.click();

    if ((navigator as any).canShare && (navigator as any).canShare({ files: [] })) {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `${recipe.title}.png`, { type: "image/png" });
      try {
        await (navigator as any).share({ files: [file], title: recipe.title, text: recipe.title });
      } catch (e) {
        void 0;
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Ingredients Detected */}
      <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
        <h3 className="text-lg font-semibold text-orange-800 mb-2 flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            识别到的食材
        </h3>
        <div className="flex flex-wrap gap-2">
            {data.detectedIngredients.map((ing, idx) => (
                <span key={idx} className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-medium shadow-sm border border-orange-100">
                    {ing}
                </span>
            ))}
        </div>
      </div>

      {/* Recipes List */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">推荐菜谱</h2>
        
        {data.recipes.map((recipe, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white relative">
                    <h3 className="text-2xl font-bold mb-2">{recipe.title}</h3>
                    <div className="flex flex-wrap gap-x-4 text-sm font-medium opacity-90">
                        <span className="flex items-center"><Clock className="w-4 h-4 mr-1"/> {recipe.time}</span>
                        <span className="flex items-center"><Users className="w-4 h-4 mr-1"/> {recipe.servings}</span>
                        {typeof recipe.calories_kcal === "number" && (
                          <span className="flex items-center"><Sparkles className="w-4 h-4 mr-1"/> ≈{recipe.calories_kcal} kcal</span>
                        )}
                    </div>
                    <button
                      onClick={() => shareRecipeImage(recipe)}
                      className="absolute right-4 top-4 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-md text-sm"
                      title="生成分享图片"
                    >
                      分享
                    </button>
                </div>
                
                <div className="p-6 md:p-8 space-y-6">
                    {/* Ingredients List */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <ChefHat className="w-5 h-5 mr-2 text-orange-500" />
                            所需食材
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {recipe.ingredients.map((ing, i) => {
                                const isObj = typeof ing === "object";
                                const name = isObj ? (ing as any).name : (ing as string);
                                const qty = isObj ? (ing as any).quantity : undefined;
                                const unit = isObj ? (ing as any).unit : undefined;
                                const needRaw = isObj ? !!(ing as any).needToBuy : false;
                                const need = needRaw && !inDetected(String(name));
                                return (
                                  <li key={i} className="flex items-start text-gray-600">
                                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-2 shrink-0" />
                                      <span className="flex-1">
                                        <span className="font-medium">{name}</span>
                                        {(qty || unit) && <span className="ml-1 text-gray-500">{qty}{unit}</span>}
                                      </span>
                                      {need && (
                                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                                          需购买
                                        </span>
                                      )}
                                  </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Steps */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <List className="w-5 h-5 mr-2 text-orange-500" />
                            烹饪步骤
                        </h4>
                        <div className="space-y-4">
                            {recipe.steps.map((step, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm">
                                        {i + 1}
                                    </div>
                                    <p className="text-gray-600 pt-1 leading-relaxed">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Shopping List */}
                    {(recipe.shoppingList && recipe.shoppingList.length > 0) && (
                        <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 border border-blue-100">
                            <div className="flex items-center font-semibold mb-2">
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                购物清单
                            </div>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {recipe.shoppingList.map((s, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-2 shrink-0" />
                                        <span className="text-gray-700">{s.name}</span>
                                        {(s.quantity || s.unit) && (
                                          <span className="ml-1 text-gray-500">{s.quantity}{s.unit}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {recipe.tips && (
                        <div className="bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800 border border-yellow-100">
                            <strong>💡 大厨贴士：</strong> {recipe.tips}
                        </div>
                    )}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
