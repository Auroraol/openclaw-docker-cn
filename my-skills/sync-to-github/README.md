# Sync to GitHub Skill 

## ✨ 新特性

- **GitHub API 直接推送** - 不再依赖 git 命令，避免权限和超时问题
- **智能文件更新** - 自动检测文件是否存在，支持覆盖更新
- **安全推送** - 不会像 `git push -f` 那样覆盖他人提交
- **Fine-grained Token 支持** - 只需要 `contents:write` 权限
- **可配置目标路径** - 支持推送到 `_posts` 等子目录

## 功能说明

此技能用于将 markdown 文件转换格式（添加 frontmatter）后，通过 GitHub API 直接推送到 GitHub 仓库。

## 使用方法

### 通过 OpenClaw 调用

```
请将 a.md 的文章内容同步到 x 项目并推送到 GitHub
```

或：

```
帮我把这篇文章转换格式后推到 GitHub 仓库
```

效果

![image-20260322192317324](https://github.com/Auroraol/Drawing-bed/raw/main/img/image-20260322192317324.png)

### 配置参数

在 `.env` 文件中添加以下配置：

```bash
SKILLS_CONFIG_JSON={
    "sync-to-github": {
        "enabled": true,
        "xProjectPath": "/home/node/.openclaw/workspace/x-project",
        "githubRepo": "your-username/your-repo",
        "githubToken": "ghp_xxxxxxxxxxxxx",
        "githubBranch": "main",
        "targetPath": "_posts",
        "categories": ["技术", "博客"],
        "tags": ["OpenClaw", "自动化"]
    }
}
```

### 参数说明

| 参数 | 必填 | 说明 |
|------|------|------|
| `githubRepo` | **是** | GitHub 仓库名，格式：username/repo |
| `githubToken` | **是** | GitHub Personal Access Token |
| `githubBranch` | 否 | 目标分支，默认 main |
| `targetPath` | 否 | 目标子目录，如 `_posts` |
| `xProjectPath` | 否 | 本地缓存路径 |
| `categories` | 否 | 默认分类 |
| `tags` | 否 | 默认标签 |

## GitHub Token 配置

### Fine-grained Token（推荐）

1. 访问 https://github.com/settings/tokens?type=beta
2. 创建新的 Fine-grained token
3. 选择你的仓库
4. 权限设置：**Contents**: Read and write
4. ![image-20260322194522640](https://github.com/Auroraol/Drawing-bed/raw/main/img/image-20260322194522640.png)

### Classic Token

1. 访问 https://github.com/settings/tokens
2. 生成新的 classic token
3. 勾选 `repo` 权限

## 输出格式

转换后的 markdown 文件格式：

```markdown
---
title: 标题
date: 2025-11-04 11:00:00 +0800
categories: [分类 1, 分类 2]
tags: [标签 1, 标签 2]
---
正文内容
```

## 文件名规则

文件名格式：`年-月-日-文章名.md`

示例：`2025-11-04-我的文章.md`

## 技术实现

- 使用 Node.js 原生 `https` 模块调用 GitHub API
- 使用 `gray-matter` 生成 frontmatter
- 支持文件创建和更新（自动获取文件 sha）
