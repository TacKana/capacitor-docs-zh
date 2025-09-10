# 文档目录

`/docs` 文件夹存放所有 Markdown 文件。由于路径可以在 frontmatter 中修改，页面结构会与网站路由保持松散对应关系。

## 版本管理

该文件夹也可以包含组件、资源文件以及运行 Docusaurus 版本化脚本时需要版本控制的其他内容。例如，如果某个页面组件仅在 Ionic 当前版本的 `layout` 部分中使用，可以将其添加到 `docs/layout/_components/` 文件夹中。当执行版本化脚本时，该组件会被复制到 `versioned_docs/verion-{X}/layout/_components/` 目录，同时在 `docs/layout/_components/` 中可以删除或更新为最新版本的组件。同样的逻辑适用于图片和其他文件。

若组件需要在多个版本间共享，可以将其放入 `src/components/` 目录。如需跨版本共享图片和其他服务文件，则应存放在 `static/` 目录。

## 自动生成文件

以下目录中的所有 Markdown 文件均由[脚本](/scripts)自动生成：

- `docs/api/`
- `docs/cli/commands/`
- `docs/native/`