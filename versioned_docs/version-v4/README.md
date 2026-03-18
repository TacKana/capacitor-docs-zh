# 文档文件夹

`/docs` 文件夹存放所有 Markdown 文件。页面结构大致映射到网站的路由，因为路径可以在 frontmatter 中更改。

## 版本管理

这个文件夹还可以包含组件、资源文件以及其他在 Docusaurus 版本脚本运行时需要进行版本控制的内容。例如，如果有一个页面组件仅适用于当前 Ionic 版本的 `layout` 部分，可以将其添加到 `docs/layout/_components/` 文件夹中。当版本脚本运行时，该组件将被复制到 `versioned_docs/verion-{X}/layout/_components/`，同时 `docs/layout/_components/` 中可以删除或更新为最新版本的组件。同样的概念也适用于图片和其他文件。

如果组件需要在不同版本间共享，可以将其放在 `src/components/` 中。如果图片和其他服务文件需要在不同版本间共享，可以将其放在 `static/` 文件夹中。

## 自动生成的文件

以下目录中的所有 Markdown 文件都由[脚本](/scripts)自动生成：

- `docs/api/`
- `docs/cli/commands/`
- `docs/native/`