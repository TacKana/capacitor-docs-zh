---
title: Angular
description: 在Angular中使用Capacitor
slug: /guides/angular
---

# 在Angular中使用Capacitor

## NgZone处理

Capacitor插件的事件监听器运行在Angular的`NgZone`执行上下文之外。为确保Angular的变更检测机制能够触发，请将处理逻辑包裹在`NgZone.run`代码块中：

```typescript
constructor(private ngZone: NgZone) { }

async ngOnInit() {
  Network.addListener("networkStatusChange", (status) => {
    this.ngZone.run(() => {
      // 此处的代码将在Angular的执行上下文中运行
      this.networkStatus = status.connected ? "在线" : "离线";
    });
  });
}
```