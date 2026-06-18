# RSMP S2 Wiki 玩家手册版

这是给 `huohai114514/rsmp-s2-wiki` 准备的 Hexo + GitHub Pages 静态 Wiki 包。

## 已包含

- 首页 `source/index.md`
- 新手必读
- 合成配方重做，含 3x3 合成格
- 炒菜系统
- 农务与果树系统
- 钓鱼系统
- 游戏日历与星期机制
- 怪物星期难度
- 装备、附魔、铁砧与经验重做
- 精英怪与 Boss
- 村民与战利品改动
- 最近修复记录
- 自定义 Minecraft 风格主题
- GitHub Pages Actions 自动部署

## GitHub Pages 地址

https://huohai114514.github.io/rsmp-s2-wiki/

## 本地预览

```bash
npm install
npm run server
```

然后打开：

```text
http://localhost:4000/rsmp-s2-wiki/
```

## 本地生成

```bash
npm install
npm run clean
npm run build
```

生成结果在 `public/`。

## 更新方式

直接修改 `source/` 下面的 Markdown 文件，然后提交到 GitHub。GitHub Actions 会自动部署。

常用命令：

```bash
git add .
git commit -m "update rsmp s2 wiki"
git push
```
