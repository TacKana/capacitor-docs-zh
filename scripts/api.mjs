// @ts-check
import fs from 'fs';
import fetch from 'node-fetch';

// @ts-ignore
const API_DIR = new URL('../docs/apis/', import.meta.url);
const HASH_FILE = new URL('./api-hashes.json', import.meta.url);

const tag = 'latest';

// ====== 插件列表 ======

/**
 * @typedef {Object} PluginApi
 * @property {string} id
 * @property {string} [title]
 * @property {boolean} isCore
 * @property {boolean} isExperimental
 * @property {string} npmScope
 * @property {string} [description]
 * @property {string} editUrl
 * @property {string} editApiUrl
 * @property {string} [tag]
 */
const pluginApis = [
  { id: 'action-sheet', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/src/definitions.ts' },
  { id: 'app', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/app/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/app/src/definitions.ts' },
  { id: 'app-launcher', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/app-launcher/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/app-launcher/src/definitions.ts' },
  { id: 'background-runner', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-background-runner/blob/main/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-background-runner/blob/main/packages/capacitor-plugin/src/definitions.ts' },
  { id: 'barcode-scanner', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-barcode-scanner/blob/main/plugin/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-barcode-scanner/blob/main/plugin/src/definitions.ts' },
  { id: 'browser', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/browser/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/browser/src/definitions.ts' },
  { id: 'camera', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-camera/blob/main/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-camera/blob/main/src/definitions.ts' },
  { id: 'clipboard', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/clipboard/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/clipboard/src/definitions.ts' },
  { id: 'cookies', isCore: true, isExperimental: false, npmScope: '@capacitor', description: 'The Capacitor Cookies API provides native cookie support via patching `document.cookie` to use native libraries.', editUrl: 'https://github.com/ionic-team/capacitor/blob/main/core/cookies.md', editApiUrl: 'https://github.com/ionic-team/capacitor/blob/main/core/src/core-plugins.ts' },
  { id: 'device', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/device/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/device/src/definitions.ts' },
  { id: 'dialog', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/dialog/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/dialog/src/definitions.ts' },
  { id: 'filesystem', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-filesystem/blob/main/packages/capacitor-plugin/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-filesystem/blob/main/packages/capacitor-plugin/src/definitions.ts' },
  { id: 'file-transfer', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-file-transfer/blob/main/packages/capacitor-plugin/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-file-transfer/blob/main/packages/capacitor-plugin/src/definitions.ts' },
  { id: 'file-viewer', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-file-viewer/blob/main/packages/capacitor-plugin/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-file-viewer/blob/main/packages/capacitor-plugin/src/definitions.ts' },
  { id: 'geolocation', isCore: false, isExperimental: false, npmScope: '@capacitor', description: 'The Geolocation API provides simple methods for getting and tracking the current position of the device using GPS, along with altitude, heading, and speed information if available.', editUrl: 'https://github.com/ionic-team/capacitor-geolocation/blob/main/packages/capacitor-plugin/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-geolocation/blob/main/packages/capacitor-plugin/src/definitions.ts' },
  { id: 'google-maps', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-google-maps/blob/main/plugin/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-google-maps/blob/main/plugin/src/definitions.ts' },
  { id: 'haptics', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-haptics/blob/main/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-haptics/blob/main/src/definitions.ts' },
  { id: 'http', isCore: true, isExperimental: false, npmScope: '@capacitor', description: 'The Capacitor Http API provides native http support via patching `fetch` and `XMLHttpRequest` to use native libraries.', editUrl: 'https://github.com/ionic-team/capacitor/blob/main/core/http.md', editApiUrl: 'https://github.com/ionic-team/capacitor/blob/main/core/src/core-plugins.ts' },
  { id: 'inappbrowser', title: 'InAppBrowser', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-os-inappbrowser/blob/main/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-os-inappbrowser/blob/main/src/definitions.ts' },
  { id: 'keyboard', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-keyboard/blob/main/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-keyboard/blob/main/src/definitions.ts' },
  { id: 'local-notifications', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/src/definitions.ts' },
  { id: 'motion', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/motion/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/motion/src/definitions.ts' },
  { id: 'network', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/network/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/network/src/definitions.ts' },
  { id: 'preferences', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/preferences/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/preferences/src/definitions.ts' },
  { id: 'privacy-screen', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-privacy-screen/blob/main/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-privacy-screen/blob/main/src/definitions.ts' },
  { id: 'push-notifications', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/push-notifications/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/push-notifications/src/definitions.ts' },
  { id: 'screen-orientation', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/screen-orientation/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/screen-orientation/src/definitions.ts' },
  { id: 'screen-reader', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/screen-reader/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/screen-reader/src/definitions.ts' },
  { id: 'share', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/share/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/share/src/definitions.ts' },
  { id: 'splash-screen', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/splash-screen/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/splash-screen/src/definitions.ts' },
  { id: 'status-bar', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/status-bar/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/status-bar/src/definitions.ts' },
  { id: 'system-bars', isCore: true, isExperimental: false, npmScope: '@capacitor', description: 'The System Bars API provides methods for configuring the style and visibility of the device System Bars / Status Bar.', editUrl: 'https://github.com/ionic-team/capacitor/blob/main/core/system-bars.md', editApiUrl: 'https://github.com/ionic-team/capacitor/blob/main/core/src/core-plugins.ts' },
  { id: 'text-zoom', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/text-zoom/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/text-zoom/src/definitions.ts' },
  { id: 'toast', isCore: false, isExperimental: false, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/toast/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/toast/src/definitions.ts' },
  { id: 'local-llm', title: "Local LLM", isCore: false, isExperimental: true, npmScope: '@capacitor', editUrl: 'https://github.com/ionic-team/capacitor-local-llm/blob/main/README.md', editApiUrl: 'https://github.com/ionic-team/capacitor-local-llm/blob/main/src/definitions.ts' },
];

// ====== 核心逻辑 ======

/**
 * 从 api-hashes.json 加载哈希清单
 * @returns {Record<string, string>}
 */
function loadManifest() {
  try {
    return JSON.parse(fs.readFileSync(HASH_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

/**
 * 保存哈希清单
 * @param {Record<string, string>} manifest
 */
function saveManifest(manifest) {
  // 按 key 排序
  const sorted = {};
  Object.keys(manifest).sort().forEach(k => sorted[k] = manifest[k]);
  fs.writeFileSync(HASH_FILE, JSON.stringify(sorted, null, 2) + '\n');
}

/**
 * 简单内容哈希
 */
function hashContent(content) {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) - hash) + content.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

/**
 * 检查本地文件是否为已翻译版本
 */
function isFileTranslated(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fm = content.match(/^---\n([\s\S]*?)\n---/);
    return fm && /translated:\s*true/.test(fm[1]);
  } catch {
    return false;
  }
}

/**
 * 处理单个插件
 * @param {PluginApi} plugin
 * @param {Record<string, string>} manifest
 */
async function processPlugin(plugin, manifest) {
  const fileName = `${plugin.id}.md`;
  const filePath = new URL(fileName, API_DIR);

  // 获取上游 README
  const readme = await getReadme(plugin);
  const newHash = hashContent(readme);
  const storedHash = manifest[plugin.id];

  // 情况1：哈希清单中无记录（新插件或首次运行）
  if (!storedHash) {
    manifest[plugin.id] = newHash;
    const exists = fs.existsSync(filePath);
    if (exists) {
      console.log(`  \x1b[36m📝 ${fileName}：首次记录哈希 (${newHash})\x1b[0m`);
    } else {
      // 新插件，生成英文版
      const [readme, pkgJson] = await Promise.all([getReadme(plugin), getPkgJsonData(plugin)]);
      const content = createApiPage(plugin, readme, pkgJson);
      fs.writeFileSync(filePath, content);
      console.log(`  \x1b[90m📄 ${fileName}：新插件，已生成英文版\x1b[0m`);
    }
    return;
  }

  // 情况2：哈希未变化 → 跳过
  if (newHash === storedHash) {
    console.log(`  \x1b[32m✅ ${fileName}：上游无变更\x1b[0m`);
    return;
  }

  // 情况3：哈希已变化 → 上游更新了
  manifest[plugin.id] = newHash;

  if (isFileTranslated(filePath)) {
    // 已翻译的文件 → 只警告，不覆盖
    console.log(`  \x1b[33m⚠️  ${fileName}：上游已更新，翻译需同步！\x1b[0m`);
    console.log(`  \x1b[33m   旧哈希: ${storedHash} → 新哈希: ${newHash}\x1b[0m`);
  } else {
    // 未翻译的文件 → 重新生成英文版
    const [readme, pkgJson] = await Promise.all([getReadme(plugin), getPkgJsonData(plugin)]);
    const content = createApiPage(plugin, readme, pkgJson);
    fs.writeFileSync(filePath, content);
    console.log(`  \x1b[90m📄 ${fileName}：上游更新，已重新生成\x1b[0m`);
  }
}

// ====== 辅助函数 ======

function createApiPage(plugin, readme, pkgJson) {
  const title = `${plugin.title ?? toTitleCase(plugin.id)} Capacitor Plugin API`;
  const desc = plugin.description || pkgJson.description?.replace(/\n/g, ' ') || title;
  const sidebarLabel = plugin.title ?? toTitleCase(plugin.id);
  return `---
title: ${title}
description: ${desc}
custom_edit_url: ${plugin.editUrl}
editApiUrl: ${plugin.editApiUrl}
sidebar_label: ${sidebarLabel}${plugin.isExperimental ? ' 🧪' : ''}
---

${readme}`.trim();
}

async function invalidateJSDELIVRCache(url) {
  const rsp = await fetch(url.replace('cdn', 'purge'), { method: 'GET' });
  const data = await rsp.json().catch(() => null);
  if (!data || data.status !== 'finished') {
    throw new Error("Failed to invalidate JSDELIVR cache for " + url);
  }
}

async function getReadme(plugin) {
  const pkg = !plugin.isCore ? plugin.id : 'core';
  const file = plugin.isCore ? `${plugin.id}.md` : 'README.md';
  const url = `https://cdn.jsdelivr.net/npm/${plugin.npmScope}/${pkg}@${plugin.tag ?? tag}/${file}`;
  await invalidateJSDELIVRCache(url);
  const rsp = await fetch(url);
  return rsp.text();
}

async function getPkgJsonData(plugin) {
  const pkg = !plugin.isCore ? plugin.id : 'core';
  const url = `https://cdn.jsdelivr.net/npm/${plugin.npmScope}/${pkg}@${plugin.tag ?? tag}/package.json`;
  await invalidateJSDELIVRCache(url);
  const rsp = await fetch(url);
  return rsp.json();
}

function toTitleCase(str) {
  return str.replace(/(^\w|-\w)/g, s => s.replace(/-/, ' ').toUpperCase());
}

// ====== 入口 ======

async function main() {
  const manifest = loadManifest();
  let changed = false;

  for (const plugin of pluginApis) {
    try {
      await processPlugin(plugin, manifest);
    } catch (e) {
      console.log(`  \x1b[31m❌ ${plugin.id}.md：${e.message}\x1b[0m`);
    }
    changed = true;
  }

  if (changed) {
    saveManifest(manifest);
    console.log('\n📋 哈希清单已更新: scripts/api-hashes.json');
  }
  console.log('✅ API 文档检查完成');
}

main();
