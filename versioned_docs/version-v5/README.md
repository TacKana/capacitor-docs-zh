# 文档目录

`/docs` 目录存放所有 Markdown 文件。页面结构与网站路由松散对应，因为路径可以在 frontmatter 中修改。

## 版本管理

此目录还可以包含组件、资源文件以及运行 Docusaurus 版本管理脚本时需要版本化的其他内容。例如，如果某个页面组件仅在当前 Ionic 版本的 `layout` 章节中有用，可以将其添加到 `docs/layout/_components/` 文件夹中。当版本管理脚本运行时，该组件将被复制到 `versioned_docs/version-{X}/layout/_components/`，此时 `docs/layout/_components/` 中的组件就可以删除或更新到最新版本。同样的概念也适用于图片和其他文件。

如果组件需要在多个版本间共享，可以将其放在 `src/components/` 中。如果图片和其他服务文件需要在多个版本间共享，可以将其放在 `static/` 目录中。

## 自动生成的文件

以下目录中的所有 Markdown 文件都是由[脚本](/scripts)自动生成的：

- `docs/api/`
- `docs/cli/commands/`
- `docs/native/`