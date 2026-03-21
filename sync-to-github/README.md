# Sync to GitHub Skill

## 功能说明

此技能用于将 markdown 文件（如 a.md）的内容同步到本地项目，转换格式后推送到 GitHub。

## 使用方法

### 通过 OpenClaw 调用

```
请将 a.md 的文章内容同步到 x 项目并推送到 GitHub
```

### 配置参数

在 `.env` 文件中添加以下配置：

```bash
# Sync to GitHub 技能配置
SYNC_TO_GITHUB_X_PROJECT_PATH=/path/to/your/x-project
SYNC_TO_GITHUB_GITHUB_REPO=your-username/your-repo
SYNC_TO_GITHUB_GITHUB_TOKEN=your-github-token
SYNC_TO_GITHUB_GITHUB_BRANCH=main
SYNC_TO_GITHUB_CATEGORIES=["分类 1", "分类 1.1"]
SYNC_TO_GITHUB_TAGS=["标签 1", "标签 2"]
```

## 输出格式

转换后的 markdown 文件格式：

```markdown
---
title: 标题
date: 2025-11-04 11:00:00 +0800
categories: [分类 1, 分类 1.1]
tags: [标签 1, 标签 2]
---
正文内容
```

## 文件名规则

文件名格式：`年 - 月份 - 日 - 文章名.md`

示例：`2025-11-04-我的文章.md`
