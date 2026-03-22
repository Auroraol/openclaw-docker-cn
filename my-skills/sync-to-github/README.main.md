# 🎯 Sync to GitHub Skill

一个用于将 markdown 文件同步到本地项目并推送到 GitHub 的 OpenClaw 技能。

## ✨ 功能特性

- 📝 **自动格式转换**：为 markdown 文章添加标准的 frontmatter 元数据
- 📁 **智能文件命名**：按照 `年 - 月-日 - 标题.md` 格式自动生成文件名
- 💾 **本地保存**：保存到指定的 x 项目目录
- 🚀 **GitHub 推送**：自动提交并推送到 GitHub 仓库
- 🔧 **灵活配置**：支持自定义分类、标签、日期等参数
- 🤖 **AI 调用**：可通过自然语言指令触发

## 📦 安装

### 快速安装

```bash
# 在项目根目录执行
./install-skill.sh sync-to-github ./sync-to-github
```

### 手动安装

```bash
# 复制技能文件到容器
docker cp ./sync-to-github openclaw-gateway:/home/node/.openclaw/workspace/skills/

# 进入容器安装依赖
docker exec -it openclaw-gateway bash -c "su node -c 'cd ~/.openclaw/workspace/skills/sync-to-github && npm install'"
```

## ⚙️ 配置

在 `.env` 文件中添加以下环境变量：

```bash
# x 项目路径（必填）
SYNC_TO_GITHUB_X_PROJECT_PATH=/home/node/.openclaw/workspace/x-project

# GitHub 配置（必填）
SYNC_TO_GITHUB_GITHUB_REPO=your-username/your-repo
SYNC_TO_GITHUB_GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
SYNC_TO_GITHUB_GITHUB_BRANCH=main

# 默认分类和标签（可选）
SYNC_TO_GITHUB_CATEGORIES=["技术", "博客"]
SYNC_TO_GITHUB_TAGS=["OpenClaw", "自动化"]
```

### 获取 GitHub Token

1. 访问 https://github.com/settings/tokens
2. 创建新 token，勾选 `repo` 权限
3. 复制并保存到 `.env` 文件

## 🚀 使用方式

### 通过 AI 对话调用

对 AI 机器人说：

```
请将 a.md 的文章内容同步到 x 项目并推送到 GitHub
```

或更详细的指令：

```
帮我把这篇文章转换格式后推到 GitHub，分类设为 ["AI","技术"]，标签设为 ["LLM"]
```

### 代码调用

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
  commitMessage: '同步文章'
});

// 或直接提供内容
await sync.execute({
  content: '# 标题\n\n正文内容...',
  title: '自定义标题',
  categories: ['分类 1'],
  tags: ['标签 1']
});
```

## 📋 输出示例

### 输入 (a.md)

```markdown
# 我的文章

这是正文内容...
```

### 输出 (2025-11-04-我的文章.md)

```markdown
---
title: 我的文章
date: 2025-11-04 11:00:00 +0800
categories: [技术，博客]
tags: [OpenClaw, 自动化]
---
# 我的文章

这是正文内容...
```

## 🧪 测试

```bash
# 进入容器
docker exec -it openclaw-gateway bash -c "su node"

# 运行测试脚本
cd ~/.openclaw/workspace/skills/sync-to-github
node test.js
```

## 📚 文档

- [快速开始](./QUICKSTART.md) - 详细的安装和使用指南
- [技能说明](./SKILL.md) - 完整功能说明和 API 文档
- [配置示例](./skill.config.example.json) - OpenClaw 配置示例
- [README](./README.md) - 本技能的概述

## 🔧 开发

### 本地测试

```bash
# 安装依赖
npm install

# 运行测试
node test.js
```

### 目录结构

```
sync-to-github/
├── index.js                 # 主要实现
├── package.json            # 依赖配置
├── README.md               # 概述
├── SKILL.md                # 详细说明
├── QUICKSTART.md           # 快速开始
├── skill.config.example.json  # 配置示例
├── test.js                 # 测试脚本
├── example.md              # 示例文件
└── .gitignore
```

## 🎯 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `sourcePath` | string | 否 | 源 markdown 文件路径 |
| `content` | string | 否 | markdown 内容（二选一） |
| `title` | string | 否 | 文章标题（自动提取） |
| `date` | Date | 否 | 文章日期（当前时间） |
| `categories` | Array | 否 | 分类数组 |
| `tags` | Array | 否 | 标签数组 |
| `commitMessage` | string | 否 | Git 提交信息 |

## ⚠️ 注意事项

1. **GitHub Token 权限**：需要 `repo` 完整控制权限
2. **首次使用**：自动创建 x 项目目录和初始化 git 仓库
3. **文件命名**：自动清理标题中的特殊字符
4. **标题提取**：优先从 `# 标题` 提取，否则使用前几行

## 🐛 故障排查

查看日志：

```bash
docker logs -f openclaw-gateway | grep sync-to-github
```

常见问题请参考 [QUICKSTART.md](./QUICKSTART.md#七故障排查)

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**制作**: OpenClaw Skill  
**版本**: 1.0.0  
**最后更新**: 2026-03-22
