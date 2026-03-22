# 📦 Sync to GitHub Skill - 完整文档索引

欢迎使用 **Sync to GitHub Skill**！这是一个用于将 markdown 文件同步到本地项目并推送到 GitHub 的 OpenClaw 技能。

## 🎯 快速导航

### 🚀 新手入门（按顺序阅读）

1. **[安装说明](./INSTALL.md)** ⭐ 开始之前必读
   - 3 步快速安装
   - GitHub Token 获取指南
   - 验证安装是否成功

2. **[快速开始](./QUICKSTART.md)** 
   - 配置环境变量
   - 第一次使用
   - 示例演示

3. **[功能概述](./README.main.md)**
   - 功能特性介绍
   - 使用方式总览
   - 参数说明

### 📚 深入学习

4. **[详细说明](./SKILL.md)** 
   - 完整的 API 文档
   - 高级用法
   - 故障排查指南
   - 最佳实践

5. **[配置示例](./skill.config.example.json)**
   - OpenClaw 配置模板
   - 可复制的配置代码

### 🧪 实践操作

6. **[测试脚本](./test.js)**
   - 自动化测试
   - 功能验证

7. **[示例文件](./example.md)**
   - 测试用的示例文章
   - 格式参考

## 📁 文件结构

```
sync-to-github/
├── 📄 index.js                    # 核心实现代码
├── 📦 package.json                # npm 依赖配置
├── 📖 README.main.md              # 功能概述（主 README）
├── 🔧 INSTALL.md                  # 安装说明（⭐ 重要）
├── 🚀 QUICKSTART.md               # 快速开始指南
├── 📚 SKILL.md                    # 详细技术文档
├── ⚙️ skill.config.example.json   # OpenClaw 配置示例
├── 🧪 test.js                     # 测试脚本
├── 📝 example.md                  # 示例文件
├── 📄 .gitignore                  # Git 忽略规则
└── 📑 DOCS_INDEX.md               # 本文档（你正在查看）
```

## 🎯 使用场景

### 场景 1：博客自动同步

你写了一篇博客文章 `a.md`，想要：
- 转换为标准格式（带 frontmatter）
- 保存到本地博客项目
- 自动推送到 GitHub Pages

**使用方法**：
```
请将 a.md 的文章内容同步到 x 项目并推送到 GitHub
```

### 场景 2：多平台发布

同一篇文章需要发布到多个平台，每个平台需要不同的分类和标签。

**使用方法**：
```
请同步这篇文章到 GitHub，分类设为 ["AI","技术"]，标签设为 ["LLM","自动化"]
```

### 场景 3：批量处理

有多篇文章需要批量处理。

**使用方法**：
```javascript
const files = ['article1.md', 'article2.md', 'article3.md'];
for (const file of files) {
  await sync.execute({ sourcePath: file });
}
```

## 🔧 核心功能

### 1. 格式转换

自动为 markdown 文章添加标准的 frontmatter：

```markdown
---
title: 标题
date: 2025-11-04 11:00:00 +0800
categories: [分类 1, 分类 1.1]
tags: [标签 1, 标签 2]
---
正文内容
```

### 2. 智能命名

文件名格式：`年 - 月-日 - 标题.md`

示例：`2025-11-04-我的技术文章.md`

### 3. 本地保存

保存到配置的 x 项目目录：
```
/home/node/.openclaw/workspace/x-project/
```

### 4. GitHub 推送

自动完成：
- Git 初始化（如果需要）
- 添加远程仓库
- 提交变更
- 推送到指定分支

## ⚙️ 环境配置

在 `.env` 文件中配置：

```bash
# 必填：x 项目路径
SYNC_TO_GITHUB_X_PROJECT_PATH=/home/node/.openclaw/workspace/x-project

# 必填：GitHub 信息
SYNC_TO_GITHUB_GITHUB_REPO=your-username/your-repo
SYNC_TO_GITHUB_GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
SYNC_TO_GITHUB_GITHUB_BRANCH=main

# 可选：默认分类和标签
SYNC_TO_GITHUB_CATEGORIES=["技术", "博客"]
SYNC_TO_GITHUB_TAGS=["OpenClaw", "自动化"]
```

## 🎓 学习路径

### 初级用户（10 分钟上手）

1. 阅读 [INSTALL.md](./INSTALL.md)
2. 执行安装命令
3. 配置环境变量
4. 对 AI 说："请将 a.md 同步到 x 项目并推送到 GitHub"

### 中级用户（30 分钟掌握）

1. 阅读 [QUICKSTART.md](./QUICKSTART.md)
2. 了解所有配置参数
3. 尝试自定义分类、标签、日期
4. 运行测试脚本验证

### 高级用户（1 小时精通）

1. 阅读 [SKILL.md](./SKILL.md)
2. 查看 [index.js](./index.js) 源码
3. 根据需求修改和扩展功能
4. 集成到自己的项目中

## 🆘 常见问题

### Q1: 如何安装？

**A**: 只需一条命令：
```bash
./install-skill.sh sync-to-github ./sync-to-github
```
详见 [INSTALL.md](./INSTALL.md)

### Q2: GitHub Token 在哪里获取？

**A**: 
1. 访问 https://github.com/settings/tokens
2. 创建新 token，勾选 `repo` 权限
3. 复制并保存到 `.env`

详见 [INSTALL.md](./INSTALL.md#步骤-2 配置环境变量)

### Q3: 如何使用？

**A**: 对 AI 机器人说：
```
请将 a.md 的文章内容同步到 x 项目并推送到 GitHub
```

详见 [QUICKSTART.md](./QUICKSTART.md#五开始使用)

### Q4: 出错了怎么办？

**A**: 
1. 查看 [SKILL.md](./SKILL.md) 的故障排查章节
2. 查看日志：`docker logs -f openclaw-gateway | grep sync-to-github`
3. 检查配置文件是否正确

### Q5: 可以自定义哪些参数？

**A**: 
- 标题、日期
- 分类、标签
- Git 提交信息
- GitHub 分支

详见 [SKILL.md](./SKILL.md#八进阶用法)

## 🎯 下一步

- ✅ **立即安装**：[INSTALL.md](./INSTALL.md)
- 📖 **学习使用**：[QUICKSTART.md](./QUICKSTART.md)
- 🔍 **深入了解**：[SKILL.md](./SKILL.md)
- 💻 **查看源码**：[index.js](./index.js)

## 📞 技术支持

- 📧 问题反馈：查看日志 `docker logs -f openclaw-gateway`
- 📚 完整文档：本目录下所有 `.md` 文件
- 🐛 Bug 报告：检查 [SKILL.md](./SKILL.md) 的故障排查部分

---

**版本**: 1.0.0  
**创建时间**: 2026-03-22  
**兼容**: OpenClaw Docker CN IM  
**作者**: OpenClaw Community

## 🌟 快速链接

| 文档 | 用途 | 推荐阅读时间 |
|------|------|-------------|
| [INSTALL.md](./INSTALL.md) | 安装指南 | 5 分钟 |
| [QUICKSTART.md](./QUICKSTART.md) | 快速开始 | 10 分钟 |
| [SKILL.md](./SKILL.md) | 详细说明 | 20 分钟 |
| [README.main.md](./README.main.md) | 功能概述 | 5 分钟 |

**开始你的同步之旅吧！** 🚀
