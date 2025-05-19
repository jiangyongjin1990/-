#!/bin/bash

# 设置颜色
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}==== 红娘暖暖官网 GitHub 部署脚本 ====${NC}"
echo ""

# 获取GitHub用户名
read -p "请输入您的GitHub用户名: " github_username
if [ -z "$github_username" ]; then
  echo "错误: GitHub用户名不能为空"
  exit 1
fi

repo_name="hongniannuannuan-website"
repo_url="https://github.com/$github_username/$repo_name.git"

echo -e "${BLUE}将创建仓库: ${NC}$repo_url"
echo ""
echo -e "${BLUE}请输入您的GitHub个人访问令牌 (需要有repo权限):${NC}"
echo "如果没有，请前往 https://github.com/settings/tokens 创建一个具有repo权限的token"
read -p "Token: " github_token
if [ -z "$github_token" ]; then
  echo "错误: GitHub令牌不能为空"
  exit 1
fi

# 创建GitHub仓库
echo -e "${BLUE}正在创建GitHub仓库...${NC}"
curl -s -X POST -H "Authorization: token $github_token" \
     -H "Accept: application/vnd.github.v3+json" \
     https://api.github.com/user/repos \
     -d "{\"name\":\"$repo_name\",\"description\":\"红娘暖暖相亲平台官方网站\",\"private\":false}" > /dev/null

if [ $? -ne 0 ]; then
  echo "创建仓库失败，请检查您的令牌是否有效"
  exit 1
fi

echo -e "${GREEN}仓库创建成功!${NC}"

# 更新README中的GitHub用户名
echo -e "${BLUE}更新README.md文件...${NC}"
sed -i '' "s/你的用户名/$github_username/g" README.md

# 设置远程仓库并推送
echo -e "${BLUE}将代码推送到GitHub...${NC}"
git remote add origin $repo_url
git branch -M main
git push -u origin main

if [ $? -ne 0 ]; then
  echo "推送代码失败"
  exit 1
fi

echo -e "${GREEN}代码已成功推送到GitHub!${NC}"
echo -e "${GREEN}您的网站已上传到: ${NC}$repo_url"
echo ""
echo -e "${BLUE}启用GitHub Pages:${NC}"
echo "1. 前往 https://github.com/$github_username/$repo_name/settings/pages"
echo "2. 在'Source'部分选择'main'分支"
echo "3. 点击'Save'"
echo ""
echo -e "${BLUE}完成后，您的网站将在以下地址可访问:${NC}"
echo -e "${GREEN}https://$github_username.github.io/$repo_name/${NC}"
echo ""
echo -e "${BLUE}感谢使用红娘暖暖官网部署工具!${NC}" 