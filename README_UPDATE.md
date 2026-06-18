# RSMP S2 Wiki 导航与首页入口更新包

这个补丁会把 CloudCannon 里已有的主要页面都加入网站入口：

- 顶部导航加入分组下拉菜单
- 首页加入所有主要页面卡片
- 修复导航高亮逻辑
- 保留 `page.ejs` 的 `data-cms-edit="content"`，方便 CloudCannon Visual Editor 编辑正文

## 上传方法

把压缩包解压后，将里面的 `themes` 文件夹拖到 GitHub 仓库根目录上传。

提交信息建议：

```text
add all wiki navigation entries
```

上传后等 GitHub Actions 变绿，再刷新网站。
