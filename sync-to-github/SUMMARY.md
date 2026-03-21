# 🎉 Sync to GitHub Skill - 完成总结

恭喜你！技能已经创建完成。以下是完整的使用指南。

## 📦 已创建的文件

```
sync-to-github/
├── index.js                    # 核心代码（7.7KB）
├── package.json                # 依赖配置
├── README.main.md              # 功能概述
├── INSTALL.md                  # ⭐ 安装说明（重要）
├── QUICKSTART.md               # 快速开始
├── SKILL.md                    # 详细技术文档
├── skill.config.example.json   # 配置示例
├── test.js                     # 测试脚本
├── example.md                  # 示例文件
├── .gitignore                  # Git 规则
└── DOCS_INDEX.md               # 文档索引
```

## 🚀 立即开始（3 步安装）

### 第 1 步：安装技能

在项目根目录执行：

```bash
./install-skill.sh sync-to-github ./sync-to-github
```

**这将自动完成：**
- ✅ 复制技能文件到容器
- ✅ 安装 npm 依赖（gray-matter, simple-git）
- ✅ 配置技能目录

### 第 2 步：配置环境变量

编辑 `.env` 文件，添加：

```bash
# ========== Sync to GitHub 技能配置 ==========

# x 项目路径（必填）
SYNC_TO_GITHUB_X_PROJECT_PATH=/home/node/.openclaw/workspace/x-project

# GitHub 仓库（必填）
SYNC_TO_GITHUB_GITHUB_REPO=your-username/your-repo

# GitHub Token（必填）
SYNC_TO_GITHUB_GITHUB_TOKEN=ghp_xxxxxxxxxxxxx

# 分支名称（可选）
SYNC_TO_GITHUB_GITHUB_BRANCH=main

# 默认分类和标签（可选）
SYNC_TO_GITHUB_CATEGORIES=["技术", "博客"]
SYNC_TO_GITHUB_TAGS=["OpenClaw", "自动化"]
```

#### 🔑 获取 GitHub Token

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 勾选 `repo` 权限
4. 生成并复制 Token（格式：`ghp_xxxxx`）
5. 粘贴到 `.env` 的 `SYNC_TO_GITHUB_GITHUB_TOKEN`

### 第 3 步：重启服务

```bash
docker compose restart openclaw-gateway
```

等待 10-15 秒。

## ✅ 验证安装

```bash
# 查看技能列表
docker exec -it openclaw-gateway bash -c "su node -c 'openclaw skills list'"

# 应该能看到 sync-to-github
```

## 💡 开始使用

### 方式 1：通过 AI 对话（推荐）

对 AI 机器人说：

```
请将 a.md 的文章内容同步到 x 项目并推送到 GitHub
```

或者更详细：

```
帮我把这篇文章转换格式后推到 GitHub，分类设为 ["AI","技术"]，标签设为 ["LLM"]
```

### 方式 2：测试脚本

```bash
# 进入容器
docker exec -it openclaw-gateway bash -c "su node"

# 运行测试
cd ~/.openclaw/workspace/skills/sync-to-github
node test.js
```

## 📋 效果演示

### 输入文件 (a.md)

```markdown
# 我的技术文章

介绍 OpenClaw 的使用方法。

## 安装步骤

1. 克隆仓库
2. 安装依赖
3. 配置环境
```

### 输出文件 (2026-03-22-我的技术文章.md)

```markdown
---
title: 我的技术文章
date: 2026-03-22 01:20:00 +0800
categories: [技术，博客]
tags: [OpenClaw, 自动化]
---
# 我的技术文章

介绍 OpenClaw 的使用方法。

## 安装步骤

1. 克隆仓库
2. 安装依赖
3. 配置环境
```

### GitHub 提交记录

```
Commit: 同步：我的技术文章
Author: OpenClaw Sync Bot <openclaw-sync@localhost>
Branch: main
Files: 2026-03-22-我的技术文章.md
```

## 📚 文档导航

| 文档 | 用途 | 阅读时间 |
|------|------|---------|
| **[INSTALL.md](./INSTALL.md)** | ⭐ 安装说明 | 5 分钟 |
| **[QUICKSTART.md](./QUICKSTART.md)** | 快速开始 | 10 分钟 |
| **[SKILL.md](./SKILL.md)** | 详细文档 | 20 分钟 |
| **[README.main.md](./README.main.md)** | 功能概述 | 5 分钟 |
| **[DOCS_INDEX.md](./DOCS_INDEX.md)** | 文档索引 | - |

