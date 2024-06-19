import { Node } from '../nodes/Node.js';
import { AbstractJsonFactory } from './AbstractJsonFactory.js';

class TreeFactory extends AbstractJsonFactory {
    create(rootNode) {
        return new TreeNode(null, 0, false, false, true, rootNode);
    }
}

class TreeNode extends Node {
    constructor(name, level, isLast, isLeaf, isRoot, jsonText) {
        super(name, level, jsonText, isLast, isLeaf, isRoot);
        this.jsonText = jsonText;
        this.visited = false; // Add a visited flag
        if (!this.isLeaf) {
            let i = 0;
            // console.log(icon);
            const keys = Object.keys(jsonText);
            keys.forEach((key, index) => {
                const value = jsonText[key];
                const isLast = index === keys.length - 1;
                const isLeaf = typeof value !== 'object' || value === null;
                const child = new TreeNode(key, this.level + 1, isLast, isLeaf, false, value);
                this.addChild(child);
                i++;
            });
        }
    }
}

export { TreeFactory, TreeNode };
