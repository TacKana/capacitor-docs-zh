---
title: Contacts Capacitor 插件 API
description: 访问、搜索、选取、创建、更新和删除设备通讯录。
custom_edit_url: https://github.com/ionic-team/capacitor-contacts/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-contacts/blob/main/src/definitions.ts
sidebar_label: 通讯录
translated: true
source_hash: 7e5423da
---

# @capacitor/contacts

访问、搜索、选取、创建、更新和删除设备通讯录。

## 安装

使用 npm

```bash
npm install @capacitor/contacts
```

使用 yarn

```bash
yarn add @capacitor/contacts
```

同步原生文件

```bash
npx cap sync
```

## iOS

在应用的 `Info.plist` 中添加 `NSContactsUsageDescription` 键，并说明应用为何要访问用户的通讯录；如果没有该键，iOS 会在首次访问通讯录时崩溃：

```xml
<key>NSContactsUsageDescription</key>
<string>我们需要访问通讯录，以搜索、保存和删除联系人。</string>
```

注意：

- 该插件使用现代的 **Contacts 框架**（`CNContactStore`，绝不使用已弃用的 AddressBook API），因此完全支持 iOS 18+ 的**有限访问（Limited Access）**：`find`、`save` 和 `remove` 仅作用于用户与应用共享的那部分通讯录，而 `pickContact` 会展示系统选择器（无需任何权限，且始终显示完整的联系人列表）。
- iOS 不支持 `note` 字段：读取或写入该字段需要 Apple 受限的 `com.apple.developer.contacts.notes` 授权。读取时该字段会被省略，保存时会被忽略。
- 联系人的 `id` 是不透明的 `CNContact` 标识符；由基于旧版 AddressBook 的 Cordova 插件持久化的 id 在迁移后无法解析。

## Android

该插件在自己的 manifest 中声明了 `READ_CONTACTS` 和 `WRITE_CONTACTS`；Gradle 的 manifest 合并会自动将其添加到你的应用中。每个方法在首次运行时都会请求所需的运行时权限：`find`/`pickContact` 需要读取权限，`save`/`remove` 需要读写权限。

## 权限模型

该插件有意不暴露 `checkPermissions()` / `requestPermissions()` 方法：权限由每个方法隐式请求，这与旧版 `cordova-plugin-contacts` 的行为一致。当用户拒绝授权时，调用会以 `OS-PLUG-CONT-0020` 拒绝。

## 错误

每次拒绝都会携带结构化的错误码与消息：

| 错误码                | 含义                              |
| --------------------- | --------------------------------- |
| `OS-PLUG-CONT-0000`   | 未知错误                          |
| `OS-PLUG-CONT-0001`   | 无效参数（例如未知的 id）         |
| `OS-PLUG-CONT-0002`   | 超时（保留，当前未使用）          |
| `OS-PLUG-CONT-0003`   | 挂起的操作（例如选择器已打开）    |
| `OS-PLUG-CONT-0004`   | I/O 错误                          |
| `OS-PLUG-CONT-0005`   | 不支持                            |
| `OS-PLUG-CONT-0006`   | 操作已取消（选择器已关闭）        |
| `OS-PLUG-CONT-0020`   | 权限被拒绝                        |

## 使用

```typescript
import { Contacts } from '@capacitor/contacts';

// 在所有字段中搜索 "ada"，并返回所有带电话号码的匹配项
const { contacts } = await Contacts.find({
  fields: ['*'],
  filter: 'ada',
  multiple: true,
  hasPhoneNumber: true,
});

// 创建联系人
const saved = await Contacts.save({
  contact: {
    name: { givenName: 'Ada', familyName: 'Lovelace' },
    phoneNumbers: [{ type: 'mobile', value: '+351910000000' }],
    emails: [{ type: 'home', value: 'ada@example.com' }],
  },
});

// 更新它（存在 id 时表示更新）
await Contacts.save({ contact: { ...saved, nickname: 'Countess' } });

// 使用系统选择器选取联系人
const picked = await Contacts.pickContact();

// 按 id 删除联系人
await Contacts.remove({ id: saved.id! });
```

## API

<docgen-index>

