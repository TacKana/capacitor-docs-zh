# 文档文件夹

`/docs` 文件夹存放所有 markdown 文件。页面结构大致映射到网站上的路由，因为路径可以在 frontmatter 中更改。

## 版本控制

当运行 docusaurus 版本控制脚本时，此文件夹还可以包含组件、资源以及任何需要被版本化的内容。例如，如果有一个仅与当前版本 Ionic 中 `layout` 部分相关的页面组件，它可以被添加到 `docs/layout/` 目录下的 `_components/` 文件夹中。当运行版本控制脚本时，该组件将被复制到 `versioned_docs/version-{X}/layout/_components/`，此时 `docs/layout/_components/` 中将出现一个独立的新组件，可以将其删除或更新到最新版本。同样的概念也适用于图片和其他文件。

如果组件需要在不同版本间共享，可以将它们放在 `src/components/` 中。如果图片和其他服务文件需要在不同版本间共享，可以将它们放在 `static/` 中。

## 自动生成的文件

以下目录中的所有 markdown 文件都是从[脚本](/scripts)生成的：

- `docs/api/`
- `docs/cli/commands/`
- `docs/native/`
