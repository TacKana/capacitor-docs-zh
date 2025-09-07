---
title: React Hooks
description: 使用这些React Hooks简化Capacitor原生移动API的访问
contributors:
  - mlynch
slug: /guides/react-hooks
---

# Capacitor的React Hooks

在Capacitor应用中使用React的开发者，可以利用一系列社区维护的实用React Hooks，在函数组件中便捷地访问Capacitor API。

安装Hooks:

```shell
npm install @capacitor-community/react-hooks
```

使用时，只需在函数组件中导入并调用：

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

查看 [@capacitor-community/react-hooks](https://github.com/capacitor-community/react-hooks) 仓库获取所有可用Hooks的详细文档。