#!/usr/bin/env node

/**
 * Sync to GitHub 技能测试脚本
 * 
 * 用法：
 * node test.js [source-file]
 */

const SyncToGitHub = require('./index.js');
const path = require('path');

async function test() {
  console.log('🧪 开始测试 Sync to GitHub 技能...\n');

  // 创建技能实例（使用环境变量配置）
  const sync = new SyncToGitHub({});

  // 测试 1：使用示例文件
  console.log('📄 测试 1: 使用示例文件 (example.md)');
  try {
    const result1 = await sync.execute({
      sourcePath: path.join(__dirname, 'example.md'),
      commitMessage: '测试同步：示例文章'
    });

    if (result1.success) {
      console.log('✅ 测试 1 通过\n');
      console.log('结果:', JSON.stringify(result1, null, 2));
    } else {
      console.log('❌ 测试 1 失败:', result1.error);
    }
  } catch (error) {
    console.log('❌ 测试 1 异常:', error.message);
  }

  console.log('\n' + '='.repeat(60) + '\n');

  // 测试 2：直接提供内容
  console.log('📝 测试 2: 直接提供内容');
  try {
    const result2 = await sync.execute({
      content: `# 测试文章

这是一篇测试文章的正文内容。

## 第二章节

这里是第二章的内容...`,
      title: '自定义标题',
      categories: ['测试', '示例'],
      tags: ['test', 'demo'],
      date: new Date('2025-11-04 11:00:00'),
      commitMessage: '测试同步：自定义内容'
    });

    if (result2.success) {
      console.log('✅ 测试 2 通过\n');
      console.log('结果:', JSON.stringify(result2, null, 2));
    } else {
      console.log('❌ 测试 2 失败:', result2.error);
    }
  } catch (error) {
    console.log('❌ 测试 2 异常:', error.message);
  }

  console.log('\n' + '='.repeat(60) + '\n');
  console.log('🎉 测试完成！');
}

// 如果直接运行此脚本
if (require.main === module) {
  test().catch(console.error);
}

module.exports = test;
