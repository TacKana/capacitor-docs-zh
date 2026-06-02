# 文档文件夹

`/docs` 文件夹存放所有 Markdown 文件。页面结构大致映射到网站的路由，因为路径可以在 frontmatter 中更改。

## 版本管理

此文件夹还可以包含组件、资源以及运行 Docusaurus 版本管理脚本时需要版本管理的任何其他内容。例如，如果某个页面组件仅与当前版本 Ionic 中的 `layout` 部分相关，则可以将其添加到 `docs/layout/` 中的 `_components/` 文件夹中。当运行版本管理脚本时，该组件将被复制到 `versioned_docs/version-{X}/layout/_components/`，此时 `docs/layout/_components/` 中会有一个独立的组件，可以被删除或更新到最新版本。同样的概念也适用于图像和其他文件。

如果组件需要在各版本之间共享，可以将它们放在 `src/components/` 中。如果图像和其他提供服务的文件需要在各版本之间共享，可以将它们放在 `static/` 中。

## 自动生成的文件

以下目录中的所有 Markdown 文件都是从[脚本](/scripts)生成的：

- `docs/api/`
- `docs/cli/commands/`
- `docs/native/`
