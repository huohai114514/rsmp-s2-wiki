# RSMP S2 Wiki - CloudCannon 可视化编辑配置包

这个补丁包会给当前 GitHub Pages + Hexo 的 RSMP S2 Wiki 增加 CloudCannon 配置。

## 你要上传哪些文件？

把解压后的这些文件/文件夹拖进 GitHub 仓库根目录：

```text
cloudcannon.config.yml
.cloudcannon/
source/images/
source/uploads/
CLOUDCANNON_SETUP.md
```

上传后提交：

```text
add cloudcannon visual editor config
```

## CloudCannon 怎么连接 GitHub？

1. 打开 https://app.cloudcannon.com/
2. 注册/登录。
3. Add new site / Create site。
4. 选择 GitHub 作为文件来源。
5. 授权 GitHub。
6. 选择仓库：huohai114514/rsmp-s2-wiki。
7. 选择分支：main。
8. CloudCannon 会读取根目录的 cloudcannon.config.yml。

## 建议设置

- Static Site Generator：Hexo
- Install command：npm install
- Build command：npm run build
- Output directory：public
- Node version：20

这个配置包里已经放了 `.cloudcannon/initial-site-settings.json`，CloudCannon 新建站点时通常可以自动读取这些设置。

## 以后怎么编辑？

CloudCannon 里进入：

```text
Collections → Wiki 页面
```

你可以编辑：

```text
source/index.md
source/guide/index.md
source/recipes/index.md
source/cooking/index.md
source/farming/index.md
source/fishing/index.md
source/calendar/index.md
source/mobs-week/index.md
source/enchant/index.md
source/bosses/index.md
source/villagers-loot/index.md
source/changelog/index.md
```

## 怎么上传图片？

在 CloudCannon 编辑器里插入图片，上传到：

```text
source/images/
```

Markdown 引用路径建议是：

```md
![图片说明](/rsmp-s2-wiki/images/your-image.png)
```

图片命名建议用英文小写：

```text
clock-actionbar.png
cooking-firebar.png
altar-recipe.png
bossbar-demo.webp
```

不要用中文文件名、空格或奇怪符号。

## 注意

CloudCannon 改完内容会提交回 GitHub。之后你的 GitHub Actions 会自动部署到：

```text
https://huohai114514.github.io/rsmp-s2-wiki/
```

如果 CloudCannon 里预览正常但 GitHub Pages 没更新，请去 GitHub 仓库的 Actions 看是否绿色对勾。
