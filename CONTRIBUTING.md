# 贡献指南

感谢您对贡献 Capacitor 文档感兴趣！🎉 在提交贡献前，请查阅以下建议和要求的指南。

- [贡献指南](#贡献指南)
  - [开发流程](#开发流程)
  - [在 Windows 上使用 VS Code](#在-windows-上使用-vs-code)
  - [项目结构](#项目结构)
    - [目录结构](#目录结构)
  - [内容创作](#内容创作)
    - [本地创作](#本地创作)
  - [报告问题](#报告问题)
  - [拉取请求指南](#拉取请求指南)
  - [部署](#部署)
  - [许可证](#许可证)

---

## 开发流程

为了在本地运行文档，需要安装依赖并启动开发服务器：

```sh
$ npm install
$ npm start
```

> **注意**：运行某些脚本需要 npm (8+) 和 Node.js (16+) 的较新版本。

---

## 在 Windows 上使用 VS Code

Capacitor 文档最初是在基于 Mac 的环境下构建的，因此在提交更改时适用 Mac 风格的代码检查规则。要在 Windows 上贡献，请按以下步骤操作：

- 配置 VS Code 使用换行符 (LF) 而非回车换行符 (CRLF) 来读取/保存文件。通过以下路径全局设置：设置 -> 文本编辑器 -> 文件 -> Eol。设置为 `\n`。
- 检查 Git 设置 `core.autocrlf` 是否为 `false`：运行 `git config -l | grep autocrlf`。使用以下命令将其切换为 false：`git config --global core.autocrlf false`。
- 如果您已经克隆了 `capacitor-docs` 仓库，文件可能已缓存为 LF 格式。要撤销此设置，您需要清理仓库的缓存文件。运行以下命令（请确保先暂存或提交您的更改）：`git rm --cached -r .` 然后 `git reset --hard`。

## 项目结构

Capacitor 文档使用 [Docusaurus](https://docusaurus.io) 构建。内容以 Markdown 格式编写或生成。

### 目录结构

- `scripts/` - 用于生成 Markdown 或 JSON 文件的构建脚本
- `src/` - 文档的源代码和内容
  - `components/` - 在整个站点中使用的组件
    - `global/` - 全局使用的组件
    - `page/` - 在单个页面或有限范围内使用的组件
  - `styles/` - 全局样式和变量
    - `components/` - 按目标组件拆分的样式
- `static/` - 静态图片
- `versioned_docs/` - 通过 Docusaurus 版本控制命令创建的文档版本
- `versioned_sidebars/` - 通过 Docusaurus 版本控制命令创建的文档侧边栏版本

## 内容创作

Capacitor 文档的内容以 [Markdown](https://commonmark.org) 格式编写在 `docs/` 目录下。除非在 frontmatter 中显式更改，否则每个 Markdown 文件对应一个路由。

您可以通过[直接在 GitHub 上编辑 Markdown 文件](https://help.github.com/articles/editing-files-in-another-user-s-repository)来对网站进行文本编辑。在您的拉取请求中，请说明内容中缺失或不准确之处。

### 参考内容

`docs/` 目录中的 Markdown 不仅包含手动编写的 Markdown 文件：

- 匹配 `/docs/apis/*` 路径的文件是从 [Capacitor 插件](https://github.com/ionic-team/capacitor-plugins)源代码构建生成的

## 报告问题

在向 Capacitor 文档仓库提交问题之前，请先搜索[现有问题](https://github.com/ionic-team/capacitor-docs/issues)以避免重复报告。

如果您报告的问题是错误，请确保这是 Capacitor 文档本身的问题，而不是文档主题的问题。在报告中请提供：

- 重现步骤
- 预期行为
- 操作系统和浏览器版本
- 如果可能，提供一个演示仓库或 CodePen/CodeSandbox

> **注意**：某些[参考内容](#参考内容)是从其他 Capacitor 仓库拉取的。在这种情况下，请在文档仓库提交问题，并附上内容来源仓库的链接。

---

## 拉取请求指南

提交拉取请求时，请将更改范围控制在单个功能或错误修复内。如有疑问，倾向于提交较小的拉取请求。如果您的拉取请求是新功能，我们建议先开一个 issue，在投入大量时间之前就功能达成一致。

---

## 部署

Capacitor 文档的 `main` 分支会自动部署，并且独立于 [Capacitor 网站](https://github.com/ionic-team/capacitor-site)本身。Capacitor 网站随后使用代理来处理 `/docs` 路径下的请求，以访问已部署的文档。

---

## 许可证

此仓库的许可证和管理方式与 Capacitor 本身分开。

通过贡献到此仓库，您同意您的贡献将根据 Apache 2.0 许可证进行许可。完整的许可证文本请参见 [LICENSE](../LICENSE)。