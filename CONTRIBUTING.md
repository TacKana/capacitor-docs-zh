# 贡献指南

感谢您有兴趣为 Capacitor 文档做出贡献！:tada: 在提交您的贡献之前，请查阅以下建议和要求。

- [贡献指南](#贡献指南)
  - [开发流程](#开发流程)
  - [在 Windows 上使用 VS Code](#在-windows-上使用-vs-code)
  - [项目结构](#项目结构)
    - [目录结构](#目录结构)
  - [内容创作](#内容创作)
    - [本地创作](#本地创作)
  - [报告问题](#报告问题)
  - [Pull Request 指南](#pull-request-指南)
  - [部署](#部署)
  - [许可证](#许可证)

---

## 开发流程

要在本地运行文档，请先安装依赖并启动开发服务器：

```sh
$ npm install
$ npm start
```

> **注意**：需要较新的 npm（8 及以上）和 Node.js（16 及以上）版本才能运行某些脚本。

---

## 在 Windows 上使用 VS Code

Capacitor 文档最初是在 Mac 环境下构建的，因此在提交更改时采用了以 Mac 为主的代码规范。若要在 Windows 上贡献，请执行以下操作：

- 配置 VS Code 以使用换行符（LF）而不是回车换行符（CRLF）读取/保存文件。可全局设置：设置 -> 文本编辑器 -> 文件 -> Eol，选择 `\n`。
- 检查 Git 设置 `core.autocrlf` 是否为 `false`：运行 `git config -l | grep autocrlf`。如需更改为 false，执行：`git config --global core.autocrlf false`。
- 如果您已经克隆了 `capacitor-docs` 仓库，文件可能已缓存为 LF。要撤销此操作，需要清理仓库的缓存文件。请先暂存或提交您的更改，然后运行：`git rm --cached -r .`，再执行 `git reset --hard`。

## 项目结构

Capacitor 文档基于 [Docusaurus](https://docusaurus.io/) 构建。内容以 Markdown 形式编写或生成。

### 目录结构

- `scripts/` - 用于生成 markdown 或 json 文件的构建脚本
- `src/` - 文档的源代码和内容
  - `components/` - 全站通用组件
    - `global/` - 全局使用的组件
    - `page/` - 单页面或局部使用的组件
  - `styles/` - 全局样式和变量
    - `components/` - 针对各组件拆分的样式
- `static/` - 静态图片
- `versioned_docs/` - 通过 docusaurus 版本化命令生成的文档版本
- `versioned_sitebars/` - 通过 docusaurus 版本化命令生成的侧边栏版本

## 内容创作

Capacitor 文档的内容以 [Markdown](https://commonmark.org/) 格式存放于 `docs/` 目录。每个 Markdown 文件对应一个路由，除非在 frontmatter 中显式更改。

您可以通过[直接在 GitHub 上编辑 Markdown 文件](https://help.github.com/articles/editing-files-in-another-user-s-repository/)来修改网站内容。在您的 Pull Request 中，请说明内容缺失或不准确的地方。

### 参考内容

`docs/` 目录下的 Markdown 不仅包含手写文档：

- 路径匹配 `/docs/apis/*` 的内容由 [Capacitor Plugins](https://github.com/ionic-team/capacitor-plugins) 源代码生成

## 报告问题

在向 Capacitor 文档仓库提交问题前，请先查阅[已有问题](https://github.com/ionic-team/capacitor-docs/issues)，避免重复报告。

如果您报告的是 bug，请确保问题出在 Capacitor 文档本身，而不是文档所述内容。请在报告中提供：

- 重现步骤
- 预期行为
- 操作系统和浏览器版本
- 如有可能，提供演示仓库或 CodePen/CodeSandbox

> **注意**：部分[参考内容](#参考内容)来自其他 Capacitor 仓库。此类问题请在文档仓库提交，并附上内容来源仓库的链接。

---

## Pull Request 指南

提交 Pull Request 时，请确保更改范围仅限于单一功能或 bug 修复。如有疑问，建议将 Pull Request 拆分得更小。如果您的 Pull Request 是新功能，建议先提交 issue 讨论达成一致后再投入大量时间开发。

---

## 部署

Capacitor 文档的 `main` 分支会自动部署，与 [Capacitor 官网](https://github.com/ionic-team/capacitor-site) 分开。官网通过代理 `/docs` 路径来请求已部署的文档。

---

## 许可证

本仓库的许可证和管理与 Capacitor 本体分开。

通过为本仓库贡献，您同意您的贡献将以 Apache 2.0 许可证授权。详见 [LICENSE](../LICENSE) 获取完整许可文本。
