# 文档目录

`/docs` 文件夹存放所有 Markdown 文件。页面结构与网站路由大致对应，因为路径可以通过 frontmatter 进行修改。

## 版本管理

该文件夹还可以包含组件、资源文件以及其他需要在执行 Docusaurus 版本控制脚本时进行版本化管理的内容。例如，如果某个页面组件仅适用于当前 Ionic 版本的 `layout` 部分，可以将其添加到 `docs/layout/_components/` 文件夹中。当运行版本控制脚本时，该组件会被复制到 `versioned_docs/verion-{X}/layout/_components/` 目录，同时在 `docs/layout/_components/` 中可以删除或更新为最新版本的组件。同样的概念适用于图片和其他文件。

如果组件需要在多个版本间共享，可以将其放置在 `src/components/` 目录中。如果图片和其他服务文件需要跨版本共享，可以放在 `static/` 目录下。

## 自动生成文件

以下目录中的所有 Markdown 文件均由[脚本](/scripts)自动生成：

- `docs/api/`
- `docs/cli/commands/`
- `docs/native/`