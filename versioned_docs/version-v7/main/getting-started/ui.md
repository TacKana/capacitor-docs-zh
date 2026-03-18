---
title: 构建用户界面
description: 构建优秀 Capacitor 移动应用的热门用户界面方案
slug: /getting-started/ui
---

# 构建用户界面

Capacitor 应用本质上是 Web 应用。但要提供出色的原生级移动应用体验，仅靠包装网站是远远不够的。

如今，团队在应用用户界面上有多种选择。让我们来探讨一些最受欢迎的方案。

## Ionic Framework

[Ionic Framework](https://ionicframework.com/) 是一套专注于移动端的 UI 工具包和实用程序集，让使用 Capacitor 的 Web 开发者能够获得遵循平台规范的原生级应用体验。Ionic Framework 由开发 Capacitor 的同一家公司创建，在设计时特别考虑了与 Capacitor 的兼容性。

目前，Ionic Framework 是我们为 Capacitor 推荐的 UI 框架，因为我们相信它能帮助团队实现最高质量的原生应用体验。不过，它并非 Capacitor 应用的强制要求。

Ionic Framework 为 [Angular](https://ionicframework.com/docs/angular/navigation)、[React](https://ionicframework.com/docs/react/navigation) 和 [Vue](https://ionicframework.com/docs/vue/navigation) 提供原生级过渡动画和路由功能，并与各框架中最流行的路由解决方案深度集成。此外，Ionic 还提供强大的组件，如 [模态框](https://ionicframework.com/docs/api/modal)、[菜单](https://ionicframework.com/docs/api/menu)、[列表](https://ionicframework.com/docs/api/list)，以及强大的项目功能，如 [滑动项目](https://ionicframework.com/docs/api/item-sliding)、[表单输入](https://ionicframework.com/docs/api/input)、[日期时间选择器](https://ionicframework.com/docs/api/datetime)、[卡片](https://ionicframework.com/docs/api/card)、[标签页](https://ionicframework.com/docs/api/tabs)、[iOS 风格紧凑标题栏](https://ionicframework.com/docs/api/header#condensed-header)和[更多功能](https://ionicframework.com/docs/components)。

Ionic Framework 需要 Angular、React 或 Vue，因此仅适用于使用这些技术的团队。

要开始使用，请查看 [在 Ionic 中使用 Capacitor](./with-ionic) 文档了解更多信息。

## Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) 是一个流行的 CSS 框架，附带配套的 UI 模板库，许多 Capacitor 开发者用它来构建出色的应用体验。我们最喜欢的例子包括 [Reflect](https://reflect.app/) 和 [LogSnag](https://twitter.com/ImSh4yy/status/1615080429417103366?s=20&t=bmVrAb9PNFY6AQPNXwMFYA)。

还有一些专注于 Tailwind 的移动端 UI 框架，例如 [Konsta UI](https://konstaui.com/)。

使用 Tailwind 时，需要注意 Tailwind 不提供移动端风格的导航和路由基础组件，因此团队需要精心构建符合平台规范的用户体验。一种方法是将 Tailwind 与 Ionic Framework 结合使用，如这个 [Next.js + Tailwind + Ionic Framework + Capacitor 模板](https://github.com/mlynch/nextjs-tailwind-ionic-capacitor-starter)所示。另一种方法是设计避免传统前进/后退导航的交互体验，转而使用标签页或模态框。最后，团队也可以根据需要构建自定义的导航和路由体验。

## Framework7

[Framework7](https://framework7.io/) 是一个流行的专注于移动端的 UI 库，由强大的移动端触摸滑动库 [Swiper](https://swiperjs.com/) 的开发者创建。

## Quasar

[Quasar](https://quasar.dev/) 是一个 Vue.js 框架，提供专注于移动端的组件，并[官方支持 Capacitor](https://quasar.dev/quasar-cli-vite/developing-capacitor-apps/introduction#introduction)。

## Material UI

[Material UI](https://mui.com/) 是一个流行的专注于 React 的库，实现了 Material Design 设计规范。

## 自定义方案

如果您已有现成的 UI 工具包或希望自行实现，我们建议参考 Ionic Framework 和本文介绍的其他方案以获取灵感。Capacitor 为您提供了构建理想应用的白板，但如果您选择自定义 UI，则需要负责构建用户期望的优秀体验。在开发应用的同时实现这一点可能具有挑战性，因此我们通常只建议非常资深的团队或已经针对移动端优化的 Web 应用采用此方案。