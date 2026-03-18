# 文档文件夹

`/docs` 文件夹存放所有 Markdown 文件。页面结构大致映射到网站的路由，因为路径可以在 frontmatter 中更改。

## 版本控制

此文件夹还可以包含组件、资产以及在运行 Docusaurus 版本控制脚本时需要版本化的其他内容。例如，如果有一个页面组件仅适用于当前 Ionic 版本的 `layout` 部分，可以将其添加到 `docs/layout/_components/` 文件夹中。当版本控制脚本运行时，该组件将被复制到 `versioned_docs/verion-{X}/layout/_components/`，并且 `docs/layout/_components/` 中会有一个可以删除或更新到最新版本的独立组件。相同的概念适用于图像和其他文件。

如果组件需要在不同版本之间共享，可以将其放在 `src/components/` 中。如果图像和其他服务文件需要在不同版本之间共享，可以将其放在 `static/` 中。

## 自动生成的文件

以下目录中的所有 Markdown 文件均从 [scripts](/scripts) 生成：

- `docs/api/`
- `docs/cli/commands/`
- `docs/native/`