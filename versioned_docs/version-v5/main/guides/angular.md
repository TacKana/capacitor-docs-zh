---
title: Angular
description: 在 Capacitor 中使用 Angular
slug: /guides/angular
---

# 在 Capacitor 中使用 Angular

## NgZone 上下文处理

Capacitor 插件的事件监听器运行在 Angular `NgZone` 执行上下文之外。为确保 Angular 的变更检测能够触发，需要将处理逻辑包裹在 `NgZone.run` 代码块中：

```typescript
constructor(private ngZone: NgZone) { }

async ngOnInit() {
  Network.addListener("networkStatusChange", (status) => {
    this.ngZone.run(() => {
      // 这里的代码会在 Angular 执行上下文中运行
      this.networkStatus = status.connected ? "在线" : "离线";
    });
  });
}
```