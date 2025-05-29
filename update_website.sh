#!/bin/bash

# 红娘暖暖网站更新脚本
echo "🚀 开始更新红娘暖暖网站..."

# 添加所有更改
echo "📝 添加文件更改..."
git add -A

# 获取当前时间作为提交信息
timestamp=$(date +"%Y-%m-%d %H:%M:%S")
commit_message="更新网站内容 - $timestamp"

# 提交更改
echo "💾 提交更改..."
git commit -m "$commit_message"

# 推送到GitHub
echo "☁️  推送到GitHub..."
git push origin main

# 检查是否成功
if [ $? -eq 0 ]; then
    echo "✅ 网站更新成功！"
    echo "🌐 您的网站将在几分钟内更新"
    echo "📍 访问地址: https://jiangyongjin1990.github.io/-/"
else
    echo "❌ 更新失败，请检查网络连接后重试"
fi 