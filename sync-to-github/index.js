/**
 * Sync to GitHub Skill
 * 将 markdown 文件同步到本地项目并推送到 GitHub
 */

const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');
const simpleGit = require('simple-git');

class SyncToGitHub {
  constructor(config) {
    this.xProjectPath = config.xProjectPath || process.env.SYNC_TO_GITHUB_X_PROJECT_PATH;
    this.githubRepo = config.githubRepo || process.env.SYNC_TO_GITHUB_GITHUB_REPO;
    this.githubToken = config.githubToken || process.env.SYNC_TO_GITHUB_GITHUB_TOKEN;
    this.githubBranch = config.githubBranch || process.env.SYNC_TO_GITHUB_GITHUB_BRANCH || 'main';
    this.defaultCategories = config.categories || JSON.parse(process.env.SYNC_TO_GITHUB_CATEGORIES || '["分类 1", "分类 1.1"]');
    this.defaultTags = config.tags || JSON.parse(process.env.SYNC_TO_GITHUB_TAGS || '["标签 1", "标签 2"]');
  }

  /**
   * 从 markdown 内容中提取标题
   * @param {string} content - markdown 内容
   * @returns {string} 标题
   */
  extractTitle(content) {
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      return titleMatch[1].trim();
    }
    // 如果没有找到标题，使用前几行作为标题
    const firstLines = content.split('\n').slice(0, 3).join(' ').trim();
    return firstLines.substring(0, 50) || '无标题';
  }

  /**
   * 生成文件名
   * @param {string} title - 文章标题
   * @param {Date} date - 日期
   * @returns {string} 文件名
   */
  generateFilename(title, date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // 清理标题中的非法字符
    const cleanTitle = title
      .replace(/[<>:"/\\|？*]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
    
    return `${year}-${month}-${day}-${cleanTitle}.md`;
  }

  /**
   * 转换 markdown 格式
   * @param {string} content - 原始 markdown 内容
   * @param {Object} options - 选项
   * @returns {string} 转换后的内容
   */
  async convertFormat(content, options = {}) {
    const title = options.title || this.extractTitle(content);
    const date = options.date || new Date();
    const categories = options.categories || this.defaultCategories;
    const tags = options.tags || this.defaultTags;

    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:00 +0800`;

    const frontmatter = {
      title: title,
      date: formattedDate,
      categories: categories,
      tags: tags
    };

    // 使用 gray-matter 生成 frontmatter
    const fileContent = matter.stringify(content, frontmatter);
    
    return {
      content: fileContent,
      filename: this.generateFilename(title, date),
      title: title
    };
  }

  /**
   * 读取源文件
   * @param {string} sourcePath - 源文件路径
   * @returns {string} 文件内容
   */
  async readSourceFile(sourcePath) {
    try {
      const content = await fs.readFile(sourcePath, 'utf-8');
      return content;
    } catch (error) {
      throw new Error(`读取源文件失败：${error.message}`);
    }
  }

  /**
   * 保存到本地项目
   * @param {string} content - 转换后的内容
   * @param {string} filename - 文件名
   * @returns {string} 保存的完整路径
   */
  async saveToLocal(content, filename) {
    if (!this.xProjectPath) {
      throw new Error('未配置 x 项目路径 (SYNC_TO_GITHUB_X_PROJECT_PATH)');
    }

    try {
      // 确保目录存在
      await fs.mkdir(this.xProjectPath, { recursive: true });
      
      const targetPath = path.join(this.xProjectPath, filename);
      await fs.writeFile(targetPath, content, 'utf-8');
      
      return targetPath;
    } catch (error) {
      throw new Error(`保存到本地项目失败：${error.message}`);
    }
  }

  /**
   * 推送到 GitHub
   * @param {string} filePath - 要推送的文件路径
   * @param {string} commitMessage - 提交信息
   * @returns {Object} 推送结果
   */
  async pushToGitHub(filePath, commitMessage = 'Sync markdown file') {
    if (!this.githubRepo) {
      throw new Error('未配置 GitHub 仓库 (SYNC_TO_GITHUB_GITHUB_REPO)');
    }

    if (!this.githubToken) {
      throw new Error('未配置 GitHub Token (SYNC_TO_GITHUB_GITHUB_TOKEN)');
    }

    try {
      const git = simpleGit(this.xProjectPath);
      
      // 配置用户信息
      await git.addConfig('user.name', 'OpenClaw Sync Bot');
      await git.addConfig('user.email', 'openclaw-sync@localhost');
      
      // 检查是否已初始化 git 仓库
      let isRepo = false;
      try {
        await git.revparse(['--git-dir']);
        isRepo = true;
      } catch (e) {
        // 不是 git 仓库
      }

      if (!isRepo) {
        // 初始化为 git 仓库
        await git.init();
        
        // 添加远程仓库
        const remoteUrl = `https://${this.githubToken}@github.com/${this.githubRepo}.git`;
        await git.addRemote('origin', remoteUrl);
      }

      // 拉取最新代码
      try {
        await git.fetch('origin');
        await git.checkout(this.githubBranch);
      } catch (e) {
        // 如果分支不存在，创建新分支
        await git.checkoutLocalBranch(this.githubBranch);
      }

      // 添加文件
      await git.add(path.basename(filePath));
      
      // 检查是否有变更
      const status = await git.status();
      if (status.files.length === 0) {
        return {
          success: true,
          message: '没有变更，跳过推送',
          pushed: false
        };
      }

      // 提交
      await git.commit(commitMessage);
      
      // 推送
      await git.push('origin', this.githubBranch);

      return {
        success: true,
        message: `成功推送到 GitHub: ${this.githubRepo}`,
        pushed: true,
        branch: this.githubBranch,
        commit: commitMessage
      };
    } catch (error) {
      throw new Error(`推送到 GitHub 失败：${error.message}`);
    }
  }

  /**
   * 主执行函数
   * @param {Object} params - 参数
   * @returns {Object} 执行结果
   */
  async execute(params = {}) {
    const {
      sourcePath,
      content,
      title,
      date,
      categories,
      tags,
      commitMessage
    } = params;

    try {
      // 1. 获取内容
      let sourceContent = content;
      if (!sourceContent && sourcePath) {
        sourceContent = await this.readSourceFile(sourcePath);
      }

      if (!sourceContent) {
        throw new Error('请提供源文件路径或内容');
      }

      // 2. 转换格式
      const converted = await this.convertFormat(sourceContent, {
        title,
        date: date ? new Date(date) : undefined,
        categories,
        tags
      });

      console.log(`✓ 格式转换完成，标题："${converted.title}"`);

      // 3. 保存到本地
      const savedPath = await this.saveToLocal(converted.content, converted.filename);
      console.log(`✓ 已保存到本地：${savedPath}`);

      // 4. 推送到 GitHub
      const pushResult = await this.pushToGitHub(
        savedPath, 
        commitMessage || `Sync: ${converted.title}`
      );
      console.log(`✓ ${pushResult.message}`);

      return {
        success: true,
        message: '同步完成',
        filename: converted.filename,
        title: converted.title,
        savedPath: savedPath,
        pushResult: pushResult
      };
    } catch (error) {
      console.error('❌ 同步失败:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = SyncToGitHub;
