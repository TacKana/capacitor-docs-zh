---
translated: true
---

# 文档文件夹

`/docs` 文件夹存放所有 markdown 文件。页面结构松散地映射到站点的路由上，因为路径可以在 frontmatter 中进行更改。

## 版本控制

此文件夹还可以包含组件、资源以及当运行 docusaurus 版本控制脚本时需要版本化的任何其他内容。例如，如果某个页面组件仅与当前版本 Ionic 中的 `layout` 部分相关，则可以将其添加到 `docs/v3/layout/` 中的 `_components/` 文件夹中。当运行版本控制脚本时，该组件将被复制到 `versioned_docs/verion-{X}/layout/_components/`，并且在 `docs/v3/layout/_components/` 中将有一个单独的组件，可以将其删除或更新到最新版本。图片和其他文件也适用相同的概念。

如果组件需要在不同版本之间共享，可以将它们放在 `src/components/` 中。如果图片和其他服务文件需要在不同版本之间共享，可以将它们放在 `static/` 中。

## 自动生成的文件

这些目录中的所有 markdown 文件都是从 [脚本](/scripts) 生成的：

- `docs/v3/api/`
- `docs/v3/cli/commands/`
- `docs/v3/native/`
