---
title: Google Maps Capacitor 插件 API
description: Capacitor 上的 Google 地图
custom_edit_url: https://github.com/ionic-team/capacitor-google-maps/7.x/main/plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-google-maps/7.x/main/plugin/src/definitions.ts
sidebar_label: Google Maps
translated: true
---

# @capacitor/google-maps

Capacitor 上的 Google 地图

## 安装

```bash
npm install @capacitor/google-maps@latest-7
npx cap sync
```

## API 密钥

要在任何平台上使用 Google Maps SDK，需要关联了 _已启用计费_ 账户的 API 密钥。这些密钥可以从 [Google Cloud 控制台](https://console.cloud.google.com) 获取。Android、iOS 和 Javascript 三个平台都需要。有关获取这些 API 密钥的更多信息，请参阅各平台的 [Google Maps 文档](https://developers.google.com/maps/documentation/android-sdk/overview)。

## iOS

Google Maps SDK 支持通过 `enableCurrentLocation(bool)` 显示用户当前位置。要使用此功能，Apple 要求在 `Info.plist` 中指定隐私描述：

- `NSLocationWhenInUseUsageDescription`（使用期间的定位隐私描述）

请阅读 [iOS 指南](https://capacitorjs.com/docs/ios) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 以获取有关在 Xcode 中设置 iOS 权限的更多信息。

### TypeScript 配置

你的项目还需要在 `tsconfig.json` 中将 `skipLibCheck` 设置为 `true`。

### 从旧版本迁移
> 主要的 Google Maps SDK 现已支持在 Apple Silicon Mac 上的模拟器中运行，但请确保你已安装最新版本的 [Google-Maps-iOS-Utils](https://github.com/googlemaps/google-maps-ios-utils)。

如果你之前添加了获取未发布版本的临时解决方案，现在可以通过从 `ios/App/Podfile` 中移除以下行来删除它：

```
pod 'Google-Maps-iOS-Utils', :git => 'https://github.com/googlemaps/google-maps-ios-utils.git', :commit => '637954e5bcb2a879c11a6f2cead153a6bad5339f'
```

然后在 `ios/App/` 目录下运行 `pod update Google-Maps-iOS-Utils`：

```
cd ios/App
pod update Google-Maps-iOS-Utils
```

## Android

Android 版 Google Maps SDK 要求你将 API 密钥添加到项目中的 AndroidManifest.xml 文件中。

```xml
<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY_HERE"/>
```

要使用某些位置功能，SDK 还需要将以下权限添加到你的 AndroidManifest.xml：

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### 变量

此插件将使用以下项目变量（在应用的 `variables.gradle` 文件中定义）：

- `googleMapsPlayServicesVersion`：`com.google.android.gms:play-services-maps` 的版本（默认值：`18.2.0`）
- `googleMapsUtilsVersion`：`com.google.maps.android:android-maps-utils` 的版本（默认值：`3.8.2`）
- `googleMapsKtxVersion`：`com.google.maps.android:maps-ktx` 的版本（默认值：`5.0.0`）
- `googleMapsUtilsKtxVersion`：`com.google.maps.android:maps-utils-ktx` 的版本（默认值：`5.0.0`）
- `kotlinxCoroutinesVersion`：`org.jetbrains.kotlinx:kotlinx-coroutines-android` 和 `org.jetbrains.kotlinx:kotlinx-coroutines-core` 的版本（默认值：`1.7.3`）
- `androidxCoreKTXVersion`：`androidx.core:core-ktx` 的版本（默认值：`1.12.0`）
- `kotlin_version`：`org.jetbrains.kotlin:kotlin-stdlib` 的版本（默认值：`1.9.10`）

## 使用方法

Google Maps Capacitor 插件附带一个 web component，必须用于在应用中渲染地图，因为它能让我们更有效地在 iOS 上嵌入原生视图。插件会自动注册此 web component 以供应用使用。

> 对于 Angular 用户，你会收到一个警告，提示此 web component 对 Angular 编译器来说是未知的。可以通过修改声明组件的模块以允许自定义 web component 来解决此问题。
>
> ```typescript
> import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
>
> @NgModule({
>   schemas: [CUSTOM_ELEMENTS_SCHEMA]
> })
> ```

将此组件包含在你的 HTML 中，并为其分配一个 ID，以便稍后可以轻松查询该元素引用。

```html
<capacitor-google-map id="map"></capacitor-google-map>
```

> 在 Android 上，地图渲染在整个 WebView 下方，并使用此组件在滚动事件期间管理其定位。这意味着作为开发者，你 _必须_ 确保 WebView 从各层一直到底部都是透明的。在典型的 Ionic 应用中，这意味着需要设置 IonContent 和根 HTML 标签等元素的透明度，以确保地图可见。如果你在 Android 上看不到地图，这应该是你要检查的第一件事。
>
> 在 iOS 上，我们直接将地图渲染到 WebView 中，因此不需要相同的透明效果。我们仍在研究适用于 Android 的替代方法，并希望在未来的更新中能更好地解决此问题。

Google Map 元素本身没有样式，因此你应该为其设置样式以适配页面布局。因为我们将视图渲染到该插槽中，元素本身没有宽度或高度，所以请务必显式设置这些属性。

```css
capacitor-google-map {
  display: inline-block;
  width: 275px;
  height: 400px;
}
```

接下来，我们应该创建地图引用。这需要从 Capacitor 插件中导入 GoogleMap 类，调用 create 方法，并传入所需参数。

```typescript
import { GoogleMap } from '@capacitor/google-maps';

const apiKey = 'YOUR_API_KEY_HERE';

const mapRef = document.getElementById('map');

const newMap = await GoogleMap.create({
  id: 'my-map', // 此地图实例的唯一标识符
  element: mapRef, // capacitor-google-map 元素的引用
  apiKey: apiKey, // 你的 Google Maps API 密钥
  config: {
    center: {
      // 地图渲染的初始位置
      lat: 33.6,
      lng: -117.9,
    },
    zoom: 8, // 地图渲染的初始缩放级别
  },
});
```

此时，你的地图应该已在应用中创建成功。通过使用返回的地图引用，你可以通过多种方式与地图交互，下面展示了其中一些方式。

```typescript
const newMap = await GoogleMap.create({...});

// 在地图上添加标记
const markerId = await newMap.addMarker({
  coordinate: {
    lat: 33.6,
    lng: -117.9
  }
});

// 以编程方式移动地图
await newMap.setCamera({
  coordinate: {
    lat: 33.6,
    lng: -117.9
  }
});

// 启用标记聚类
await newMap.enableClustering();

// 处理标记点击
await newMap.setOnMarkerClickListener((event) => {...});

// 清理地图引用
await newMap.destroy();
```

## 完整示例

### Angular

```typescript
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  template: `
    <capacitor-google-map #map></capacitor-google-map>
    <button (click)="createMap()">Create Map</button>
  `,
  styles: [
    `
      capacitor-google-map {
        display: inline-block;
        width: 275px;
        height: 400px;
      }
    `,
  ],
})
export class MyMap {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKey,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  }
}
```

### React

```jsx
import { GoogleMap } from '@capacitor/google-maps';
import { useRef } from 'react';

const MyMap: React.FC = () => {
  const mapRef = useRef<HTMLElement>();
  let newMap: GoogleMap;

  async function createMap() {
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef.current,
      apiKey: process.env.REACT_APP_YOUR_API_KEY_HERE,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9
        },
        zoom: 8
      }
    })
  }

  return (
    <div className="component-wrapper">
      <capacitor-google-map ref={mapRef} style={{
        display: 'inline-block',
        width: 275,
        height: 400
      }}></capacitor-google-map>

      <button onClick={createMap}>Create Map</button>
    </div>
  )
}

export default MyMap;
```

### Vue

```vue
<script lang="ts" setup>
import { ref, shallowRef, useTemplateRef } from 'vue'
import { GoogleMap } from '@capacitor/google-maps'

const mapRef = useTemplateRef<HTMLElement>('mapRef')
const newMap = shallowRef<GoogleMap>()

async function createMap() {
  if (!mapRef.value) return

  newMap.value = await GoogleMap.create({
    id: 'my-cool-map',
    element: mapRef.value,
    apiKey: import.meta.env.VITE_YOUR_API_KEY_HERE,
    config: {
      center: {
        lat: 33.6,
        lng: -117.9,
      },
      zoom: 8,
    },
  })
}
</script>

<template>
  <capacitor-google-map
    ref="mapRef"
    style="display: inline-block; width: 275px; height: 400px"
  ></capacitor-google-map>
  <button @click="createMap()">Create Map</button>
</template>

```

请确保你需要启用 [识别原生自定义元素](https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue)，例如：

```ts
// vite.config.mts > plugins
Vue({
  template: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('capacitor-')
    },
  },
}),
```

### Javascript

```html
<capacitor-google-map id="map"></capacitor-google-map>
<button onclick="createMap()">Create Map</button>

<style>
  capacitor-google-map {
    display: inline-block;
    width: 275px;
    height: 400px;
  }
</style>

<script>
  import { GoogleMap } from '@capacitor/google-maps';

  const createMap = async () => {
    const mapRef = document.getElementById('map');

    const newMap = await GoogleMap.create({
      id: 'my-map', // 此地图实例的唯一标识符
      element: mapRef, // capacitor-google-map 元素的引用
      apiKey: 'YOUR_API_KEY_HERE', // 你的 Google Maps API 密钥
      config: {
        center: {
          // 地图渲染的初始位置
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8, // 地图渲染的初始缩放级别
      },
    });
  };
</script>
```

## API

<docgen-index>

* [`create(...)`](#create)
* [`enableTouch()`](#enabletouch)
* [`disableTouch()`](#disabletouch)
* [`enableClustering(...)`](#enableclustering)
* [`disableClustering()`](#disableclustering)
* [`addTileOverlay(...)`](#addtileoverlay)
* [`removeTileOverlay(...)`](#removetileoverlay)
* [`addMarker(...)`](#addmarker)
* [`addMarkers(...)`](#addmarkers)
* [`removeMarker(...)`](#removemarker)
* [`removeMarkers(...)`](#removemarkers)
* [`addPolygons(...)`](#addpolygons)
* [`removePolygons(...)`](#removepolygons)
* [`addCircles(...)`](#addcircles)
* [`removeCircles(...)`](#removecircles)
* [`addPolylines(...)`](#addpolylines)
* [`removePolylines(...)`](#removepolylines)
* [`destroy()`](#destroy)
* [`setCamera(...)`](#setcamera)
* [`getMapType()`](#getmaptype)
* [`setMapType(...)`](#setmaptype)
* [`enableIndoorMaps(...)`](#enableindoormaps)
* [`enableTrafficLayer(...)`](#enabletrafficlayer)
* [`enableAccessibilityElements(...)`](#enableaccessibilityelements)
* [`enableCurrentLocation(...)`](#enablecurrentlocation)
* [`setPadding(...)`](#setpadding)
* [`getMapBounds()`](#getmapbounds)
* [`fitBounds(...)`](#fitbounds)
* [`setOnBoundsChangedListener(...)`](#setonboundschangedlistener)
* [`setOnCameraIdleListener(...)`](#setoncameraidlelistener)
* [`setOnCameraMoveStartedListener(...)`](#setoncameramovestartedlistener)
* [`setOnClusterClickListener(...)`](#setonclusterclicklistener)
* [`setOnClusterInfoWindowClickListener(...)`](#setonclusterinfowindowclicklistener)
* [`setOnInfoWindowClickListener(...)`](#setoninfowindowclicklistener)
* [`setOnMapClickListener(...)`](#setonmapclicklistener)
* [`setOnMarkerClickListener(...)`](#setonmarkerclicklistener)
* [`setOnPolygonClickListener(...)`](#setonpolygonclicklistener)
* [`setOnCircleClickListener(...)`](#setoncircleclicklistener)
* [`setOnPolylineClickListener(...)`](#setonpolylineclicklistener)
* [`setOnMarkerDragStartListener(...)`](#setonmarkerdragstartlistener)
* [`setOnMarkerDragListener(...)`](#setonmarkerdraglistener)
* [`setOnMarkerDragEndListener(...)`](#setonmarkerdragendlistener)
* [`setOnMyLocationButtonClickListener(...)`](#setonmylocationbuttonclicklistener)
* [`setOnMyLocationClickListener(...)`](#setonmylocationclicklistener)
* [Interfaces](#接口)
* [Type Aliases](#类型别名)
* [Enums](#枚举)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### create(...)

```typescript
create(options: CreateMapArgs, callback?: MapListenerCallback<MapReadyCallbackData> | undefined) => Promise<GoogleMap>
```

| 参数             | 类型                                                                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`options`**    | <code><a href="#createmapargs">CreateMapArgs</a></code>                                                                             |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapreadycallbackdata">MapReadyCallbackData</a>&gt;</code> |

**返回值：** <code>Promise&lt;GoogleMap&gt;</code>

--------------------


### enableTouch()

```typescript
enableTouch() => Promise<void>
```

--------------------


### disableTouch()

```typescript
disableTouch() => Promise<void>
```

--------------------


### enableClustering(...)

```typescript
enableClustering(minClusterSize?: number | undefined) => Promise<void>
```

| 参数                 | 类型                | 描述                                                               |
| -------------------- | ------------------- | ------------------------------------------------------------------ |
| **`minClusterSize`** | <code>number</code> | 可以聚合在一起的最小标记数量。默认值为 4 个标记。                    |

--------------------


### disableClustering()

```typescript
disableClustering() => Promise<void>
```

--------------------


### addTileOverlay(...)

```typescript
addTileOverlay(tileOverlay: TileOverlay) => Promise<{ id: string; }>
```

| 参数              | 类型                                                |
| ----------------- | --------------------------------------------------- |
| **`tileOverlay`** | <code><a href="#tileoverlay">TileOverlay</a></code> |

**返回值：** <code>Promise&lt;{ id: string; }&gt;</code>

--------------------


### removeTileOverlay(...)

```typescript
removeTileOverlay(id: string) => Promise<void>
```

| 参数     | 类型                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |

--------------------


### addMarker(...)

```typescript
addMarker(marker: Marker) => Promise<string>
```

| 参数         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`marker`** | <code><a href="#marker">Marker</a></code> |

**返回值：** <code>Promise&lt;string&gt;</code>

--------------------


### addMarkers(...)

```typescript
addMarkers(markers: Marker[]) => Promise<string[]>
```

| 参数          | 类型                  |
| ------------- | --------------------- |
| **`markers`** | <code>Marker[]</code> |

**返回值：** <code>Promise&lt;string[]&gt;</code>

--------------------


### removeMarker(...)

```typescript
removeMarker(id: string) => Promise<void>
```

| 参数     | 类型                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |

--------------------


### removeMarkers(...)

```typescript
removeMarkers(ids: string[]) => Promise<void>
```

| 参数      | 类型                  |
| --------- | --------------------- |
| **`ids`** | <code>string[]</code> |

--------------------


### addPolygons(...)

```typescript
addPolygons(polygons: Polygon[]) => Promise<string[]>
```

| 参数           | 类型                   |
| -------------- | ---------------------- |
| **`polygons`** | <code>Polygon[]</code> |

**返回值：** <code>Promise&lt;string[]&gt;</code>

--------------------


### removePolygons(...)

```typescript
removePolygons(ids: string[]) => Promise<void>
```

| 参数      | 类型                  |
| --------- | --------------------- |
| **`ids`** | <code>string[]</code> |

--------------------


### addCircles(...)

```typescript
addCircles(circles: Circle[]) => Promise<string[]>
```

| 参数          | 类型                  |
| ------------- | --------------------- |
| **`circles`** | <code>Circle[]</code> |

**返回值：** <code>Promise&lt;string[]&gt;</code>

--------------------


### removeCircles(...)

```typescript
removeCircles(ids: string[]) => Promise<void>
```

| 参数      | 类型                  |
| --------- | --------------------- |
| **`ids`** | <code>string[]</code> |

--------------------


### addPolylines(...)

```typescript
addPolylines(polylines: Polyline[]) => Promise<string[]>
```

| 参数            | 类型                    |
| --------------- | ----------------------- |
| **`polylines`** | <code>Polyline[]</code> |

**返回值：** <code>Promise&lt;string[]&gt;</code>

--------------------


### removePolylines(...)

```typescript
removePolylines(ids: string[]) => Promise<void>
```

| 参数      | 类型                  |
| --------- | --------------------- |
| **`ids`** | <code>string[]</code> |

--------------------


### destroy()

```typescript
destroy() => Promise<void>
```

--------------------


### setCamera(...)

```typescript
setCamera(config: CameraConfig) => Promise<void>
```

| 参数         | 类型                                                  |
| ------------ | ----------------------------------------------------- |
| **`config`** | <code><a href="#cameraconfig">CameraConfig</a></code> |

--------------------


### getMapType()

```typescript
getMapType() => Promise<MapType>
```

获取当前地图类型

**返回值：** <code>Promise&lt;<a href="#maptype">MapType</a>&gt;</code>

--------------------


### setMapType(...)

```typescript
setMapType(mapType: MapType) => Promise<void>
```

| 参数          | 类型                                        |
| ------------- | ------------------------------------------- |
| **`mapType`** | <code><a href="#maptype">MapType</a></code> |

--------------------


### enableIndoorMaps(...)

```typescript
enableIndoorMaps(enabled: boolean) => Promise<void>
```

| 参数          | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------


### enableTrafficLayer(...)

```typescript
enableTrafficLayer(enabled: boolean) => Promise<void>
```

| 参数          | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------


### enableAccessibilityElements(...)

```typescript
enableAccessibilityElements(enabled: boolean) => Promise<void>
```

| 参数          | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------


### enableCurrentLocation(...)

```typescript
enableCurrentLocation(enabled: boolean) => Promise<void>
```

| 参数          | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------


### setPadding(...)

```typescript
setPadding(padding: MapPadding) => Promise<void>
```

| 参数          | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`padding`** | <code><a href="#mappadding">MapPadding</a></code> |

--------------------


### getMapBounds()

```typescript
getMapBounds() => Promise<LatLngBounds>
```

获取地图当前视口的经纬度边界。

**返回值：** <code>Promise&lt;LatLngBounds&gt;</code>

--------------------


### fitBounds(...)

```typescript
fitBounds(bounds: LatLngBounds, padding?: number | undefined) => Promise<void>
```

设置地图视口以包含给定的边界。

| 参数          | 类型                      | 描述                                                                    |
| ------------- | ------------------------- | ----------------------------------------------------------------------- |
| **`bounds`**  | <code>LatLngBounds</code> | 要适配到视口中的边界。                                                   |
| **`padding`** | <code>number</code>       | 可选的内边距（以像素为单位）。边界将适配到移除内边距后地图的剩余部分中。 |

--------------------


### setOnBoundsChangedListener(...)

```typescript
setOnBoundsChangedListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameraidlecallbackdata">CameraIdleCallbackData</a>&gt;</code> |

--------------------


### setOnCameraIdleListener(...)

```typescript
setOnCameraIdleListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameraidlecallbackdata">CameraIdleCallbackData</a>&gt;</code> |

--------------------


### setOnCameraMoveStartedListener(...)

```typescript
setOnCameraMoveStartedListener(callback?: MapListenerCallback<CameraMoveStartedCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameramovestartedcallbackdata">CameraMoveStartedCallbackData</a>&gt;</code> |

--------------------


### setOnClusterClickListener(...)

```typescript
setOnClusterClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#clusterclickcallbackdata">ClusterClickCallbackData</a>&gt;</code> |

--------------------


### setOnClusterInfoWindowClickListener(...)

```typescript
setOnClusterInfoWindowClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#clusterclickcallbackdata">ClusterClickCallbackData</a>&gt;</code> |

--------------------


### setOnInfoWindowClickListener(...)

```typescript
setOnInfoWindowClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMapClickListener(...)

```typescript
setOnMapClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerClickListener(...)

```typescript
setOnMarkerClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnPolygonClickListener(...)

```typescript
setOnPolygonClickListener(callback?: MapListenerCallback<PolygonClickCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#polygonclickcallbackdata">PolygonClickCallbackData</a>&gt;</code> |

--------------------


### setOnCircleClickListener(...)

```typescript
setOnCircleClickListener(callback?: MapListenerCallback<CircleClickCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#circleclickcallbackdata">CircleClickCallbackData</a>&gt;</code> |

--------------------


### setOnPolylineClickListener(...)

```typescript
setOnPolylineClickListener(callback?: MapListenerCallback<PolylineCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#polylinecallbackdata">PolylineCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerDragStartListener(...)

```typescript
setOnMarkerDragStartListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerDragListener(...)

```typescript
setOnMarkerDragListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerDragEndListener(...)

```typescript
setOnMarkerDragEndListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMyLocationButtonClickListener(...)

```typescript
setOnMyLocationButtonClickListener(callback?: MapListenerCallback<MyLocationButtonClickCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mylocationbuttonclickcallbackdata">MyLocationButtonClickCallbackData</a>&gt;</code> |

--------------------


### setOnMyLocationClickListener(...)

```typescript
setOnMyLocationClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;</code> |

--------------------


### 接口


#### CreateMapArgs

包含创建地图时使用的选项的接口。

| 属性               | 类型                                                        | 描述                                                                                                                                    | 默认值             |
| ------------------ | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **`id`**           | <code>string</code>                                         | 地图实例的唯一标识符。                                                                                                                  |                    |
| **`apiKey`**       | <code>string</code>                                         | Google Maps SDK API 密钥。                                                                                                              |                    |
| **`config`**       | <code><a href="#googlemapconfig">GoogleMapConfig</a></code> | 地图的初始配置设置。                                                                                                                    |                    |
| **`element`**      | <code>HTMLElement</code>                                    | Google Map View 将挂载到的 DOM 元素，决定其大小和位置。                                                                                 |                    |
| **`forceCreate`**  | <code>boolean</code>                                        | 如果具有所提供 ID 的地图实例已存在，则销毁并重新创建地图实例。                                                                         | <code>false</code> |
| **`region`**       | <code>string</code>                                         | 区域参数可更改你的应用以提供不同的地图瓦片或使应用偏向该区域（例如将地理编码结果偏向该区域）。仅适用于 Web。                            |                    |
| **`language`**     | <code>string</code>                                         | 语言参数会影响控件名称、版权声明、驾驶路线、控件标签以及服务请求的响应。仅适用于 Web。                                                 |                    |


#### GoogleMapConfig

对于 Web，所有 JavaScript Google Maps 选项都可用，
GoogleMapConfig 扩展了 google.maps.MapOptions。
对于 iOS 和 Android，仅使用在 <a href="#googlemapconfig">GoogleMapConfig</a> 上声明的配置选项。

| 属性                    | 类型                                      | 描述                                                                                                                                                                                                                          | 默认值             | 自版本  |
| ----------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------- |
| **`width`**             | <code>number</code>                       | 原生地图的宽度覆盖。                                                                                                                                                                                                          |                    |         |
| **`height`**            | <code>number</code>                       | 原生地图的高度覆盖。                                                                                                                                                                                                          |                    |         |
| **`x`**                 | <code>number</code>                       | 原生地图的绝对 x 坐标位置覆盖。                                                                                                                                                                                               |                    |         |
| **`y`**                 | <code>number</code>                       | 原生地图的绝对 y 坐标位置覆盖。                                                                                                                                                                                               |                    |         |
| **`center`**            | <code><a href="#latlng">LatLng</a></code> | 相机指向的地球上的默认位置。                                                                                                                                                                                                  |                    |         |
| **`zoom`**              | <code>number</code>                       | 设置地图的缩放级别。                                                                                                                                                                                                          |                    |         |
| **`androidLiteMode**    | <code>boolean</code>                      | 在 Android 上启用基于图像的精简模式。                                                                                                                                                                                          | <code>false</code> |         |
| **`devicePixelRatio`**  | <code>number</code>                       | 原生地图的像素比覆盖。                                                                                                                                                                                                        |                    |         |
| **`styles`**            | <code>MapTypeStyle[] \| null</code>       | 应用于每种默认地图类型的样式。请注意，对于卫星、混合和地形模式，这些样式仅适用于标签和几何图形。                                                                                                                              |                    | 4.3.0   |
| **`mapId`**             | <code>string</code>                       | 与特定地图样式或功能关联的地图 ID。[使用地图 ID](https://developers.google.com/maps/documentation/get-map-id) 仅适用于 Web。                                                                                                  |                    | 5.4.0   |
| **`androidMapId`**      | <code>string</code>                       | 与特定地图样式或功能关联的地图 ID。[使用地图 ID](https://developers.google.com/maps/documentation/get-map-id) 仅适用于 Android。                                                                                              |                    | 5.4.0   |
| **`iOSMapId`**          | <code>string</code>                       | 与特定地图样式或功能关联的地图 ID。[使用地图 ID](https://developers.google.com/maps/documentation/get-map-id) 仅适用于 iOS。                                                                                                  |                    | 5.4.0   |
| **`maxZoom`**           | <code>number \| null</code>               | 地图上显示的最大缩放级别。如果省略或设置为 &lt;code&gt;null&lt;/code&gt;，则使用当前地图类型的最大缩放。有效的缩放值是从零到支持的 &lt;a href="https://developers.google.com/maps/documentation/javascript/maxzoom"&gt;最大缩放级别&lt;/a&gt; 的数字。 |                    |         |
| **`minZoom`**           | <code>number \| null</code>               | 地图上显示的最小缩放级别。如果省略或设置为 &lt;code&gt;null&lt;/code&gt;，则使用当前地图类型的最小缩放。有效的缩放值是从零到支持的 &lt;a href="https://developers.google.com/maps/documentation/javascript/maxzoom"&gt;最大缩放级别&lt;/a&gt; 的数字。 |                    |         |
| **`mapTypeId`**         | <code>string \| null</code>               | 初始地图 mapTypeId。默认为 &lt;code&gt;ROADMAP&lt;/code&gt;。                                                                                                                                                                  |                    |         |
| **`heading`**           | <code>number \| null</code>               | 航空影像的朝向角度，以度为单位，从正北方向顺时针测量。朝向会捕捉到可用的最近角度。                                                                                                                                           |                    |         |
| **`restriction`**       | <code>MapRestriction \| null</code>       | 定义限制用户可访问地图区域的边界。设置后，用户只能在相机视图保持在边界范围内时进行平移和缩放。                                                                                                                              |                    |         |


#### LatLng

表示一对经纬度坐标的接口。

| 属性       | 类型                | 描述                                             |
| ---------- | ------------------- | ------------------------------------------------ |
| **`lat`**  | <code>number</code> | 坐标纬度，以度为单位。该值的范围是 [-90, 90]。    |
| **`lng`**  | <code>number</code> | 坐标经度，以度为单位。该值的范围是 [-180, 180]。 |


#### MapReadyCallbackData

| 属性         | 类型                |
| ------------ | ------------------- |
| **`mapId`**  | <code>string</code> |


#### TileOverlay

瓦片叠加层是放置在特定缩放级别地图顶部的图像。适用于 iOS、Android 和 Web。

| 属性           | 类型                 | 描述                                                                                                                                                   | 默认值                |
| -------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| **`url`**      | <code>string</code>  | 表示瓦片 URL 的字符串。应包含 `{x}`、`{y}` 和 `{z}`，以便替换为实际的 x、y 和缩放值。适用于 iOS、Android 和 Web。                                     |                        |
| **`opacity`**  | <code>number</code>  | 瓦片叠加层的不透明度，介于 0（完全透明）和 1（包含）之间。适用于 iOS、Android 和 Web。                                                                | <code>undefined</code> |
| **`visible`**  | <code>boolean</code> | 控制此瓦片叠加层是否可见。仅适用于 Android。                                                                                                           | <code>undefined</code> |
| **`zIndex`**   | <code>number</code>  | 瓦片叠加层的 zIndex。适用于 iOS 和 Android。                                                                                                           | <code>undefined</code> |


#### Marker

标记是放置在地图表面特定点上的图标。

| 属性              | 类型                                                         | 描述                                                                                                                                        | 默认值             | 自版本  |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------- |
| **`coordinate`**  | <code><a href="#latlng">LatLng</a></code>                    | <a href="#marker">Marker</a> 位置                                                                                                           |                    |         |
| **`opacity`**     | <code>number</code>                                          | 设置标记的不透明度，介于 0（完全透明）和 1（包含）之间。                                                                                     | <code>1</code>     |         |
| **`title`**       | <code>string</code>                                          | 标题，叠加层的简短描述。                                                                                                                    |                    |         |
| **`snippet`**     | <code>string</code>                                          | 摘要文本，选中时显示在信息窗口中的标题下方。                                                                                                |                    |         |
| **`isFlat`**      | <code>boolean</code>                                         | 控制此标记是平贴在地球表面还是作为面向相机的广告牌。                                                                                        | <code>false</code> |         |
| **`iconUrl`**     | <code>string</code>                                          | 要渲染的标记图标的路径。可以是相对于 Web 应用公共目录的路径，也可以是远程标记图标的 https URL。**原生平台不支持 SVG。**                     |                    | 4.2.0   |
| **`iconSize`**    | <code><a href="#size">Size</a></code>                        | 控制 `iconUrl` 中设置的标记图像的缩放大小。                                                                                                  |                    | 4.2.0   |
| **`iconOrigin`**  | <code><a href="#point">Point</a></code>                      | 图像在精灵中的位置（如果有）。默认情况下，原点位于图像的左上角。                                                                            |                    | 4.2.0   |
| **`iconAnchor`**  | <code><a href="#point">Point</a></code>                      | 将图像锚定到地图上标记对应位置的位置。默认情况下，锚点位于图像底部的中点。                                                                  |                    | 4.2.0   |
| **`tintColor`**   | <code>{ r: number; g: number; b: number; a: number; }</code> | 自定义默认标记图像的颜色。每个值必须介于 0 和 255 之间。仅适用于 iOS 和 Android。                                                           |                    | 4.2.0   |
| **`draggable`**   | <code>boolean</code>                                         | 控制此标记是否可以交互式拖动                                                                                                                | <code>false</code> |         |
| **`zIndex`**      | <code>number</code>                                          | 指定此标记相对于地图上其他标记的堆叠顺序。z-index 高的标记绘制在 z-index 较低的标记之上。                                                   | <code>0</code>     |         |


#### Size

| 属性          | 类型                |
| ------------- | ------------------- |
| **`width`**   | <code>number</code> |
| **`height`**  | <code>number</code> |


#### Point

| 属性     | 类型                |
| -------- | ------------------- |
| **`x`**  | <code>number</code> |
| **`y`**  | <code>number</code> |


#### Polygon

对于 Web，所有 JavaScript <a href="#polygon">Polygon</a> 选项都可用，
Polygon 扩展了 google.maps.PolygonOptions。
对于 iOS 和 Android，仅使用在 <a href="#polygon">Polygon</a> 上声明的配置选项。

| 属性                 | 类型                                      | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`paths`**          | <code>any[] \| MVCArray&lt;any&gt;</code> | 指定闭合循环的有序坐标序列。与折线不同，多边形可能包含一个或多个路径。因此，paths 属性可以指定一个或多个 &lt;code&gt;<a href="#latlng">LatLng</a>&lt;/code&gt; 坐标数组。路径会自动闭合；无需重复路径的第一个顶点作为最后一个顶点。简单的多边形可以使用单个 &lt;code&gt;<a href="#latlng">LatLng</a>&lt;/code&gt; 数组定义。更复杂的多边形可以指定数组的数组。任何简单数组都会转换为 &lt;code&gt;&lt;a href="#MVCArray"&gt;MVCArray&lt;/a&gt;&lt;/code&gt;。向 &lt;code&gt;MVCArray&lt;/code&gt; 中插入或移除 &lt;code&gt;<a href="#latlng">LatLng</a>&lt;/code&gt; 将自动更新地图上的多边形。 |
| **`strokeColor`**    | <code>string</code>                       | 描边颜色。除扩展命名颜色外，支持所有 CSS3 颜色。                                                                                                                                                                                                                                                                                                                                                                                         |
| **`strokeOpacity`**  | <code>number</code>                       | 描边不透明度，介于 0.0 和 1.0 之间。                                                                                                                                                                                                                                                                                                                                                                                                     |
| **`strokeWeight`**   | <code>number</code>                       | 描边宽度（以像素为单位）。                                                                                                                                                                                                                                                                                                                                                                                                               |
| **`fillColor`**      | <code>string</code>                       | 填充颜色。除扩展命名颜色外，支持所有 CSS3 颜色。                                                                                                                                                                                                                                                                                                                                                                                         |
| **`fillOpacity`**    | <code>number</code>                       | 填充不透明度，介于 0.0 和 1.0 之间。                                                                                                                                                                                                                                                                                                                                                                                                     |
| **`geodesic`**       | <code>boolean</code>                      | 当 &lt;code&gt;true&lt;/code&gt; 时，多边形的边被视为测地线，将遵循地球的曲率。当 &lt;code&gt;false&lt;/code&gt; 时，多边形的边在屏幕空间中渲染为直线。请注意，测地多边形的形状在拖动时可能会发生变化，因为其尺寸是相对于地球表面保持的。                                                                                                                                                                                              |
| **`clickable`**      | <code>boolean</code>                      | 指示此 &lt;code&gt;<a href="#polygon">Polygon</a>&lt;/code&gt; 是否处理鼠标事件。                                                                                                                                                                                                                                                                                                                                                         |
| **`title`**          | <code>string</code>                       | 标题，叠加层的简短描述。某些叠加层（如标记）会在地图上显示标题。标题也是默认的无障碍文本。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                               |
| **`tag`**            | <code>string</code>                       |                                                                                                                                                                                                                                                                                                                                                                                                                                           |


#### Circle

对于 Web，所有 JavaScript <a href="#circle">Circle</a> 选项都可用，
Circle 扩展了 google.maps.CircleOptions。
对于 iOS 和 Android，仅使用在 <a href="#circle">Circle</a> 上声明的配置选项。

| 属性                | 类型                 | 描述                                                                                                                     |
| ------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **`fillColor`**     | <code>string</code>  | 填充颜色。除扩展命名颜色外，支持所有 CSS3 颜色。                                                                         |
| **`fillOpacity`**   | <code>number</code>  | 填充不透明度，介于 0.0 和 1.0 之间。                                                                                     |
| **`strokeColor`**   | <code>string</code>  | 描边颜色。除扩展命名颜色外，支持所有 CSS3 颜色。                                                                         |
| **`strokeWeight`**  | <code>number</code>  | 描边宽度（以像素为单位）。                                                                                               |
| **`geodesic`**      | <code>boolean</code> |                                                                                                                          |
| **`clickable`**     | <code>boolean</code> | 指示此 &lt;code&gt;<a href="#circle">Circle</a>&lt;/code&gt; 是否处理鼠标事件。                                          |
| **`title`**         | <code>string</code>  | 标题，叠加层的简短描述。某些叠加层（如标记）会在地图上显示标题。标题也是默认的无障碍文本。仅适用于 iOS。                 |
| **`tag`**           | <code>string</code>  |                                                                                                                          |


#### Polyline

对于 Web，所有 JavaScript <a href="#polyline">Polyline</a> 选项都可用，
Polyline 扩展了 google.maps.PolylineOptions。
对于 iOS 和 Android，仅使用在 <a href="#polyline">Polyline</a> 上声明的配置选项。

| 属性                 | 类型                     | 描述                                                                                                                                                                                                                                                                                                   |
| -------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`strokeColor`**    | <code>string</code>      | 描边颜色。除扩展命名颜色外，支持所有 CSS3 颜色。                                                                                                                                                                                                                                                       |
| **`strokeOpacity`**  | <code>number</code>      | 描边不透明度，介于 0.0 和 1.0 之间。                                                                                                                                                                                                                                                                   |
| **`strokeWeight`**   | <code>number</code>      | 描边宽度（以像素为单位）。                                                                                                                                                                                                                                                                             |
| **`geodesic`**       | <code>boolean</code>     | 当 &lt;code&gt;true&lt;/code&gt; 时，多边形的边被视为测地线，将遵循地球的曲率。当 &lt;code&gt;false&lt;/code&gt; 时，多边形的边在屏幕空间中渲染为直线。请注意，测地多边形的形状在拖动时可能会发生变化，因为其尺寸是相对于地球表面保持的。                                                            |
| **`clickable`**      | <code>boolean</code>     | 指示此 &lt;code&gt;<a href="#polyline">Polyline</a>&lt;/code&gt; 是否处理鼠标事件。                                                                                                                                                                                                                    |
| **`tag`**            | <code>string</code>      |                                                                                                                                                                                                                                                                                                        |
| **`styleSpans`**     | <code>StyleSpan[]</code> | 用于指定折线的一个或多个线段的颜色。styleSpans 属性是一个 <a href="#stylespan">StyleSpan</a> 对象数组。设置 spans 属性是更改折线颜色的推荐方式。仅适用于 iOS 和 Android。                                                                                                                             |


#### StyleSpan

描述折线某个区域的样式。

| 属性            | 类型                | 描述                                                       |
| --------------- | ------------------- | ---------------------------------------------------------- |
| **`color`**     | <code>string</code> | 描边颜色。除扩展命名颜色外，支持所有 CSS3 颜色。            |
| **`segments`**  | <code>number</code> | 此跨度以线段数量计算的长度。                                |


#### CameraConfig

Google 地图相机的配置属性。

| 属性                     | 类型                                      | 描述                                                                                             | 默认值             |
| ------------------------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------ |
| **`coordinate`**         | <code><a href="#latlng">LatLng</a></code> | 相机指向的地球上的位置。                                                                         |                    |
| **`zoom`**               | <code>number</code>                       | 设置地图的缩放级别。                                                                             |                    |
| **`bearing`**            | <code>number</code>                       | 相机的方位角，以度为单位，从正北方向顺时针测量。                                                 | <code>0</code>     |
| **`angle`**              | <code>number</code>                       | 相机从天底（正对地球）的角度，以度为单位。仅允许的值为 0 和 45。                                 | <code>0</code>     |
| **`animate`**            | <code>boolean</code>                      | 是否动画过渡到新的相机属性。                                                                     | <code>false</code> |
| **`animationDuration`**  | <code>number</code>                       | 此配置选项未被使用。                                                                             |                    |


#### MapPadding

控制视图"可见"区域的内边距设置。

| 属性            | 类型                |
| --------------- | ------------------- |
| **`top`**       | <code>number</code> |
| **`left`**      | <code>number</code> |
| **`right`**     | <code>number</code> |
| **`bottom`**    | <code>number</code> |


#### CameraIdleCallbackData

| 属性             | 类型                      |
| ---------------- | ------------------------- |
| **`mapId`**      | <code>string</code>       |
| **`bounds`**     | <code>LatLngBounds</code> |
| **`bearing`**    | <code>number</code>       |
| **`latitude`**   | <code>number</code>       |
| **`longitude`**  | <code>number</code>       |
| **`tilt`**       | <code>number</code>       |
| **`zoom`**       | <code>number</code>       |


#### CameraMoveStartedCallbackData

| 属性             | 类型                 |
| ---------------- | -------------------- |
| **`mapId`**      | <code>string</code>  |
| **`isGesture`**  | <code>boolean</code> |


#### ClusterClickCallbackData

| 属性             | 类型                              |
| ---------------- | --------------------------------- |
| **`mapId`**      | <code>string</code>               |
| **`latitude`**   | <code>number</code>               |
| **`longitude`**  | <code>number</code>               |
| **`size`**       | <code>number</code>               |
| **`items`**      | <code>MarkerCallbackData[]</code> |


#### MarkerCallbackData

| 属性             | 类型                |
| ---------------- | ------------------- |
| **`markerId`**   | <code>string</code> |
| **`latitude`**   | <code>number</code> |
| **`longitude`**  | <code>number</code> |
| **`title`**      | <code>string</code> |
| **`snippet`**    | <code>string</code> |


#### MarkerClickCallbackData

| 属性         | 类型                |
| ------------ | ------------------- |
| **`mapId`**  | <code>string</code> |


#### MapClickCallbackData

| 属性             | 类型                |
| ---------------- | ------------------- |
| **`mapId`**      | <code>string</code> |
| **`latitude`**   | <code>number</code> |
| **`longitude`**  | <code>number</code> |


#### PolygonClickCallbackData

| 属性             | 类型                |
| ---------------- | ------------------- |
| **`mapId`**      | <code>string</code> |
| **`polygonId`**  | <code>string</code> |
| **`tag`**        | <code>string</code> |


#### CircleClickCallbackData

| 属性            | 类型                |
| --------------- | ------------------- |
| **`mapId`**     | <code>string</code> |
| **`circleId`**  | <code>string</code> |
| **`tag`**       | <code>string</code> |


#### PolylineCallbackData

| 属性              | 类型                |
| ----------------- | ------------------- |
| **`polylineId`**  | <code>string</code> |
| **`tag`**         | <code>string</code> |


#### MyLocationButtonClickCallbackData

| 属性         | 类型                |
| ------------ | ------------------- |
| **`mapId`**  | <code>string</code> |


### 类型别名


#### MapListenerCallback

地图事件触发时调用的回调函数。

<code>(data: T): void</code>


#### Marker

支持"legacy"（传统）或"advanced"（高级）类型的标记。

<code>google.maps.<a href="#marker">Marker</a> | google.maps.marker.AdvancedMarkerElement</code>


### 枚举


#### MapType

| 成员             | 值                       | 描述                       |
| ---------------- | ------------------------ | -------------------------- |
| **`Normal`**     | <code>'Normal'</code>    | 基本地图。                  |
| **`Hybrid`**     | <code>'Hybrid'</code>    | 带有道路和标签的卫星影像。  |
| **`Satellite`**  | <code>'Satellite'</code> | 没有标签的卫星影像。        |
| **`Terrain`**    | <code>'Terrain'</code>   | 地形数据。                  |
| **`None`**       | <code>'None'</code>      | 没有基础地图瓦片。          |

</docgen-api>
