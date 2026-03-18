# Docs 文件夹

`/docs` 文件夹存放所有 Markdown 文件。页面结构大致与网站上的路由对应，因为路径可以通过 frontmatter 来更改。

## 版本控制

当运行 Docusaurus 版本控制脚本时，此文件夹还可以包含组件、资源文件以及其他需要版本化的内容。例如，如果有一个页面组件仅适用于当前 Ionic 版本中的 `layout` 部分，可以将其添加到 `docs/layout/_components/` 文件夹中。当运行版本控制脚本时，该组件将被复制到 `versioned_docs/verion-{X}/layout/_components/`，并且 `docs/layout/_components/` 中将有一个单独的组件，可以删除或更新到最新版本。同样的概念也适用于图片和其他文件。

如果组件需要在不同版本之间共享，可以将其放在 `src/components/` 中。如果图片和其他服务文件需要在不同版本之间共享，可以将其放在 `static/` 中。

## 自动生成的文件

以下目录中的所有 Markdown 文件都是从 [scripts](/scripts) 生成的：

- `docs/api/`
- `docs/cli/commands/`
- `docs/native/`