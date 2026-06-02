# 文档文件夹

`/docs` 文件夹存放所有 markdown 文件。页面结构大致映射到网站上的路由，因为路径可以在 frontmatter 中更改。

## 版本控制

当运行 docusaurus 版本控制脚本时，此文件夹还可以包含组件、资源以及任何其他需要版本化的内容。例如，如果某个页面组件仅与当前版本 Ionic 的 `layout` 部分相关，则可以将其添加到 `docs/layout/` 中的 `_components/` 文件夹中。运行版本控制脚本时，该组件将被复制到 `versioned_docs/verion-{X}/layout/_components/`，并且在 `docs/layout/_components/` 中会有一个单独的组件，可以删除或更新到最新版本。同样的概念也适用于图像和其他文件。

如果组件需要在不同版本之间共享，可以将它们放在 `src/components/` 中。如果图像和其他服务文件需要在版本之间共享，可以将它们放在 `static/` 中。

## 自动生成的文件

以下目录中的所有 markdown 文件都是从[脚本](/scripts)生成的：

- `docs/api/`
- `docs/cli/commands/`
- `docs/native/`
