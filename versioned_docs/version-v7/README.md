# 文档文件夹

`/docs` 文件夹存放所有 Markdown 文件。页面结构大致映射网站的路由，因为路径可以在 frontmatter 中更改。

## 版本管理

此文件夹还可以包含组件、资源文件以及运行 Docusaurus 版本管理脚本时需要版本化的任何其他内容。例如，如果有一个页面组件仅与 Ionic 当前版本中的 `layout` 部分相关，可以将其添加到 `docs/layout/_components/` 文件夹中。当运行版本管理脚本时，该组件将被复制到 `versioned_docs/version-{X}/layout/_components/`，并且可以在 `docs/layout/_components/` 中删除或更新为最新版本。同样的概念适用于图片和其他文件。

如果组件需要在不同版本间共享，可以将其放入 `src/components/`。如果图片和其他服务文件需要在不同版本间共享，可以将其放入 `static/`。

## 自动生成的文件

以下目录中的所有 Markdown 文件均从[脚本](/scripts)生成：

- `docs/api/`
- `docs/cli/commands/`
- `docs/native/`