## 🎯 核心功能

### 1️⃣ 自动格式转换

为 markdown 添加标准 frontmatter：

```yaml
---
title: 标题
date: 2026-03-22 01:20:00 +0800
categories: [分类 1, 分类 2]
tags: [标签 1, 标签 2]
---
```

### 2️⃣ 智能文件命名

格式：`年 - 月-日 - 标题.md`

示例：`2026-03-22-我的文章.md`

### 3️⃣ 本地保存

保存到：`/home/node/.openclaw/workspace/x-project/`

### 4️⃣ GitHub 推送

自动完成：
- Git 初始化
- 添加远程仓库
- 提交变更
- 推送到指定分支

## 🔧 可配置参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `sourcePath` | string | 否 | 源文件路径 |
| `content` | string | 否 | markdown 内容 |
| `title` | string | 否 | 文章标题 |
| `date` | Date | 否 | 文章日期 |
| `categories` | Array | 否 | 分类数组 |
| `tags` | Array | 否 | 标签数组 |
| `commitMessage` | string | 否 | Git 提交信息 |

## 🐛 常见问题

### Q: 技能未识别？

**A**: 
```bash
# 检查安装
docker exec -it openclaw-gateway bash -c "su node -c 'ls -la ~/.openclaw/workspace/skills/'"

# 重启服务
docker compose restart openclaw-gateway
```

### Q: GitHub 推送失败？

**A**: 
- 确认 Token 正确
- 确认有 `repo` 权限
- Token 格式：`ghp_xxxxx`

### Q: 缺少依赖？

**A**: 
```bash
docker exec -it openclaw-gateway bash -c "su node -c 'cd ~/.openclaw/workspace/skills/sync-to-github && npm install'"
```

## 📞 获取帮助

1. **查看日志**：
   ```bash
   docker logs -f openclaw-gateway | grep sync-to-github
   ```

2. **阅读文档**：
   - [INSTALL.md](./INSTALL.md) - 安装问题
   - [SKILL.md](./SKILL.md) - 使用问题

3. **测试功能**：
   ```bash
   node ~/.openclaw/workspace/skills/sync-to-github/test.js
   ```

## 🎓 学习路径

### 初级（10 分钟）
1. 阅读 [INSTALL.md](./INSTALL.md)
2. 执行安装
3. 配置环境变量
4. 对 AI 说指令

### 中级（30 分钟）
1. 阅读 [QUICKSTART.md](./QUICKSTART.md)
2. 尝试自定义参数
3. 运行测试脚本

### 高级（1 小时）
1. 阅读 [SKILL.md](./SKILL.md)
2. 查看 [index.js](./index.js) 源码
3. 根据需求扩展功能

## 🌟 下一步建议

1. ✅ **立即安装**：执行 `./install-skill.sh sync-to-github ./sync-to-github`
2. 📝 **准备测试文件**：创建一个 `a.md` 文件
3. 🧪 **测试功能**：对 AI 说同步指令
4. 🔍 **查看结果**：检查 GitHub 仓库

## 📄 依赖说明

技能使用了以下 npm 包：

- **gray-matter** (^4.0.3) - 解析和生成 frontmatter
- **simple-git** (^3.20.0) - Git 操作

这些依赖会在安装时自动下载。

## 🎉 总结

你现在拥有了一个完整的 OpenClaw 技能，可以：

- ✅ 通过自然语言调用
- ✅ 自动转换 markdown 格式
- ✅ 智能文件命名
- ✅ 保存到本地项目
- ✅ 推送到 GitHub

**开始使用吧！** 🚀

---

**版本**: 1.0.0  
**创建时间**: 2026-03-22  
**兼容**: OpenClaw Docker CN IM  
**技能名称**: sync-to-github

## 🔗 快速链接

- 📥 **安装**：[INSTALL.md](./INSTALL.md)
- 🚀 **使用**：[QUICKSTART.md](./QUICKSTART.md)
- 📚 **文档**：[SKILL.md](./SKILL.md)
- 💻 **源码**：[index.js](./index.js)
