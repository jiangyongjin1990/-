#!/bin/bash

# 红娘暖暖网站GitHub推送脚本

echo "=== 红娘暖暖网站GitHub推送脚本 ==="
echo "此脚本将帮助您推送代码到GitHub仓库"
echo ""

# 测试GitHub连接
echo "正在测试GitHub连接..."
if curl -s --connect-timeout 5 https://github.com > /dev/null; then
    echo "✅ 连接GitHub成功！"
else
    echo "❌ 无法连接到GitHub，请检查您的网络连接"
    echo "   您可以稍后再试，或者使用代理/VPN"
    exit 1
fi

# 设置GitHub凭据
echo ""
echo "请输入您的GitHub用户名："
read github_username

echo "请输入您的GitHub访问令牌 (Personal Access Token)："
read github_token

# 设置远程仓库
echo ""
echo "正在配置Git仓库..."
git remote remove origin 2>/dev/null
git remote add origin https://${github_username}:${github_token}@github.com/${github_username}/-.git

# 推送代码
echo ""
echo "正在推送代码到GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ 代码推送成功！"
    
    # 推送标签
    echo ""
    echo "正在推送v1.0版本标签..."
    git push origin v1.0
    
    if [ $? -eq 0 ]; then
        echo "✅ 标签推送成功！"
    else
        echo "❌ 标签推送失败，但代码已成功上传"
    fi
    
    echo ""
    echo "您的代码已上传到GitHub"
    echo "   仓库地址: https://github.com/${github_username}/-"
    echo "   版本标签: v1.0"
    echo ""
    echo "如需设置GitHub Pages，请访问:"
    echo "https://github.com/${github_username}/-/settings/pages"
    echo "选择'main'分支，然后点击'Save'"
else
    echo ""
    echo "❌ 推送失败，请检查错误信息"
fi 