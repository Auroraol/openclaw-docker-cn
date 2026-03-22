# 快速使用指南

## 📦 一、安装技能

### 方法 1：使用 install-skill.sh 脚本（推荐）

```bash
# 在项目根目录执行
./install-skill.sh sync-to-github ./sync-to-github
```

### 方法 2：手动安装

```bash
# 进入容器
docker exec -it openclaw-gateway bash -c "su node"

# 在容器内复制技能文件
docker cp ./sync-to-github openclaw-gateway:/home/node/.openclaw/workspace/skills/

# 在容器内安装依赖
docker exec -it openclaw-gateway bash -c "su node -c 'cd ~/.openclaw/workspace/skills/sync-to-github && npm install'"
```

## 🔧 二、配置环境变量

编辑 `.env` 文件，添加以下配置：

```bash
# ========== Sync to GitHub 技能配置 ==========

# x 项目本地路径（容器内路径，必填）
SYNC_TO_GITHUB_X_PROJECT_PATH=/home/node/.openclaw/workspace/x-project

# GitHub 仓库信息（必填）
SYNC_TO_GITHUB_GITHUB_REPO=your-username/your-repo
SYNC_TO_GITHUB_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
SYNC_TO_GITHUB_GITHUB_BRANCH=main

# 默认分类和标签（可选）
SYNC_TO_GITHUB_CATEGORIES=["技术", "博客"]
SYNC_TO_GITHUB_TAGS=["OpenClaw", "自动化"]
```

### 获取 GitHub Token

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 选择权限：勾选 `repo` (完整控制私有仓库)
4. 生成后复制 Token（只显示一次）
5. 粘贴到 `.env` 文件的 `SYNC_TO_GITHUB_GITHUB_TOKEN` 中

## 🚀 三、重启服务

```bash
docker compose restart openclaw-gateway
```

等待约 10 秒让服务完全启动。

## ✅ 四、验证安装

```bash
# 查看已安装的技能
docker exec -it openclaw-gateway bash -c "su node -c 'openclaw skills list'"

# 查看技能日志
docker logs -f openclaw-gateway | grep sync-to-github
```

## 💡 五、开始使用

### 方式 1：通过 AI 对话调用

对 AI 机器人说：

```
请将 a.md 的文章内容同步到 x 项目并推送到 GitHub
```

或者更具体的指令：

```
帮我把这篇文章转换格式后推到 GitHub 仓库，分类设为 ["AI","技术"]，标签设为 ["LLM","自动化"]
```

### 方式 2：测试脚本

```bash
# 进入容器
docker exec -it openclaw-gateway bash -c "su node"

# 运行测试
cd ~/.openclaw/workspace/skills/sync-to-github
node test.js
```

## 📋 六、示例演示

### 输入文件 (a.md)

```markdown
# 我的技术博客文章

今天我来介绍如何使用 OpenClaw。

## 什么是 OpenClaw？

OpenClaw 是一个强大的 AI 网关...
```

### 输出文件 (2025-11-04-我的技术博客文章.md)

```markdown
---
title: 我的技术博客文章
date: 2025-11-04 11:00:00 +0800
categories: [技术，博客]
tags: [OpenClaw, 自动化]
---
# 我的技术博客文章

今天我来介绍如何使用 OpenClaw。

## 什么是 OpenClaw？

OpenClaw 是一个强大的 AI 网关...
```

### GitHub 提交记录

```
Commit: 同步：我的技术博客文章
Author: OpenClaw Sync Bot <openclaw-sync@localhost>
Branch: main
```

## 🔍 七、故障排查

### 问题 1：技能未识别

**症状**：AI 无法调用技能

**解决**：
```bash
# 检查技能是否正确安装
docker exec -it openclaw-gateway bash -c "su node -c 'ls -la ~/.openclaw/workspace/skills/'"

# 重启服务
docker compose restart openclaw-gateway
```

### 问题 2：GitHub 推送失败

**症状**：报错 "Authentication failed" 或 "Token invalid"

**解决**：
- 确认 GitHub Token 正确
- 确认 Token 有 `repo` 权限
- Token 格式应为 `ghp_xxxxx`

### 问题 3：找不到 x 项目路径

**症状**：报错 "x project path not configured"

**解决**：
- 检查 `.env` 中的 `SYNC_TO_GITHUB_X_PROJECT_PATH`
- 确保路径是容器内的绝对路径
- 重启容器使配置生效

### 问题 4：依赖包缺失

**症状**：报错 "Cannot find module 'gray-matter'"

**解决**：
```bash
docker exec -it openclaw-gateway bash -c "su node -c 'cd ~/.openclaw/workspace/skills/sync-to-github && npm install'"
```

## 📚 八、进阶用法

### 自定义日期

```
请同步 a.md 到 GitHub，日期设为 2025-11-04 10:30:00
```

### 指定分类和标签

```
请同步这篇文章，分类用 ["教程","AI"]，标签用 ["GPT","开源"]
```

### 批量处理多个文件

创建脚本 `batch-sync.js`：

```javascript
const SyncToGitHub = require('./sync-to-github');
const sync = new SyncToGitHub({});

async function batchSync() {
  const files = ['article1.md', 'article2.md', 'article3.md'];
  
  for (const file of files) {
    console.log(`正在处理：${file}`);
    await sync.execute({ sourcePath: file });
  }
}

batchSync();
```

## 🎯 九、最佳实践

1. **定期备份**：虽然会推送到 GitHub，但建议定期备份 x 项目
2. **测试环境**：先在测试仓库验证，确认无误后再用于生产
3. **Token 安全**：不要将 Token 提交到代码仓库
4. **分支管理**：建议使用独立分支（如 `sync-branch`），审核后再合并到主分支

## 📖 十、相关资源

- [技能源码](./index.js)
- [配置示例](./skill.config.example.json)
- [详细说明](./SKILL.md)
- [测试用例](./test.js)

## 🆘 需要帮助？

查看日志：

```bash
docker logs -f openclaw-gateway 2>&1 | grep -A 5 -B 5 "sync-to-github"
```

或参考完整文档：[SKILL.md](./SKILL.md)
