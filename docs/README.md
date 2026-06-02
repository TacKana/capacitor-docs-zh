# 文档文件夹

`/docs` 文件夹存放所有 markdown 文件。页面结构大致映射到站点的路由，因为路径可以在 frontmatter 中更改。

## 版本管理

此文件夹还可以包含组件、资源以及在运行 Docusaurus 版本管理脚本时需要版本化的任何其他内容。例如，如果某个页面组件仅与当前版本 Ionic 的 `layout` 部分相关，则可以将它添加到 `docs/layout/` 下的 `_components/` 文件夹中。当运行版本管理脚本时，该组件将被复制到 `versioned_docs/verion-{X}/layout/_components/`，而 `docs/layout/_components/` 中会有一个单独的组件，可以将其删除或更新到最新版本。同样的概念适用于图像和其他文件。

如果组件需要在不同版本之间共享，可以将它们放在 `src/components/` 中。如果图像和其他服务文件需要在不同版本之间共享，可以将它们放在 `static/` 中。

## 自动生成的文件

以下目录中的所有 markdown 文件均由[脚本](/scripts)生成：

- `docs/api/`
- `docs/cli/commands/`
- `docs/native/`
