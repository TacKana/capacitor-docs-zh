import fs from 'fs';
import fetch from 'node-fetch';

const API_DIR = new URL('../versioned_docs/version-v7/apis/', import.meta.url);

const tag = 'latest-7';

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
  {
    id: 'action-sheet',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/action-sheet/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/action-sheet/src/definitions.ts',
  },
  {
    id: 'app',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/app/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/app/src/definitions.ts',
  },
  {
    id: 'app-launcher',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/app-launcher/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/app-launcher/src/definitions.ts',
  },
  {
    id: 'background-runner',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-background-runner/blob/2.x/README.md',
    editApiUrl:
      'https://github.com/ionic-team/capacitor-background-runner/blob/2.x/packages/capacitor-plugin/src/definitions.ts',
  },
  {
    id: 'barcode-scanner',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-barcode-scanner/blob/2.x/plugin/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-barcode-scanner/blob/2.x/plugin/src/definitions.ts',
  },
  {
    id: 'browser',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/browser/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/browser/src/definitions.ts',
  },
  {
    id: 'camera',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/camera/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/camera/src/definitions.ts',
  },
  {
    id: 'clipboard',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/clipboard/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/clipboard/src/definitions.ts',
  },
  {
    id: 'cookies',
    isCore: true,
    isExperimental: false,
    npmScope: '@capacitor',
    description: 'The Capacitor Cookies API provides native cookie support via patching `document.cookie` to use native libraries.',
    editUrl: 'https://github.com/ionic-team/capacitor/blob/7.x/core/cookies.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor/blob/7.x/core/src/core-plugins.ts',
  },
  {
    id: 'device',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/device/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/device/src/definitions.ts',
  },
  {
    id: 'dialog',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/dialog/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/dialog/src/definitions.ts',
  },
  {
    id: 'filesystem',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-filesystem/blob/7.x/packages/capacitor-plugin/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-filesystem/blob/7.x/packages/capacitor-plugin/src/definitions.ts',
  },
  {
    id: 'file-transfer',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-file-transfer/blob/1.x/packages/capacitor-plugin/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-file-transfer/blob/1.x/packages/capacitor-plugin/src/definitions.ts',
  },
  {
    id: 'file-viewer',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-file-viewer/blob/1.x/packages/capacitor-plugin/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-file-viewer/blob/1.x/packages/capacitor-plugin/src/definitions.ts',
  },
  {
    id: 'geolocation',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    description: 'The Geolocation API provides simple methods for getting and tracking the current position of the device using GPS, along with altitude, heading, and speed information if available.',
    editUrl: 'https://github.com/ionic-team/capacitor-geolocation/blob/7.x/packages/capacitor-plugin/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-geolocation/blob/7.x/packages/capacitor-plugin/src/definitions.ts',
  },
  {
    id: 'google-maps',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-google-maps/7.x/main/plugin/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-google-maps/7.x/main/plugin/src/definitions.ts',
  },
  {
    id: 'haptics',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/haptics/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/haptics/src/definitions.ts',
  },
  {
    id: 'http',
    isCore: true,
    isExperimental: false,
    npmScope: '@capacitor',
    description: 'The Capacitor Http API provides native http support via patching `fetch` and `XMLHttpRequest` to use native libraries.',
    editUrl: 'https://github.com/ionic-team/capacitor/blob/7.x/core/http.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor/blob/7.x/core/src/core-plugins.ts',
  },
  {
    id: 'inappbrowser',
    title: 'InAppBrowser',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-os-inappbrowser/blob/2.x/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-os-inappbrowser/blob/2.x/src/definitions.ts',
  },
  {
    id: 'keyboard',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/keyboard/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/keyboard/src/definitions.ts',
  },
  {
    id: 'local-notifications',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/local-notifications/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/local-notifications/src/definitions.ts',
  },
  {
    id: 'motion',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/motion/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/motion/src/definitions.ts',
  },
  {
    id: 'network',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/network/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/network/src/definitions.ts',
  },
  {
    id: 'preferences',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/preferences/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/preferences/src/definitions.ts',
  },
  {
    id: 'privacy-screen',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-privacy-screen/blob/1.x/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-privacy-screen/blob/1.x/src/definitions.ts',
  },
  {
    id: 'push-notifications',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/push-notifications/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/push-notifications/src/definitions.ts',
  },
  {
    id: 'screen-orientation',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/screen-orientation/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/screen-orientation/src/definitions.ts',
  },
  {
    id: 'screen-reader',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/screen-reader/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/screen-reader/src/definitions.ts',
  },
  {
    id: 'share',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/share/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/share/src/definitions.ts',
  },
  {
    id: 'splash-screen',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/splash-screen/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/splash-screen/src/definitions.ts',
  },
  {
    id: 'status-bar',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/status-bar/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/status-bar/src/definitions.ts',
  },
  {
    id: 'text-zoom',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/text-zoom/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/text-zoom/src/definitions.ts',
  },
  {
    id: 'toast',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/toast/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/7.x/toast/src/definitions.ts',
  },
  {
    id: 'watch',
    isCore: false,
    isExperimental: true,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/CapacitorWatch/blob/main/README.md',
    editApiUrl: 'https://github.com/ionic-team/CapacitorWatch/blob/main/packages/capacitor-plugin/src/definitions.ts',
    tag: 'latest',
  },
];

