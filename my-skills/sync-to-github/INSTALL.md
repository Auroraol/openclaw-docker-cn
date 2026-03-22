# 🎯 Sync to GitHub Skill - 安装说明

## 📋 前置要求

- OpenClaw Docker 环境已部署并运行
- 有 GitHub 账号
- 基本的命令行操作知识

## 🚀 快速安装（3 步完成）

### 步骤 1：执行安装命令

在项目根目录运行：

```bash
./install-skill.sh sync-to-github ./sync-to-github
```

**说明**：此命令会自动：
- 复制技能文件到容器
- 安装 npm 依赖
- 配置技能目录

### 步骤 2：配置环境变量

编辑 `.env` 文件，添加以下内容：

```bash
# ========== Sync to GitHub 技能配置 ==========

# x 项目本地路径（必填）
# 这是容器内的路径，AI 可以访问和修改的专用目录
SYNC_TO_GITHUB_X_PROJECT_PATH=/home/node/.openclaw/workspace/x-project

# GitHub 仓库信息（必填）
# 格式：username/repo
SYNC_TO_GITHUB_GITHUB_REPO=your-username/your-repo

# GitHub Token（必填）
# 访问 https://github.com/settings/tokens 创建
SYNC_TO_GITHUB_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

# 分支名称（可选，默认 main）
SYNC_TO_GITHUB_GITHUB_BRANCH=main

# 默认分类（可选）
SYNC_TO_GITHUB_CATEGORIES=["技术", "博客"]

# 默认标签（可选）
SYNC_TO_GITHUB_TAGS=["OpenClaw", "自动化"]
```

#### 如何获取 GitHub Token？

1. 访问 https://github.com/settings/tokens
2. 点击 **"Generate new token (classic)"**
3. 填写备注（如：OpenClaw Sync）
4. **勾选权限**：找到并勾选 `repo`（完整控制私有仓库）
5. 滚动到底部，点击 **"Generate token"**
6. **立即复制 Token**（只显示一次，格式如：`ghp_xxxxxxxxxxxx`）
7. 粘贴到 `.env` 文件的 `SYNC_TO_GITHUB_GITHUB_TOKEN` 中

### 步骤 3：重启服务

```bash
docker compose restart openclaw-gateway
```

等待约 10-15 秒让服务完全启动。

## ✅ 验证安装

### 检查技能是否安装成功

```bash
docker exec -it openclaw-gateway bash -c "su node -c 'openclaw skills list'"
```

应该能看到 `sync-to-github` 在列表中。

### 测试功能

```bash
# 进入容器
docker exec -it openclaw-gateway bash -c "su node"

# 切换到技能目录
cd ~/.openclaw/workspace/skills/sync-to-github

# 运行测试脚本
node test.js
```

如果看到 `✅ 测试通过` 的提示，说明安装成功！

## 💡 开始使用

对 AI 机器人说：

```
请将 a.md 的文章内容同步到 x 项目并推送到 GitHub
```

就这么简单！🎉

---

## 📚 详细文档

- **[快速开始](./QUICKSTART.md)** - 完整的使用指南
- **[技能说明](./SKILL.md)** - API 文档和高级用法
- **[主 README](./README.main.md)** - 功能概述

## 🔍 故障排查

### 问题 1：找不到技能

**症状**：AI 无法识别技能指令

**解决**：
```bash
# 检查技能文件是否存在
docker exec -it openclaw-gateway bash -c "su node -c 'ls -la ~/.openclaw/workspace/skills/'"

# 查看技能日志
docker logs openclaw-gateway | grep -i "sync-to-github"

# 重启服务
docker compose restart openclaw-gateway
```

### 问题 2：GitHub 推送失败

**症状**：报错 "Authentication failed" 或 "Token invalid"

**解决**：
1. 确认 GitHub Token 正确（重新生成一个）
2. 确认 Token 有 `repo` 权限
3. 确认 Token 格式为 `ghp_xxxxx`

### 问题 3：x 项目路径不存在

**症状**：报错 "path not configured" 或 "no such file"

**解决**：
- 检查 `.env` 中的 `SYNC_TO_GITHUB_X_PROJECT_PATH`
- 确保路径是 `/home/node/.openclaw/workspace/x-project`（容器内路径）
- 重启容器使配置生效

### 问题 4：缺少依赖包

**症状**：报错 "Cannot find module"

**解决**：
```bash
docker exec -it openclaw-gateway bash -c "su node -c 'cd ~/.openclaw/workspace/skills/sync-to-github && npm install'"
```

## 🎯 下一步

安装完成后，建议：

1. **阅读快速开始**：[QUICKSTART.md](./QUICKSTART.md)
2. **测试功能**：使用示例文件测试完整流程
3. **配置自定义参数**：设置你的默认分类和标签
4. **开始使用**：通过 AI 对话调用技能

## 🆘 需要帮助？

查看详细文档：
- [QUICKSTART.md](./QUICKSTART.md) - 快速开始指南
- [SKILL.md](./SKILL.md) - 详细说明和 API 文档

查看日志：
```bash
docker logs -f openclaw-gateway 2>&1 | grep -A 10 -B 10 "sync-to-github"
```

---

**版本**: 1.0.0  
**更新时间**: 2026-03-22  
**兼容**: OpenClaw Docker CN IM
