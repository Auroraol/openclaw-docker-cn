# Sync to GitHub - 技能使用说明

## 快速开始

### 1. 安装技能

```bash
# 在项目根目录执行
./install-skill.sh sync-to-github ./sync-to-github
```

### 2. 配置环境变量

在 `.env` 文件中添加：

```bash
# ========== Sync to GitHub 技能配置 ==========
# x 项目本地路径（容器内路径）
SYNC_TO_GITHUB_X_PROJECT_PATH=/home/node/.openclaw/workspace/x-project

# GitHub 仓库信息
SYNC_TO_GITHUB_GITHUB_REPO=your-username/your-repo
SYNC_TO_GITHUB_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
SYNC_TO_GITHUB_GITHUB_BRANCH=main

# 默认分类和标签
SYNC_TO_GITHUB_CATEGORIES=["技术", "博客"]
SYNC_TO_GITHUB_TAGS=["OpenClaw", "自动化", "同步"]
```

### 3. 重启服务

```bash
docker compose restart openclaw-gateway
```

### 4. 验证安装

```bash
docker exec -it openclaw-gateway bash -c "su node -c 'openclaw skills list'"
```

## 使用方式

### 方式一：通过自然语言调用

对 AI 机器人说：

```
请将 a.md 的文章内容同步到 x 项目并推送到 GitHub
```

或者：

```
帮我把这篇文章转换格式后推到 GitHub 仓库
```

### 方式二：在代码中调用

```javascript
const SyncToGitHub = require('./sync-to-github');

const sync = new SyncToGitHub({
  xProjectPath: '/path/to/x-project',
  githubRepo: 'username/repo',
  githubToken: 'ghp_xxx'
});

// 从文件读取
await sync.execute({
  sourcePath: './a.md',
  commitMessage: '同步文章：我的标题'
});

// 或直接提供内容
await sync.execute({
  content: '# 我的文章\n\n这是正文内容...',
  title: '我的文章标题',
  categories: ['分类 1', '分类 2'],
  tags: ['标签 1', '标签 2']
});
```

## 输出示例

### 输入 (a.md)

```markdown
# 我的技术文章

这是一篇关于 OpenClaw 的技术文章。

## 正文内容

详细介绍如何使用 OpenClaw...
```

### 输出 (2025-11-04-我的技术文章.md)

```markdown
---
title: 我的技术文章
date: 2025-11-04 11:00:00 +0800
categories: [技术，博客]
tags: [OpenClaw, 自动化，同步]
---
# 我的技术文章

这是一篇关于 OpenClaw 的技术文章。

## 正文内容

详细介绍如何使用 OpenClaw...
```

## 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `sourcePath` | string | 否 | 源 markdown 文件路径 |
| `content` | string | 否 | markdown 内容（与 sourcePath 二选一） |
| `title` | string | 否 | 文章标题（不填则自动提取） |
| `date` | Date/string | 否 | 文章日期（不填则使用当前时间） |
| `categories` | Array | 否 | 分类数组（不填则使用默认值） |
| `tags` | Array | 否 | 标签数组（不填则使用默认值） |
| `commitMessage` | string | 否 | Git 提交信息（不填则自动生成） |

## 注意事项

1. **GitHub Token 权限**：需要 `repo` 权限（完整仓库控制权限）
2. **首次使用**：如果 x 项目目录不存在，会自动创建
3. **Git 初始化**：如果 x 项目不是 git 仓库，会自动初始化并添加远程仓库
4. **文件命名**：自动使用 `年 - 月-日 - 标题.md` 格式
5. **标题提取**：优先从 `# 标题` 提取，如果没有则使用前几行文字

## 故障排查

### 问题 1：推送到 GitHub 失败

**原因**：GitHub Token 无效或权限不足

**解决**：
- 检查 Token 是否正确
- 确保 Token 有 `repo` 权限
- Token 格式应为 `ghp_xxxxxxxxxxxx`

### 问题 2：找不到 x 项目路径

**原因**：环境变量未正确配置

**解决**：
- 检查 `.env` 中的 `SYNC_TO_GITHUB_X_PROJECT_PATH`
- 重启容器使配置生效

### 问题 3：文件格式转换失败

**原因**：缺少依赖包

**解决**：
```bash
docker exec -it openclaw-gateway bash -c "su node -c 'cd ~/.openclaw/workspace/skills/sync-to-github && npm install'"
```

## 高级用法

### 自定义分类和标签

可以在调用时指定：

```
请将 a.md 同步到 GitHub，分类设为 ["AI","技术"]，标签设为 ["LLM","自动化"]
```

### 指定日期

```
请同步 a.md 到 GitHub，日期设为 2025-11-04
```

### 批量处理

可以一次性处理多个文件：

```javascript
const files = ['a.md', 'b.md', 'c.md'];
for (const file of files) {
  await sync.execute({ sourcePath: file });
}
```

## 相关文件

- [`index.js`](./index.js) - 主要实现代码
- [`package.json`](./package.json) - 依赖配置
- [`README.md`](./README.md) - 技能说明
- [`skill.config.example.json`](./skill.config.example.json) - 配置示例

## 技术支持

如有问题，请查看 OpenClaw 日志：

```bash
docker logs -f openclaw-gateway | grep sync-to-github
```
