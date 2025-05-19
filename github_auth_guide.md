# GitHub授权指南

## 第一步：创建GitHub个人访问令牌 (Personal Access Token)

1. 登录您的GitHub账户
2. 点击右上角头像，选择`Settings`（设置）
3. 在左侧菜单找到并点击`Developer settings`（开发者设置）
4. 点击`Personal access tokens`（个人访问令牌）
5. 点击`Generate new token`（生成新令牌）或`Generate new token (classic)`
6. 给您的令牌一个描述性名称，如"红娘暖暖官网部署"
7. 选择令牌的有效期（建议选择30天或更长时间）
8. 勾选以下权限：
   - `repo`（完全的仓库访问权限）
   - `workflow`（可选，如果您计划使用GitHub Actions）
9. 点击底部的`Generate token`（生成令牌）按钮
10. **重要：复制生成的令牌并保存在安全的地方，因为您只能看到一次！**

## 第二步：创建GitHub仓库

1. 在GitHub首页点击右上角的"+"图标，选择"New repository"
2. 仓库名称填写：`hongniannuannuan-website`
3. 添加描述（可选）："红娘暖暖相亲平台官方网站"
4. 选择公开（Public）或私有（Private）
5. 不要勾选"Initialize this repository with a README"
6. 点击"Create repository"创建仓库

## 第三步：推送代码到GitHub

现在您有了授权令牌，可以使用以下命令将代码推送到GitHub：

```bash
# 设置远程仓库URL（替换YOUR_USERNAME为您的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/hongniannuannuan-website.git

# 推送代码到主分支
git push -u origin main
```

当系统提示输入用户名和密码时：
- 用户名：输入您的GitHub用户名
- 密码：**粘贴**您刚刚创建的个人访问令牌（而不是您的GitHub密码）

## 第四步：设置GitHub Pages（可选）

如果您想要您的网站通过GitHub Pages访问：

1. 在仓库页面，点击"Settings"选项卡
2. 在左侧导航栏中找到"Pages"
3. 在"Source"部分，选择"main"分支
4. 点击"Save"按钮

几分钟后，您的网站将在以下地址可用：
`https://YOUR_USERNAME.github.io/hongniannuannuan-website/`

## 使用我们准备好的脚本（可选）

我们准备了一个自动化脚本`setup_github.sh`，您也可以直接运行它：

```bash
./setup_github.sh
```

按照提示输入您的GitHub用户名和刚刚创建的个人访问令牌即可。 