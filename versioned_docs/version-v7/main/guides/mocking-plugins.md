---
title: 模拟插件
description: 如何为 Capacitor 插件创建模拟对象
contributors:
  - kensodemann
slug: /guides/mocking-plugins
---

# 模拟 Capacitor 插件

在应用中创建单元测试时，最佳实践是为被测单元的任何外部依赖项创建模拟（mock）。这包括你的组件或服务正在使用的 Capacitor 插件。

大多数模拟库通过接受一个对象并将其包装在 JavaScript 代理中来创建模拟，以便可以检查对该对象方法的调用并控制方法的返回值。然而，Capacitor 插件在 JavaScript 层中作为代理实现。创建代理的代理是不被支持且会失败的。可以使用手动模拟来规避此问题。

## 手动模拟

手动模拟允许用户轻松地桩化整个 JavaScript 模块的功能。因此，当测试执行 `import { Storage } from '@capacitor/storage'` 时，测试将加载类似以下内容，而不是加载真正的 `Storage` JavaScript 代理对象：

```TypeScript
export const Storage = {
  async get(data: { key: string }): Promise<{ value: string | undefined }> {
    return { value: undefined };
  },

  async set(data: { key: string; value: string }): Promise<void> {},
  async clear(): Promise<void> {},
};
```

由于这是一个普通的 JavaScript 对象而非代理对象，因此很容易对其进行监视（spy）。此外，由于它是模拟对象，它不会尝试进行任何原生调用。这使得手动模拟成为测试使用 Capacitor 插件的代码的理想选择。

### Jest

Jest 测试框架内置了<a href="https://jestjs.io/docs/manual-mocks" _target="blank">手动模拟</a>功能。在项目根目录创建一个 `__mocks__/@capacitor` 文件夹，Jest 将从该文件夹自动加载文件，而不是从 `node_modules` 加载。

例如，假设你有以下目录结构：

```
.
|
+- __mocks__
| |
| +- @capacitor
|   |
|   +- storage.ts
|   +- toast.ts
...
+- src
```

你的测试将使用 `storage.ts` 和 `toast.ts` 中定义的桩（stub），而不是使用 `node_modules` 中真正的 `@capacitor/storage` 和 `@capacitor/toast` 插件。

### Jasmine

Jasmine 测试框架不包含"手动模拟"的概念，但我们可以通过使用 TypeScript 路径映射来轻松模拟此功能。

首先，在项目根级别创建与 Jest 示例中相同的目录结构。

Angular 项目（使用 Jasmine 作为测试框架的最常见场景）包含一个 `tsconfig.spec.json` 文件，该文件在执行单元测试时扩展了 `tsconfig.json` 基础配置。修改此文件以扩展你在基础级别可能已有的任何 `paths` 映射。

例如，如果你的 `tsconfig.json` 文件包含以下 `paths` 映射：

```JSON
    "paths": {
      "@app/*": ["src/app/*"],
      "@env/*": ["src/environments/*"]
    },
```

然后更新你的 `tsconfig.spec.json` 文件，以包含这些路径以及你想用于单元测试的任何路径：

```JSON
    "paths": {
      "@app/*": ["src/app/*"],
      "@env/*": ["src/environments/*"],
      "@test/*": ["test/*"],
      "@capacitor/*": ["__mocks__/@capacitor/*"]
    }
```

现在，当单元测试被编译时，`import { Storage } from '@capacitor/storage';` 将使用 `__mocks__/@capacitor` 下的桩文件，而不是 `node_modules` 中的真实文件。

**注意：** `paths` 对象是完全替换而非合并，因此如果你在 `tsconfig.json` 中定义了任何路径，它们_必须_也包含在 `tsconfig.spec.json` 中。

## 模拟桩（Stubs）

手动模拟就位后，现在可以以所有常规方式编写测试来模拟和监视方法调用。

### Jest

```TypeScript
  it("获取名和姓", async () => {
    Storage.get = jest.fn().mockImplementation(
      async (data: { key: string }): Promise<{ value: string }> => {
        return data.key === "firstName"
          ? { value: "Jimmy" }
          : data.key === "lastName"
          ? { value: "Simms" }
          : { value: "unknown" };
      }
    );
    const w = mount(Home);
    await flushPromises();
    expect(w.vm.firstName).toEqual("Jimmy");
    expect(w.vm.lastName).toEqual("Simms");
  });

  it("清除存储", () => {
    const button = wrapper.findComponent('[data-testid="clear"]');
    Storage.clear = jest.fn().mockResolvedValue(undefined);
    button.trigger("click");
    expect(Storage.clear).toHaveBeenCalledTimes(1);
  });
```

### Jasmine

```TypeScript
  it("获取名和姓", async () => {
    spyOn(Storage, 'get');
    (Storage.get as any)
      .withArgs({ key: 'firstName' })
      .and.returnValue(Promise.resolve({ value: 'Jason' }));
    (Storage.get as any)
      .withArgs({ key: 'lastName' })
      .and.returnValue(Promise.resolve({ value: 'Jones' }));

    fixture.detectChanges();
    await fixture.whenRenderingDone();

    expect(component.firstName).toEqual('Jason');
    expect(component.lastName).toEqual('Jones');
  });

  it('清除存储', () => {
    spyOn(Storage, 'clear');
    click(clear.nativeElement);
    fixture.detectChanges();
    expect(Storage.clear).toHaveBeenCalledTimes(1);
  });
```

## 示例

- [在 Jasmine 中模拟 Capacitor 插件](https://github.com/ionic-team/cap-plugin-mock-jasmine)
- [在 Jest 中模拟 Capacitor 插件](https://github.com/ionic-team/cap-plugin-mock-jest)
