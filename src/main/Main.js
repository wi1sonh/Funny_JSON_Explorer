#!/usr/bin/env node

import fs from 'fs';
import { TreeFactory } from '../styles/TreeStyle.js';
import { RectangleFactory } from '../styles/RectangleStyle.js';
import { TreeRenderStrategy } from '../strategies/TreeRenderStrategy.js';
import { RectangleRenderStrategy } from '../strategies/RectangleRenderStrategy.js';
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

//   const jsonBuilder = new JsonExplorer();
// //   console.log(111)
//   const [icon, jsonNode] = jsonBuilder.builder(options.icon, options.style, content);
//   jsonBuilder.explorer(icon, jsonNode);

  // const iconFamily = new IconFamily();
  // iconFamily.loadFromFile('./config/icons.json');
  // const icon = iconFamily.getIcon('poker'); // or any other icon family

  if(options.style == "tree"){
    const treeFactory = new TreeFactory();
    const treeRootNode = treeFactory.create(content);
    const treeExplorer = new JsonExplorer(new TreeRenderStrategy());
    console.log(treeExplorer.explore(treeRootNode).join('\n'));
  }
  else if(options.style == "rectangle"){
    const rectangleFactory = new RectangleFactory();
    const rectangleRootNode = rectangleFactory.create(content);
    const rectangleExplorer = new JsonExplorer(new RectangleRenderStrategy());
    console.log(rectangleExplorer.explore(rectangleRootNode).join('\n'));
  }

});