/**
 * @param {PluginApi} plugin
 */
async function buildPluginApiDocs(plugin) {
  const fileName = `${plugin.id}.md`;
  const filePath = new URL(fileName, API_DIR);

  // 获取最新源内容
  const [readme, pkgJson] = await Promise.all([getReadme(plugin), getPkgJsonData(plugin)]);

  // 检查文件是否已被翻译
  const existingTranslation = getExistingTranslation(filePath);
  if (existingTranslation) {
    const newHash = hashContent(readme);
    const storedHash = existingTranslation.sourceHash;
    if (storedHash && newHash === storedHash) {
      console.log(`跳过 ${fileName}（已被翻译，上游无变更）`);
      return;
    }
    if (!storedHash) {
      console.log(`更新 ${fileName}（补充 source_hash）`);
      const updatedContent = updateSourceHash(existingTranslation.content, newHash);
      fs.writeFileSync(filePath, updatedContent);
      return;
    }
    console.warn(`⚠️  ${fileName}：上游文档已更新，翻译需要同步！`);
    console.warn(`   存储哈希: ${storedHash}`);
    console.warn(`   最新哈希: ${newHash}`);
    const updatedContent = updateSourceHash(existingTranslation.content, newHash);
    fs.writeFileSync(filePath, updatedContent);
    return;
  }

  const apiContent = createApiPage(plugin, readme, pkgJson);
  fs.writeFileSync(filePath, apiContent);
}

function getExistingTranslation(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontmatterMatch && /translated:\s*true/.test(frontmatterMatch[1])) {
      const hashMatch = frontmatterMatch[1].match(/source_hash:\s*(\S+)/);
      return { content, sourceHash: hashMatch ? hashMatch[1] : '' };
    }
  } catch (e) {}
  return null;
}

function hashContent(content) {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const chr = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

function updateSourceHash(content, newHash) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return content;
  const oldFm = frontmatterMatch[1];
  let newFm;
  if (/source_hash:/.test(oldFm)) {
    newFm = oldFm.replace(/source_hash:\s*\S+/, `source_hash: ${newHash}`);
  } else {
    newFm = oldFm + `\nsource_hash: ${newHash}`;
  }
  return content.replace(oldFm, newFm);
}

/**
 * @param {PluginApi} plugin
 * @param {string} readme
 * @param {any} pkgJson
 * @returns {string}
 */
function createApiPage(plugin, readme, pkgJson) {
  const title = `${plugin.title ?? toTitleCase(plugin.id)} Capacitor Plugin API`;
  const desc = plugin.description ? plugin.description : pkgJson.description ? pkgJson.description.replace(/\n/g, ' ') : title;
  const editUrl = plugin.editUrl;
  const editApiUrl = plugin.editApiUrl;
  const sidebarLabel = plugin.title ?? toTitleCase(plugin.id);
  return `
---
title: ${title}
description: ${desc}
custom_edit_url: ${editUrl}
editApiUrl: ${editApiUrl}
sidebar_label: ${sidebarLabel}${plugin.isExperimental ? ' 🧪' : ''}
---

${readme}`.trim();
}

async function invalidateJSDELIVRCache(url) {
  const rsp = await fetch(url.replace('cdn', 'purge'), { method: 'GET' });
  let err = null;
  let rspData = null;
  try {
    rspData = await rsp.json();
  } catch (e) {
    err = e;
  }
  // @ts-ignore
  if (err !== null || rspData.status !== 'finished') {
    console.error(err);
    throw new Error("Failed to invalidate JSDELIVR cache for " + url);
  }
}

/**
 * @param {PluginApi} plugin
 * @returns {Promise<string>}
 */
async function getReadme(plugin) {
  const url = `https://cdn.jsdelivr.net/npm/${plugin.npmScope}/${!plugin.isCore ? plugin.id : 'core'}@${plugin.tag ?? tag}/${plugin.isCore ? `${plugin.id}.md` : 'README.md'}`;
  await invalidateJSDELIVRCache(url);
  const rsp = await fetch(url);
  return rsp.text();
}

/**
 * @param {PluginApi} plugin
 * @returns {Promise<any>}
 */
async function getPkgJsonData(plugin) {
  const url = `https://cdn.jsdelivr.net/npm/${plugin.npmScope}/${!plugin.isCore ? plugin.id : 'core'}@${plugin.tag ?? tag}/package.json`;
  await invalidateJSDELIVRCache(url);
  const rsp = await fetch(url);
  return rsp.json();
}

async function main() {
  console.log("Updating Plugin API Files for v7...");
  await Promise.all(pluginApis.map(buildPluginApiDocs));
  console.log(`Plugin API Files Updated 🎸`);
}

/**
 * @param {string} str
 * @returns {string}
 */
function toTitleCase(str) {
  return str.replace(/(^\w|-\w)/g, (s) => {
    return s.replace(/-/, ' ').toUpperCase();
  });
}

main();
