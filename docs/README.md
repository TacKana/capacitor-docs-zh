```mdx
# 文档文件夹

`/docs` 文件夹存放所有 markdown 文件。页面结构大致与网站的路由对应，因为路径可以在 frontmatter 中更改。

## 版本控制

此文件夹也可以包含组件、资源以及运行 docusaurus 版本控制脚本时需要版本化的任何其他内容。例如，如果有一个页面组件仅适用于当前 Ionic 版本的 `layout` 部分，则可以将其添加到 `docs/layout/` 的 `_components/` 文件夹中。当运行版本控制脚本时，该组件将被复制到 `versioned_docs/verion-{X}/layout/_components/`，并且 `docs/layout/_components/` 中将有一个单独的组件，可以删除或更新到最新版本。同样的概念适用于图像和其他文件。

如果组件需要在多个版本之间共享，可以将它们放在 `src/components/` 中。如果图像和其他服务文件需要在多个版本之间共享，可以将它们放在 `static/` 中。

## 自动生成的文件

以下目录中的所有 markdown 文件都是由 [scripts](/scripts) 自动生成的：

- `docs/api/`
- `docs/cli/commands/`
- `docs/native/`
```