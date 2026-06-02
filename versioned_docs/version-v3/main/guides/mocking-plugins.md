---
title: Mock 插件
description: 如何为 Capacitor 插件创建 mock 对象
contributors:
  - kensodemann
slug: /guides/mocking-plugins
---

# Mock Capacitor 插件

在应用中创建单元测试时，最佳实践是为被测单元的任何外部依赖项创建 mock。这包括您的组件或服务正在使用的 Capacitor 插件。

大多数 mock 库通过获取一个对象并将其包装在 JavaScript 代理中来创建 mock，以便可以检查对该对象方法的调用并控制方法的返回值。然而，Capacitor 插件是在 JavaScript 层中作为代理实现的。不支持创建代理的代理，并且会失败。手动 mock 可以用来绕过此问题。

## 手动 Mock

手动 mock 允许用户轻松地模拟整个 JavaScript 模块的功能。因此，当测试执行 `import { Storage } from '@capacitor/storage'` 时，测试会加载如下内容，而不是加载真实的 `Storage` JavaScript 代理对象：

```TypeScript
export const Storage = {
  async get(data: { key: string }): Promise<{ value: string | undefined }> {
    return { value: undefined };
  },

  async set(data: { key: string; value: string }): Promise<void> {},
  async clear(): Promise<void> {},
};
```

由于这是一个普通的 JavaScript 对象，而不是代理对象，因此很容易进行监视。此外，由于它是 mock，它不会尝试进行任何原生调用。这使得使用手动 mock 成为测试使用 Capacitor 插件的代码的理想选择。

### Jest

Jest 测试框架内置了<a href="https://jestjs.io/docs/manual-mocks" _target="blank">手动 mock</a>。在项目根目录创建一个 `__mocks__/@capacitor` 文件夹，Jest 将自动从那里加载文件，而不是从 `node_modules` 加载。

例如，假设您有以下目录结构：

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

您的测试将使用 `storage.ts` 和 `toast.ts` 中定义的存根，而不是 `node_modules` 中真实的 `@capacitor/storage` 和 `@capacitor/toast` 插件。

### Jasmine

Jasmine 测试框架不包含"手动 mock"的概念，但我们可以通过使用 TypeScript 路径映射来轻松模拟这一点。

首先，在项目的根级别创建与 Jest 示例相同的目录结构。

Angular 项目（使用 Jasmine 作为测试框架的最常见场景）包含一个 `tsconfig.spec.json` 文件，该文件在执行单元测试时扩展了 `tsconfig.json` 的基本配置。修改此文件以扩展您可能在基本级别拥有的任何 `paths` 映射。

例如，如果您的 `tsconfig.json` 文件包含以下 `paths` 映射：

```JSON
    "paths": {
      "@app/*": ["src/app/*"],
      "@env/*": ["src/environments/*"]
    },
```

然后更新您的 `tsconfig.spec.json` 文件以包含这些路径以及您想要用于单元测试的路径：

```JSON
    "paths": {
      "@app/*": ["src/app/*"],
      "@env/*": ["src/environments/*"],
      "@test/*": ["test/*"],
      "@capacitor/*": ["__mocks__/@capacitor/*"]
    }
```

现在，当单元测试编译时，`import { Storage } from '@capacitor/storage';` 将使用 `__mocks__/@capacitor` 下的存根文件，而不是 `node_modules` 中的真实文件。

**注意：** `paths` 对象是整体替换而不是合并，因此如果您在 `tsconfig.json` 中定义了任何路径，它们**也**必须包含在 `tsconfig.spec.json` 中。

## Mock 存根

有了手动 mock 之后，现在可以编写测试，以所有常规方式 mock 和监视方法调用。

### Jest

```TypeScript
  it("获取名字和姓氏", async () => {
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
  it("获取名字和姓氏", async () => {
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

- [在 Jasmine 中 Mock Capacitor 插件](https://github.com/ionic-team/cap-plugin-mock-jasmine)
- [在 Jest 中 Mock Capacitor 插件](https://github.com/ionic-team/cap-plugin-mock-jest)
