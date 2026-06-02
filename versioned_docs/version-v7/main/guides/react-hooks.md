---
title: React Hooks
description: 使用这些 React Hooks 简化通过 Capacitor 访问原生移动 API
contributors:
  - mlynch
slug: /guides/react-hooks
---

# Capacitor 的 React Hooks

在 Capacitor 应用中使用 React 的开发者可以使用一组有用的、社区维护的 React Hooks，以便在其 React 函数组件中访问 Capacitor API。

安装 hooks：

```shell
npm install @capacitor-community/react-hooks
```

使用 hooks，在函数组件中导入并使用：

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

## 更多信息

请参阅 [@capacitor-community/react-hooks](https://github.com/capacitor-community/react-hooks) 仓库，获取所有可用 hooks 的文档。
