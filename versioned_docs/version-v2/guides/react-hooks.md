---
title: React Hooks for Capacitor
description: 使用这些 React Hooks 简化 Capacitor 原生移动端 API 的调用
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/guides/react-hooks
---

# Capacitor 的 React Hooks

在 Capacitor 应用中使用 React 的开发者可以利用这套由社区维护的实用 React Hooks，轻松地在 React 函数组件中调用 Capacitor API。

安装 hooks：

```shell
npm install @capacitor-community/react-hooks
```

使用时只需在函数组件中导入即可：

```typescript
import { useFilesystem, base64FromPath, availableFeatures } from '@capacitor-community/react-hooks/filesystem';

const MyComponent = () => (
  const { readFile } = useFilesystem();

  useEffect(() => {
    const readMyFile = async () => {
      const file = await readFile({
        path: filepath,
        directory: FilesystemDirectory.Data
      });
      // ...
    }

    readMyFile();
  }, [ readFile ]);
```

## 扩展阅读

所有可用 hooks 的文档请参阅 [@capacitor-community/react-hooks](https://github.com/capacitor-community/react-hooks) 代码仓库。