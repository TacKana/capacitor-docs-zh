---
title: 构建你的 UI
description: 构建优秀 Capacitor 移动应用的流行 UI 选择
slug: /getting-started/ui
---

# 构建你的 UI

Capacitor 应用核心是 Web 应用。但要提供出色的原生质量移动应用体验，需要的远不止包装一个网站。

如今，团队在应用 UI 方面有多种选择。让我们探索一些最流行的选项。

## Ionic Framework

[Ionic Framework](https://ionicframework.com/) 是一个专注于移动端的 UI 工具包和一组实用工具，使使用 Capacitor 的 Web 开发者能够获得遵循平台惯例的原生质量应用体验。Ionic Framework 由与 Capacitor 相同的公司创建，并专门为 Capacitor 设计。

如今，Ionic Framework 是我们推荐的 Capacitor UI 框架，因为我们相信它将帮助团队实现最高质量的原生应用体验。但是，在你的 Capacitor 应用中**不**一定要使用它。

Ionic Framework 提供了原生质量的转场动画和路由，适用于 [Angular](https://ionicframework.com/docs/angular/navigation)、[React](https://ionicframework.com/docs/react/navigation) 和 [Vue](https://ionicframework.com/docs/vue/navigation)，并与每个框架中最流行的路由解决方案深度集成。此外，Ionic 还提供了强大的组件，如[模态框](https://ionicframework.com/docs/api/modal)、[菜单](https://ionicframework.com/docs/api/menu)、[列表](https://ionicframework.com/docs/api/list)，以及强大的列表项功能，如[滑动列表项](https://ionicframework.com/docs/api/item-sliding)、[表单输入](https://ionicframework.com/docs/api/input)、[日期时间选择器](https://ionicframework.com/docs/api/datetime)、[卡片](https://ionicframework.com/docs/api/card)、[标签页](https://ionicframework.com/docs/api/tabs)、[iOS 风格的紧凑标题](https://ionicframework.com/docs/api/header#condensed-header)，以及[更多功能](https://ionicframework.com/docs/components)。

Ionic Framework 需要 Angular、React 或 Vue，因此只适用于使用这些技术的团队。

要开始使用，请查看[将 Capacitor 与 Ionic 一起使用](./with-ionic)文档以了解更多信息。

## Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) 是一个流行的 CSS 框架，配有配套的 UI 模板库，许多 Capacitor 开发者使用它来构建出色的应用体验。我们最喜欢的一些示例包括 [Reflect](https://reflect.app/) 和 [LogSnag](https://twitter.com/ImSh4yy/status/1615080429417103366?s=20&t=bmVrAb9PNFY6AQPNXwMFYA)。

还有一些有趣的专注于 Tailwind 的移动端 UI 框架，如 [Konsta UI](https://konstaui.com/)。

使用 Tailwind 时，重要的是要记住 Tailwind 不提供移动风格的导航和路由原语，因此团队需要注意构建符合平台惯例的 UX。一种方法是将 Tailwind 与 Ionic Framework 混合使用，如这个 [Next.js + Tailwind + Ionic Framework + Capacitor 模板](https://github.com/mlynch/nextjs-tailwind-ionic-capacitor-starter) 所示。另一种方法是设计避免传统前进/后退导航的 UX，而是使用标签页或模态框。最后，如果需要，团队可以自由构建自定义的导航和路由体验。

## Framework7

[Framework7](https://framework7.io/) 是一个流行的专注于移动端的 UI 库，由 [Swiper](https://swiperjs.com/)（一个强大的移动触摸滑块库）的开发者创建。

## Quasar

[Quasar](https://quasar.dev/) 是一个 Vue.js 框架，具有移动端组件和对 Capacitor 的[官方支持](https://quasar.dev/quasar-cli-vite/developing-capacitor-apps/introduction#introduction)。

## Material UI

[Material UI](https://mui.com/) 是一个流行的专注于 React 的库，实现了 Material Design 指南。

## 自行构建

如果你已经有现有的 UI 工具包，或者想要实现自己的 UI 工具包，我们建议参考 Ionic Framework 和这里介绍的其他选项以获取灵感。Capacitor 提供了一张白纸来构建你的梦想，但如果你选择自行构建 UI，你需要负责构建用户所期望的优秀体验。这在你构建应用的同时可能会很有挑战性，因此我们通常只建议非常高级的团队或已经针对移动端优化的 Web 应用这样做。
