# 文档目录

`/docs` 文件夹存放所有 Markdown 文件。页面结构大致对应网站的路由，因为路径可以在 frontmatter 中修改。

## 版本管理

当运行 Docusaurus 版本管理脚本时，该文件夹还可以包含组件、资源文件以及所有需要版本化的内容。例如，如果某个页面组件仅适用于当前 Ionic 版本的 `layout` 部分，可以将其添加到 `docs/layout/_components/` 文件夹中。运行版本管理脚本时，该组件会被复制到 `versioned_docs/verion-{X}/layout/_components/` 目录，同时在 `docs/layout/_components/` 中可以删除或更新为最新版本的组件。同样的概念适用于图片和其他文件。

如果需要跨版本共享组件，可以将其放在 `src/components/` 目录下。如果需要跨版本共享图片和其他服务文件，可以放在 `static/` 目录中。

## 自动生成的文件

以下目录中的所有 Markdown 文件均由[脚本](/scripts)自动生成：

- `docs/api/`
- `docs/cli/commands/`
- `docs/native/`