#!/usr/bin/env node

import fs from 'fs';
import { JsonExplorer } from './JsonExplorer.js';
import { Command } from 'commander';

// 创建命令行工具
const program = new Command();
program
  .description('Funny JSON Explorer')
  .requiredOption('-f, --file <type>', 'json file name')
  .option('-s, --style <type>', 'json style', 'tree')
  .option('-i, --icon <type>', 'json icon', 'default');

// 解析命令行参数
program.parse(process.argv);
const options = program.opts();

// // 检查参数
// if (!options.file || !options.style || !options.icon) {
//   console.error('Error: All options -f, -s, and -i are required.');
//   process.exit(1);
// }

// // 读取JSON文件
// const jsonFilePath = path.resolve(options.file);
// let jsonData;
// try {
//   const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8');
//   jsonData = JSON.parse(jsonContent);
// } catch (err) {
//   console.error('Error reading or parsing JSON file:', err);
//   process.exit(1);
// }

fs.readFile(options.file, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    return;
  }

  let content;
  try {
    content = JSON.parse(data);
    // console.log(111)
  } catch (e) {
    console.error('Invalid JSON content:', e);
    return;
  }

  const jsonBuilder = new JsonExplorer();
//   console.log(111)
  const [icon, jsonNode] = jsonBuilder.builder(options.icon, options.style, content);
  jsonBuilder.explorer(icon, jsonNode);
});
