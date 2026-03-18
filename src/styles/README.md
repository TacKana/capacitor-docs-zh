# Styles 文件夹

此文件夹包含一个全局样式文件，该文件在 [docusaurus.config.js](/docusaurus.config.js) 中被引入主题。此外，还包含一个 components 文件夹，用于为主题组件设置样式，而无需进行 swizzling 操作。

相关议题：https://github.com/facebook/docusaurus/pull/5987
由于目前无法覆盖主题样式，我们使用基础的 #\_\_docusaurus 标签来增加选择器的特异性。