# 贡献指南

感谢您对 Capacitor 文档的兴趣与贡献！:tada: 在提交贡献之前，请查看以下指南中的建议和要求。

- [贡献指南](#贡献指南)
  - [开发工作流](#开发工作流)
  - [在 Windows 上使用 VS Code](#在-windows-上使用-vs-code)
  - [项目结构](#项目结构)
    - [目录](#目录)
  - [编写内容](#编写内容)
    - [本地编写](#本地编写)
  - [报告问题](#报告问题)
  - [Pull Request 指南](#pull-request-指南)
  - [部署](#部署)
  - [许可证](#许可证)

---

## 开发工作流

要在本地运行文档，请安装依赖并启动开发服务器：

```sh
$ npm install
$ npm start
```

> **注意**：运行某些脚本需要较新版本的 npm（8+）和 Node.js（16+）。

---

## 在 Windows 上使用 VS Code

Capacitor 文档最初是在 Mac 环境中构建的，因此在提交更改时适用 Mac 相关的代码检查规则。要在 Windows 上贡献，请执行以下操作：

- 将 VS Code 配置为使用换行符（LF）而非回车换行（CRLF）读取/保存文件。全局设置方法：前往 设置 -> 文本编辑器 -> 文件 -> Eol。设置为 `\n`。
- 确认 Git 设置 `core.autocrlf` 为 `false`：运行 `git config -l | grep autocrlf`。如果未设置为 false，请运行：`git config --global core.autocrlf false`。
- 如果您已经克隆了 `capacitor-docs` 仓库，文件可能已缓存为 LF 格式。要撤销此操作，您需要清理仓库的缓存文件。请先暂存或提交您的更改，然后运行以下命令：`git rm --cached -r .` 接着 `git reset --hard`。

## 项目结构

Capacitor 文档使用 [Docusaurus](https://docusaurus.io/) 构建。内容以 Markdown 格式编写或生成。

### 目录

- `scripts/` - 用于生成 markdown 或 json 文件的构建脚本
- `src/` - 文档的源代码和内容
  - `components/` - 在整个站点中使用的组件
    - `global/` - 全局使用的组件
    - `page/` - 在单个页面或有限范围内使用的组件
  - `styles/` - 全局样式和变量
    - `components/` - 按组件拆分的样式
- `static/` - 静态图片
- `versioned_docs/` - 通过 docusaurus 版本管理命令创建的文档版本
- `versioned_sidebars/` - 通过 docusaurus 版本管理命令创建的文档侧边栏版本

## 编写内容

Capacitor 文档的内容以 [Markdown](https://commonmark.org/) 格式编写，存放在 `docs/` 目录中。每个 Markdown 文件对应一个路由，除非在前置元数据中明确更改。

您可以通过 [直接在 GitHub 上编辑 Markdown 文件](https://help.github.com/articles/editing-files-in-another-user-s-repository/) 来对网站进行文字修改。在提交 Pull Request 时，请说明内容中缺少了什么或有哪些不准确之处。

### 参考内容

`docs/` 中的 Markdown 文件不仅仅是手动编写的 markdown 文件：

- 匹配 `/docs/apis/*` 路径的文件是从 [Capacitor Plugins](https://github.com/ionic-team/capacitor-plugins) 源代码构建的。

## 报告问题

在向 Capacitor 文档仓库提交问题之前，请先搜索[现有问题](https://github.com/ionic-team/capacitor-docs/issues)以避免重复报告。

如果您报告的问题是错误，请确保它是 Capacitor 文档本身的问题，而不是文档所描述的主题的问题。提交报告时，请提供：

- 重现步骤
- 预期行为
- 操作系统和浏览器版本
- 如果可能，提供一个演示仓库或 CodePen/CodeSandbox

> **注意**：部分[参考内容](#参考内容)是从其他 Capacitor 仓库中提取的。在这种情况下，请在文档仓库中提交问题，并附上内容所在仓库的链接。

---

## Pull Request 指南

提交 Pull Request 时，请将更改范围限制在单一功能或错误修复内。如有疑问，宁可将 Pull Request 拆分为更小的范围。如果您的 Pull Request 是一个新功能，我们建议先提交一个 issue 来就该功能达成一致，然后再投入大量时间。

---

## 部署

Capacitor 文档的 `main` 分支会自动部署，与 [Capacitor 网站](https://github.com/ionic-team/capacitor-site) 本身分开部署。Capacitor 网站随后会对 `/docs` 下的路径使用代理来请求已部署的文档。

---

## 许可证

本仓库独立于 Capacitor 本身进行许可和管理。

通过向本仓库贡献，您同意您的贡献根据 Apache 2.0 许可证进行许可。完整的许可证文本请参见 [LICENSE](../LICENSE)。
