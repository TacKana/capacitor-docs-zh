---
title: Angular
description: 在 Angular 中使用 Capacitor
slug: /guides/angular
---

# 在 Angular 中使用 Capacitor

## NgZone 处理

Capacitor 插件的事件监听器运行在 Angular 的 `NgZone` 执行上下文之外。为确保 Angular 的变更检测能够触发，需要将处理逻辑包裹在 `NgZone.run` 代码块中：

```typescript
constructor(private ngZone: NgZone) { }

async ngOnInit() {
  Network.addListener("networkStatusChange", (status) => {
    this.ngZone.run(() => {
      // 这段代码将在 Angular 的执行上下文中运行
      this.networkStatus = status.connected ? "在线" : "离线";
    });
  });
}
```