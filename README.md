# Iris World

Iris Wong（@iriswong31）的 AI Coding 作品集。

## 📦 项目结构

```
iris-world/
├── src/                       ← 主项目：Recipe Genius 菜谱生成器（Next.js）
│   ├── app/
│   └── components/
│
├── apps/                      ← 独立作品集（每个一个文件夹）
│   └── family-journey/        ← 亲子旅游攻略平台
│       ├── index.html
│       └── italy/
│           └── index.html
│
├── scripts/
│   └── sync-apps.js           ← 构建时把 apps/ 同步到 public/
│
└── vercel.json                ← URL 路由配置
```

## 🌐 在线访问

| 作品 | 路径 |
|---|---|
| 🍳 Recipe Genius（菜谱生成器） | `/` |
| 🧳 Family Journey（亲子旅游攻略平台） | `/family-journey/` |
| 🇮🇹 ↳ 意大利 10 天攻略 | `/family-journey/italy/` |

## 📝 添加新作品

只需要在 `apps/` 下新建一个文件夹（如 `apps/my-new-app/`），把静态文件放进去：

```bash
mkdir apps/my-new-app
echo "<h1>Hello</h1>" > apps/my-new-app/index.html
```

然后在 `vercel.json` 加路由：

```json
{ "source": "/my-new-app/", "destination": "/my-new-app/index.html" }
```

push 后自动部署到 `<vercel-domain>/my-new-app/`。

## 🛠 本地开发

```bash
npm install
npm run dev    # Next.js 主项目
```

构建时会自动同步 apps/ 到 public/：

```bash
npm run build  # 自动跑 prebuild → sync-apps.js → next build
```

## 🚀 部署

push 到 main 分支，Vercel 自动部署。

---

作者：[@iriswong31](https://github.com/iriswong31) · 腾讯 SSV AI 产品经理