* [`find(...)`](#find)
* [`save(...)`](#save)
* [`remove(...)`](#remove)
* [`pickContact()`](#pickcontact)
* [接口](#接口)
* [类型别名](#类型别名)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### find(...)

```typescript
find(options: ContactFindOptions) => Promise<ContactFindResult>
```

查询设备通讯录数据库并返回匹配的联系人。

首次运行时内部会请求 READ_CONTACTS（Android）/ Contacts（iOS）权限；没有单独的权限方法。

**iOS 18+：**在有限访问模式下，搜索仅针对（并且只返回）用户与应用共享的联系人子集。

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#contactfindoptions">ContactFindOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#contactfindresult">ContactFindResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### save(...)

```typescript
save(options: ContactSaveOptions) => Promise<Contact>
```

持久化新联系人，或更新现有联系人（通过 `contact.id` 匹配）。解析结果为完整保存的联系人。

内部请求 READ/WRITE_CONTACTS（Android）/ Contacts（iOS）权限。

**iOS 18+：**在有限访问模式下可用：新联系人会添加到应用的可见集合中；更新操作要求目标联系人在该集合内（否则调用会以 `OS-PLUG-CONT-0001` 拒绝）。

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#contactsaveoptions">ContactSaveOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#contact">Contact</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### remove(...)

```typescript
remove(options: ContactRemoveOptions) => Promise<void>
```

从设备通讯录数据库中删除具有指定 `id` 的联系人。当没有联系人的 id 与之匹配时，会以 `OS-PLUG-CONT-0001` 拒绝（在 iOS 18+ 有限访问模式下，当联系人不在可见集合内时同样会拒绝）。

内部请求 READ/WRITE_CONTACTS（Android）/ Contacts（iOS）权限。

| 参数          | 类型                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#contactremoveoptions">ContactRemoveOptions</a></code> |

**自版本:** 1.0.0

--------------------


### pickContact()

```typescript
pickContact() => Promise<Contact>
```

启动系统联系人选择器界面，并以用户选择的联系人作为结果解析。如果用户取消，则抛出 `OS-PLUG-CONT-0006`。

在 iOS 上，系统选择器无需权限，并且始终显示完整的联系人列表，即使处于 iOS 18+ 有限访问模式下也是如此（选取的联系人会直接返回，不会加入应用的可见集合）。在 Android 上，内部会请求 READ_CONTACTS 权限以读取所选联系人的详细信息。

**返回值:** <code>Promise&lt;<a href="#contact">Contact</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### 接口


#### ContactFindResult

{@link ContactsPlugin.find} 调用的结果。

| 属性           | 类型                   | 描述                               | 自版本 |
| -------------- | ---------------------- | ---------------------------------- | ----- |
| **`contacts`** | <code>Contact[]</code> | 符合搜索条件的联系人。             | 1.0.0 |


#### Contact

单个设备联系人。

| 属性                | 类型                                                | 描述                                                                                                                                                                                                                                                                                                                                                                                                          | 自版本 |
| ------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**            | <code>string</code>                                 | 平台分配的全局唯一标识符。尚未保存到设备的联系人不包含该属性。                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`rawId`**         | <code>string</code>                                 | 支撑此聚合联系人的 Android 原始联系人 id。iOS 上未设置。                                                                                                                                                                                                                                                                                                                                                      | 1.0.0 |
| **`displayName`**   | <code>string</code>                                 | 适合向终端用户展示的名称。                                                                                                                                                                                                                                                                                                                                                                                    | 1.0.0 |
| **`name`**          | <code><a href="#contactname">ContactName</a></code> | 结构化的姓名组成部分。                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`nickname`**      | <code>string</code>                                 | 用于称呼联系人的非正式名称。                                                                                                                                                                                                                                                                                                                                                                                  | 1.0.0 |
| **`phoneNumbers`**  | <code>ContactField[]</code>                         | 联系人的电话号码。                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`emails`**        | <code>ContactField[]</code>                         | 联系人的电子邮件地址。                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`addresses`**     | <code>ContactAddress[]</code>                       | 联系人的邮政地址。                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`ims`**           | <code>ContactField[]</code>                         | 联系人的即时通讯账号。                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`organizations`** | <code>ContactOrganization[]</code>                  | 联系人的所属组织。                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`birthday`**      | <code>number</code>                                 | 联系人的生日，以纪元毫秒表示。                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`note`**          | <code>string</code>                                 | 关于联系人的自由格式备注。**iOS：**默认不支持：读取/写入联系人的备注需要 Apple 受限的 `com.apple.developer.contacts.notes` 授权。没有该授权时，读取会省略此字段，保存会忽略此字段。Android 没有此限制。                                                                                                                                                                                                      | 1.0.0 |
| **`photos`**        | <code>ContactField[]</code>                         | 联系人的照片。读取时返回 `type: 'url'`，`value` 持有图片引用（而非图片字节）：Android 上为联系人的 `content://` 照片 URI，iOS 上为写入应用临时目录的副本路径（由系统清理）。保存时应用第一项：传入 `type: 'base64'` 的 base64 数据，或 `type: 'url'` 的本地 `file://`/`content://` URI 以导入。                                                                                                              | 1.0.0 |
| **`categories`**    | <code>ContactField[]</code>                         | 与联系人关联的用户自定义分类。只读：Android 上从联系人的群组关系填充，iOS 上从不返回（Contacts 框架没有对应概念），保存时忽略。                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`urls`**          | <code>ContactField[]</code>                         | 与联系人关联的网页。                                                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |


#### ContactName

{@link <a href="#contact">Contact</a>} 的结构化姓名。

| 属性                  | 类型                | 描述                             | 自版本 |
| --------------------- | ------------------- | -------------------------------- | ----- |
| **`formatted`**       | <code>string</code> | 完整的格式化姓名。               | 1.0.0 |
| **`familyName`**      | <code>string</code> | 姓氏。                           | 1.0.0 |
| **`givenName`**       | <code>string</code> | 名字。                           | 1.0.0 |
| **`middleName`**      | <code>string</code> | 中间名。                         | 1.0.0 |
| **`honorificPrefix`** | <code>string</code> | 尊称前缀（例如 `Mr.`、`Dr.`）。 | 1.0.0 |
| **`honorificSuffix`** | <code>string</code> | 尊称后缀（例如 `Esq.`）。       | 1.0.0 |


#### ContactField

通用、可重复的联系人字段（电话号码、电子邮件、IM、照片、URL、分类）。

| 属性        | 类型                 | 描述                                                                  | 自版本 |
| ----------- | -------------------- | --------------------------------------------------------------------- | ----- |
| **`type`**  | <code>string</code>  | 字段种类，例如 `home`、`work`、`mobile`。照片为 `url` 或 `base64`。   | 1.0.0 |
| **`value`** | <code>string</code>  | 字段值（电话号码、电子邮件地址、URI 等）。                            | 1.0.0 |
| **`pref`**  | <code>boolean</code> | 若为该联系人此字段的首选值，则为 `true`。                             | 1.0.0 |
| **`id`**    | <code>string</code>  | 平台分配的此条字段条目的 id。                                         | 1.0.0 |


#### ContactAddress

{@link <a href="#contact">Contact</a>} 的邮政地址。

| 属性                | 类型                 | 描述                                        | 自版本 |
| ------------------- | -------------------- | ------------------------------------------- | ----- |
| **`id`**            | <code>string</code>  | 平台分配的此地址条目的 id。                 | 1.0.0 |
| **`pref`**          | <code>boolean</code> | 若为联系人首选地址，则为 `true`。           | 1.0.0 |
| **`type`**          | <code>string</code>  | 地址种类，例如 `home`、`work`。             | 1.0.0 |
| **`formatted`**     | <code>string</code>  | 格式化后用于展示的完整地址。                | 1.0.0 |
| **`streetAddress`** | <code>string</code>  | 街道地址。                                  | 1.0.0 |
| **`locality`**      | <code>string</code>  | 城市或地区。                                | 1.0.0 |
| **`region`**        | <code>string</code>  | 州或地区。                                  | 1.0.0 |
| **`postalCode`**    | <code>string</code>  | 邮政编码。                                  | 1.0.0 |
| **`country`**       | <code>string</code>  | 国家名称。                                  | 1.0.0 |


#### ContactOrganization

{@link <a href="#contact">Contact</a>} 所属的组织。

| 属性             | 类型                 | 描述                                                                                                                                  | 自版本 |
| ---------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**         | <code>string</code>  | 平台分配的此组织条目的 id。仅 Android；iOS 将组织建模为扁平的联系人属性，没有 id。                                                   | 1.0.0 |
| **`pref`**       | <code>boolean</code> | 若为联系人首选组织，则为 `true`。                                                                                                     | 1.0.0 |
| **`type`**       | <code>string</code>  | 组织种类，例如 `work`。                                                                                                               | 1.0.0 |
| **`name`**       | <code>string</code>  | 组织名称。                                                                                                                            | 1.0.0 |
| **`department`** | <code>string</code>  | 组织内的部门。                                                                                                                        | 1.0.0 |
| **`title`**      | <code>string</code>  | 联系人在该组织的职位。                                                                                                                | 1.0.0 |


#### ContactFindOptions

{@link ContactsPlugin.find} 接受的搜索选项。

| 属性                 | 类型                            | 描述                                                                                                                                                                                                                                                                                                                                                | 自版本 |
| -------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`fields`**         | <code>ContactFieldType[]</code> | 要搜索的字段。传入 `['*']` 匹配所有字段。空数组无效，会以 `OS-PLUG-CONT-0001` 拒绝。`id` 字段按精确标识符匹配；其他所有字段按不区分大小写的子串匹配。`photos` 和 `categories` 不可搜索。                                                                                               | 1.0.0 |
| **`filter`**         | <code>string</code>             | 针对所选 `fields`（不区分大小写）匹配的搜索字符串。为空/省略时返回所有联系人。                                                                                                                                                                                                                                                                      | 1.0.0 |
| **`multiple`**       | <code>boolean</code>            | 为 `true` 时返回所有匹配项；为 `false`（默认）时最多返回一个联系人。                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`desiredFields`**  | <code>ContactFieldType[]</code> | 若设置，每个返回的 {@link <a href="#contact">Contact</a>} 仅包含这些字段（外加始终存在的 `id`）。                                                                                                                                                                                                                                                    | 1.0.0 |
| **`hasPhoneNumber`** | <code>boolean</code>            | OutSystems 扩展：为 `true` 时，仅返回至少有一个电话号码的联系人。默认为 `false`。                                                                                                                                                                                                                                                                    | 1.0.0 |


#### ContactSaveOptions

{@link ContactsPlugin.save} 接受的选项。

| 属性          | 类型                                        | 描述                                                                                                                                                                                                                                                                        | 自版本 |
| ------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`contact`** | <code><a href="#contact">Contact</a></code> | 要创建（无 `id`）或更新（已有 `id`）的联系人。更新语义：联系人上存在的每个字段都会完全替换存储值（例如 `name` 替换整个结构化姓名，`phoneNumbers` 替换所有电话号码）；省略的字段保持不变。                                                                                   | 1.0.0 |


#### ContactRemoveOptions

{@link ContactsPlugin.remove} 接受的选项。

| 属性     | 类型                | 描述                             | 自版本 |
| -------- | ------------------- | -------------------------------- | ----- |
| **`id`** | <code>string</code> | 要删除的联系人的原生 id。        | 1.0.0 |


### 类型别名


#### ContactFieldType

{@link ContactsPlugin.find} 调用可以搜索或请求返回的联系人字段集合。与旧版 Cordova 的 `ContactFieldType` 字符串值完全一致。

<code>'addresses' | 'birthday' | 'categories' | 'country' | 'department' | 'displayName' | 'emails' | 'familyName' | 'formatted' | 'givenName' | 'honorificPrefix' | 'honorificSuffix' | 'id' | 'ims' | 'locality' | 'middleName' | 'name' | 'nickname' | 'note' | 'organizations' | 'phoneNumbers' | 'photos' | 'postalCode' | 'region' | 'streetAddress' | 'title' | 'urls'</code>

</docgen-api>
