# RSMP S2 Wiki

这是一个为 **RSMP S2** 准备的无后端 Hexo 静态 Wiki 模板，适合部署到 GitHub Pages。

## 你需要改的地方

打开 `_config.yml`，把：

```yml
url: https://huohai114514.github.io/rsmp-s2-wiki
```

改成你的 GitHub 用户名，例如：

```yml
url: https://huohai114514.github.io/rsmp-s2-wiki
```

仓库名如果不是 `rsmp-s2-wiki`，还要一起改：

```yml
root: /你的仓库名/
```

## 本地预览

```bash
npm install
npm run server
```

浏览器打开：

```txt
http://localhost:4000/rsmp-s2-wiki/
```

## 发布到 GitHub Pages

1. GitHub 新建仓库：`rsmp-s2-wiki`
2. 本地运行：

```bash
git init
git branch -M main
git add .
git commit -m "init rsmp s2 wiki"
git remote add origin https://github.com/你的GitHub用户名/rsmp-s2-wiki.git
git push -u origin main
```

3. GitHub 仓库页面进入：`Settings > Pages`
4. `Source` 选择：`GitHub Actions`
5. 等 `Actions` 跑完，网站上线。

## 后续更新

改 `source/` 里面的 Markdown 文件，然后：

```bash
git add .
git commit -m "update wiki"
git push
```
