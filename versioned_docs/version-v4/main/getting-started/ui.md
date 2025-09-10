---
title: 构建用户界面
description: 为打造卓越的 Capacitor 移动应用提供的流行UI方案
slug: /getting-started/ui
---

# 构建用户界面

Capacitor 应用本质上都是网页应用。但要打造真正出色的原生级移动体验，仅仅包装一个网站是远远不够的。

如今，开发团队有多种UI方案可供选择。让我们来看看其中几个最受欢迎的选项。

## Ionic 框架

[Ionic Framework](https://ionicframework.com/) 是一个专注于移动端的UI工具包和实用程序集，它能使使用 Capacitor 的网页开发者获得符合平台惯例的原生级应用体验。Ionic Framework 由 Capacitor 的同一开发公司创建，是专为 Capacitor 量身定制的解决方案。

目前，我们推荐将 Ionic Framework 作为 Capacitor 的首选UI框架，因为它能帮助团队实现最高质量的原生应用体验。不过，在 Capacitor 应用中使用它并不是强制要求。

Ionic Framework 为 [Angular](https://ionicframework.com/docs/angular/navigation)、[React](https://ionicframework.com/docs/react/navigation) 和 [Vue](https://ionicframework.com/docs/vue/navigation) 提供了原生级的过渡动画和路由系统，并与各框架中最流行的路由解决方案深度集成。此外，它还包含众多强大组件，如[模态框](https://ionicframework.com/docs/api/modal)、[菜单](https://ionicframework.com/docs/api/menu)、[列表](https://ionicframework.com/docs/api/list)，以及特色功能如[滑动条目](https://ionicframework.com/docs/api/item-sliding)、[表单输入](https://ionicframework.com/docs/api/input)、[日期时间选择器](https://ionicframework.com/docs/api/datetime)、[卡片](https://ionicframework.com/docs/api/card)、[标签页](https://ionicframework.com/docs/api/tabs)、[iOS风格紧凑标题栏](https://ionicframework.com/docs/api/header#condensed-header)等[丰富组件](https://ionicframework.com/docs/components)。

Ionic Framework 需要配合 Angular、React 或 Vue 使用，因此只适合采用这些技术的团队。

要开始使用，请查看[在 Ionic 中使用 Capacitor](./with-ionic) 的文档了解更多信息。

## Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) 是一个流行的CSS框架，配有配套的UI模板库，许多 Capacitor 开发者用它来构建优秀的应用体验。我们喜爱的案例包括 [Reflect](https://reflect.app/) 和 [LogSnag](https://twitter.com/ImSh4yy/status/1615080429417103366?s=20&t=bmVrAb9PNFY6AQPNXwMFYA)。

还有一些专注于移动端的 Tailwind UI 框架值得关注，例如 [Konsta UI](https://konstaui.com/)。

使用 Tailwind 时需要注意，它不提供移动端风格的导航和路由基础功能，因此团队需要精心设计符合平台惯例的用户体验。一个解决方案是将 Tailwind 与 Ionic Framework 结合使用，如这个 [Next.js + Tailwind + Ionic Framework + Capacitor 模板](https://github.com/mlynch/nextjs-tailwind-ionic-capacitor-starter)所示。另一种方式是设计避免传统前进/后退导航的界面，转而采用标签页或模态框。当然，团队也可以自由构建自定义的导航路由体验。

## Framework7

[Framework7](https://framework7.io/) 是一个专注于移动端的流行UI库，由强大的移动触摸滑动库 [Swiper](https://swiperjs.com/) 的开发者创建。

## Quasar

[Quasar](https://quasar.dev/) 是一个 Vue.js 框架，提供移动端组件并[官方支持 Capacitor](https://quasar.dev/quasar-cli-vite/developing-capacitor-apps/introduction#introduction)。

## Material UI

[Material UI](https://mui.com/) 是一个流行的 React 组件库，实现了 Material Design 规范。

## 自定义方案

如果您已有现成的UI套件或希望自行实现，我们建议参考 Ionic Framework 和其他列出的方案获取灵感。Capacitor 为您提供了自由创作的画布，但如果选择自主开发UI，您需要负责构建符合用户预期的优秀体验。这在应用开发基础上会带来额外挑战，因此我们通常只建议经验丰富的团队或已经做好移动端优化的网页应用采用此方案。