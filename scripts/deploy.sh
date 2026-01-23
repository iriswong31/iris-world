#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${VERCEL_DEPLOY_HOOK_URL:-}" ]]; then
  echo "VERCEL_DEPLOY_HOOK_URL 未设置"
  exit 1
fi

curl -s -X POST "${VERCEL_DEPLOY_HOOK_URL}" > /dev/null
echo "已触发 Vercel 部署"
