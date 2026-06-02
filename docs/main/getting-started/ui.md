---
title: 构建你的 UI
description: 构建出色的 Capacitor 移动应用的流行 UI 选项
slug: /getting-started/ui
---

# 构建你的 UI

Capacitor 应用本质上是 Web 应用。但要交付一款出色的原生级移动应用，仅仅包装一个网站是远远不够的。

如今，团队在应用 UI 方面有多种选择。让我们来探索一些最流行的选项。

## Ionic Framework

[Ionic Framework](https://ionicframework.com/) 是一个专注于移动端的 UI 工具包和实用程序集，使使用 Capacitor 的 Web 开发者能够获得遵循平台惯例的原生级应用体验。Ionic Framework 由与 Capacitor 相同的公司创建，并专为 Capacitor 而设计。

目前，Ionic Framework 是我们推荐的 Capacitor UI 框架，因为我们相信它能帮助团队实现最高质量的原生应用体验。不过，在你的 Capacitor 应用中 _并不_ 强制要求使用它。

Ionic Framework 为 [Angular](https://ionicframework.com/docs/angular/navigation)、[React](https://ionicframework.com/docs/react/navigation) 和 [Vue](https://ionicframework.com/docs/vue/navigation) 提供了原生级的过渡动画和路由功能，并与每个框架中最流行的路由解决方案深度集成。此外，Ionic 还提供了强大的组件，如 [Modals](https://ionicframework.com/docs/api/modal)、[Menus](https://ionicframework.com/docs/api/menu)、[Lists](https://ionicframework.com/docs/api/list)，以及强大的列表项功能，如 [Sliding Items](https://ionicframework.com/docs/api/item-sliding)、[Form inputs](https://ionicframework.com/docs/api/input)、[Datetime pickers](https://ionicframework.com/docs/api/datetime)、[Cards](https://ionicframework.com/docs/api/card)、[Tabs](https://ionicframework.com/docs/api/tabs)、[iOS 风格的压缩头部](https://ionicframework.com/docs/api/header#condensed-header)以及[更多功能](https://ionicframework.com/docs/components)。

Ionic Framework 需要 Angular、React 或 Vue，因此仅适用于使用这些技术的团队。

要开始使用，请查看[使用 Capacitor 与 Ionic](./with-ionic)文档以了解更多信息。

## Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) 是一个流行的 CSS 框架，配有配套的 UI 模板库，许多 Capacitor 开发者使用它来构建出色的应用体验。我们最喜欢的示例包括 [Reflect](https://reflect.app/) 和 [LogSnag](https://twitter.com/ImSh4yy/status/1615080429417103366?s=20&t=bmVrAb9PNFY6AQPNXwMFYA)。

还有一些有趣的专注于 Tailwind 的移动端 UI 框架，例如 [Konsta UI](https://konstaui.com/)。

使用 Tailwind 时，需要记住 Tailwind 不提供移动风格的导航和路由原语，因此团队需要注意构建符合平台惯例的用户体验。一种方法是将 Tailwind 与 Ionic Framework 混合使用，如这个 [Next.js + Tailwind + Ionic Framework + Capacitor 模板](https://github.com/mlynch/nextjs-tailwind-ionic-capacitor-starter)所示。另一种方法是设计避免传统前进/后退导航的用户体验，而是使用标签页或模态框。最后，团队也可以根据需求自由构建自定义的导航和路由体验。

## Framework7

[Framework7](https://framework7.io/) 是一个流行的专注于移动端的 UI 库，由 [Swiper](https://swiperjs.com/)（一个强大的移动端触摸滑动库）的开发者创建。

## Quasar

[Quasar](https://quasar.dev/) 是一个 Vue.js 框架，提供专注于移动端的组件并[官方支持 Capacitor](https://quasar.dev/quasar-cli-vite/developing-capacitor-apps/introduction#introduction)。

## Material UI

[Material UI](https://mui.com/) 是一个流行的专注于 React 的库，实现了 Material Design 设计指南。

## 自行构建

如果你已有现有的 UI 工具包或希望自行实现，我们建议参考 Ionic Framework 以及此处列出的其他选项以获得灵感。Capacitor 为你构建理想应用提供了空白画布，但如果你选择自行构建 UI，你需要负责打造用户所期望的出色体验。这在构建应用的同时可能具有挑战性，因此我们通常只建议非常资深的团队或已经针对移动端优化过的 Web 应用采用此方式。
