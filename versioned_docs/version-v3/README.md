# 文档文件夹

`/docs` 文件夹存放所有 Markdown 文件。页面结构大致映射到网站的路由，因为路径可以在 frontmatter 中更改。

## 版本管理

此文件夹还可以包含组件、资源文件以及其他需要在运行 Docusaurus 版本管理脚本时进行版本控制的内容。例如，如果某个页面组件仅与当前 Ionic 版本中的 `layout` 部分相关，可以将其添加到 `docs/v3/layout/_components/` 文件夹中。当版本管理脚本运行时，该组件将被复制到 `versioned_docs/verion-{X}/layout/_components/`，并且在 `docs/v3/layout/_components/` 中会有一个单独的组件，可以删除或更新到最新版本。同样的概念适用于图片和其他文件。

如果组件需要在版本间共享，可以将其放在 `src/components/` 中。如果图片和其他服务文件需要在版本间共享，可以将其放在 `static/` 中。

## 自动生成的文件

以下目录中的所有 Markdown 文件均由[脚本](/scripts)自动生成：

- `docs/v3/api/`
- `docs/v3/cli/commands/`
- `docs/v3/native/`