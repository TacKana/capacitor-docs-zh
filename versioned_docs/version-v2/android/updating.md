---
title: 更新你的 Capacitor Android 项目
description: 更新你的 Capacitor Android 项目
contributors:
  - mlynch
  - jcesarmobile
---

# 更新你的 Capacitor Android 项目

有时，你需要对 Android 应用进行 Capacitor 更新，包括更新应用中使用的 Capacitor 版本，或在 Android 代码库中使用新的方式与 Capacitor 交互。

## 更新 Capacitor Android 库

要更新应用中使用的 @capacitor/android 版本，只需使用 npm 安装最新版本：

```bash
npm install @capacitor/android@2
```

然后在 Android Studio 中点击 "Sync Project with Gradle Files" 按钮。

## 更新 Android 项目

要更新 Android 项目的基础结构，请查看 Capacitor 仓库中的 [android-template](https://github.com/ionic-team/capacitor/tree/2.x/android-template) 项目，选择与 Capacitor 最新稳定版本对应的标签。核心项目特意保持简单：比较核心项目与你的项目之间的差异应该不会花费太多时间。

### 从 1.0.0 到 1.1.0

推荐的更改：

- 使用 [这些更改](https://github.com/ionic-team/capacitor/commit/e27586780baed231c09f2737bb94a9338aab5a03#diff-15c65f143d85c95277307da1bdd0528e) 更新 `android` 文件夹内的 `.gitignore` 文件

### 从 <= 1.3.0 到 1.4.0

推荐的更改：

- 使用 [此更改](https://github.com/ionic-team/capacitor/commit/ed6647b35a8da08d26a7ff13cc9f4fd918b923a0#diff-15c65f143d85c95277307da1bdd0528e) 更新 `android/app/src/main/res/values/` 文件夹内的 `strings.xml` 文件

### 从 <= 1.5.1 到 2.0.0

必须进行的更改：

- 使用 Android X

  Capacitor 2.0 按照 Google 的建议，使用 Android X 作为 Android 支持库依赖，因此原生项目也需要更新以使用 Android X。

  在 Android Studio 中执行 `Refactor -> Migrate to AndroidX`。然后点击 `Migrate` 按钮，最后点击 `Do Refactor`。

  如果使用尚未支持 Android X 的 Cordova 或 Capacitor 插件，可以使用 [jetifier](https://www.npmjs.com/package/jetifier) 工具对它们进行修补。

```bash
npm install -D jetifier
npx jetifier
```

要在每次安装包后自动运行它，请在 `package.json` 的 "scripts" 部分添加 `"postinstall": "jetifier"`。

推荐的更改：

- 创建公共变量

  创建一个 `android/variables.gradle` 文件，内容如下：

  ```
  ext {
    minSdkVersion = 21
    compileSdkVersion = 29
    targetSdkVersion = 29
    androidxAppCompatVersion = '1.1.0'
    androidxCoreVersion =  '1.2.0'
    androidxMaterialVersion =  '1.1.0-rc02'
    androidxBrowserVersion =  '1.2.0'
    androidxLocalbroadcastmanagerVersion =  '1.0.0'
    firebaseMessagingVersion =  '20.1.2'
    playServicesLocationVersion =  '17.0.0'
    junitVersion =  '4.12'
    androidxJunitVersion =  '1.1.1'
    androidxEspressoCoreVersion =  '3.2.0'
    cordovaAndroidVersion =  '7.0.0'
  }
  ```

  在 `android/build.gradle` 文件中，添加 `apply from: "variables.gradle"`，如 [此处](https://github.com/ionic-team/capacitor/blob/2.x/android-template/build.gradle#L18) 所示。

- 使用公共变量

  如果你创建了 `variables.gradle` 文件，请更新你的项目以使用它们。在 `android/app/build.gradle` 文件中，更改：

  - `compileSdkVersion 28` 改为 `compileSdkVersion rootProject.ext.compileSdkVersion`
  - `minSdkVersion 21` 改为 `minSdkVersion rootProject.ext.minSdkVersion`
  - `targetSdkVersion 28` 改为 `targetSdkVersion rootProject.ext.targetSdkVersion`
  - `implementation 'androidx.appcompat:appcompat:1.0.0'` 改为 `implementation "androidx.appcompat:appcompat:$androidxAppCompatVersion"`
  - `testImplementation 'junit:junit:4.12'` 改为 `testImplementation "junit:junit:$junitVersion"`
  - `androidTestImplementation 'androidx.test.ext:junit:1.1.1'` 改为 `androidTestImplementation "androidx.test.ext:junit:$androidxJunitVersion"`
  - `androidTestImplementation 'androidx.test.espresso:espresso-core:3.1.0'` 改为 `androidTestImplementation "androidx.test.espresso:espresso-core:$androidxEspressoCoreVersion"`

  注意，现在它们使用双引号而不是单引号，这是变量正常工作所必需的。

- 推荐更新 Android Studio 插件

  当你在 Android Studio 中打开 Android 项目时，会出现 `Plugin Update Recommended` 消息。点击 `update`。它会提示你更新 Gradle 插件和 Gradle。点击 `Update` 按钮。

  你也可以手动更新 Gradle 插件和 Gradle。

  要手动更新 Gradle 插件，编辑 `android/build.gradle` 文件。将 `classpath 'com.android.tools.build:gradle:3.3.2'` 改为 `classpath 'com.android.tools.build:gradle:3.6.1'`。

  要手动更新 Gradle，编辑 `android/gradle/wrapper/gradle-wrapper.properties`。将 `gradle-4.10.1-all.zip` 改为 `gradle-5.6.4-all.zip`。

- 更新 Google Services 插件

  在 `android/build.gradle` 文件中，将 `classpath 'com.google.gms:google-services:4.2.0'` 改为 `classpath 'com.google.gms:google-services:4.3.3'`。

- 更改 configChanges 以避免应用重启

  在 `android/app/src/main/AndroidManifest.xml` 文件中，在 activity 的 `android:configChanges` 属性中添加 `|smallestScreenSize|screenLayout|uiMode`。

- 将缓存文件夹添加到 FileProvider 文件路径，以避免编辑图库图片时出现权限错误。

  在 `android/app/src/main/res/xml/file_paths.xml` 中添加 `<cache-path name="my_cache_images" path="." />`。

关于 API 更改，请查看 [发布说明](https://github.com/ionic-team/capacitor/releases/tag/2.0.0)。