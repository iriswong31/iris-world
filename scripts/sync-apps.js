#!/usr/bin/env node
/**
 * 在 Next.js build 之前，把 apps/ 下所有作品同步到 public/
 *
 * 设计原则：
 * - apps/ 是「作品源代码」目录（按作品分文件夹，方便人工维护）
 * - public/ 是「Vercel 部署托管目录」（自动同步生成）
 * - 这样部署后访问路径是 /<作品名>/ ，每个作品互不干扰
 *
 * 当前作品：
 *   apps/family-journey/  → 部署后访问 /family-journey/
 *
 * 添加新作品：在 apps/ 下新建文件夹，扔静态文件即可，自动部署
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const APPS_DIR = path.join(ROOT, 'apps');
const PUBLIC_DIR = path.join(ROOT, 'public');

if (!fs.existsSync(APPS_DIR)) {
  console.log('[sync-apps] no apps/ directory, skip');
  process.exit(0);
}

// 复制目录递归
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

// 同步每个作品到 public/<作品名>/
const apps = fs.readdirSync(APPS_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

if (apps.length === 0) {
  console.log('[sync-apps] no apps to sync');
  process.exit(0);
}

console.log(`[sync-apps] syncing ${apps.length} app(s) → public/`);
for (const app of apps) {
  const src = path.join(APPS_DIR, app);
  const dest = path.join(PUBLIC_DIR, app);
  // 清空目标目录（避免删除文件后残留）
  if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
  copyDir(src, dest);
  console.log(`  ✓ ${app}/`);
}
console.log('[sync-apps] done');
