import fs from 'fs';
import fetch from 'node-fetch';

const API_DIR = new URL('../versioned_docs/version-v6/apis/', import.meta.url);

const tag = 'latest-6';

const pluginApis = [
  'action-sheet',
  'app',
  'app-launcher',
  {
    id: 'background-runner',
    editUrl: 'https://github.com/ionic-team/capacitor-background-runner/blob/2.x/README.md',
    editApiUrl:
      'https://github.com/ionic-team/capacitor-background-runner/blob/2.x/packages/capacitor-plugin/src/definitions.ts',
  },
  'browser',
  'camera',
  'clipboard',
  'device',
  'dialog',
  'filesystem',
  'geolocation',
  {
    id: 'google-maps',
    editUrl: 'https://github.com/ionic-team/capacitor-google-maps/blob/6.x/plugin/README.md',
    editApiUrl:
      'https://github.com/ionic-team/capacitor-google-maps/blob/6.x/plugin/src/definitions.ts',
  },
  'haptics',
  'keyboard',
  'local-notifications',
  'motion',
  'network',
  'preferences',
  'push-notifications',
  'screen-orientation',
  'screen-reader',
  'share',
  'splash-screen',
  'status-bar',
  'text-zoom',
  'toast',
];

const isString = (value) => typeof value === 'string' || value instanceof String;

async function buildPluginApiDocs(plugin) {
  const pluginId = isString(plugin) ? plugin : plugin.id;
  const fileName = `${pluginId}.md`;
  const filePath = new URL(fileName, API_DIR);

  // 获取最新源内容
  const [readme, pkgJson] = await Promise.all([getReadme(pluginId), getPkgJsonData(pluginId)]);

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

function createApiPage(plugin, readme, pkgJson) {
  const pluginId = isString(plugin) ? plugin : plugin.id;
  const title = `${toTitleCase(pluginId)} Capacitor Plugin API`;
  const desc = pkgJson.description ? pkgJson.description.replace(/\n/g, ' ') : title;
  const editUrl = isString(plugin)
    ? `https://github.com/ionic-team/capacitor-plugins/blob/6.x/${pluginId}/README.md`
    : plugin.editUrl;
  const editApiUrl = isString(plugin)
    ? `https://github.com/ionic-team/capacitor-plugins/blob/6.x/${pluginId}/src/definitions.ts`
    : plugin.editApiUrl;
  const sidebarLabel = toTitleCase(pluginId);

  // // escape right curly brace in inline code blocks for MDX v3 compatability
  // const regexp = /[<|(&lt;)]code>(.*)[<|(&lt;)]\/code>/g;

  // readme = readme.replace(regexp, (result) => {
  //   return result.replace(/\{/g, '&#123;');
  // });

  // // removes JSDoc HTML comments as they break docusauurs
  // readme = readme.replaceAll(/<!--.*-->/g, '').replaceAll('<->', '&lt;->');

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

async function getReadme(pluginId) {
  const url = `https://cdn.jsdelivr.net/npm/@capacitor/${pluginId}@${tag}/README.md`;
  const rsp = await fetch(url);
  return rsp.text();
}

async function getPkgJsonData(pluginId) {
  const url = `https://cdn.jsdelivr.net/npm/@capacitor/${pluginId}@${tag}/package.json`;
  const rsp = await fetch(url);
  return rsp.json();
}

async function main() {
  await Promise.all(pluginApis.map(buildPluginApiDocs));
  console.log(`Plugin API Files Updated 🎸`);
}

function toTitleCase(str) {
  return str.replace(/(^\w|-\w)/g, (s) => {
    return s.replace(/-/, ' ').toUpperCase();
  });
}

main();