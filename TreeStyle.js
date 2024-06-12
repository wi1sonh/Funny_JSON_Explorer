import { Node } from './Node.js';
import { AbstractJsonFactory } from './JsonStyleFactory.js';

class TreeFactory extends AbstractJsonFactory {
    create(rootNode) {
        return new TreeNode(null, 0, false, false, true, rootNode);
    }
}

class TreeNode extends Node {
    constructor(name, level, isLast, isLeaf, isRoot, jsonText) {
        super(name, level, jsonText, isLast, isLeaf, isRoot);
        this.jsonText = jsonText;
        if (!this.isLeaf) {
            let i = 0;
            const keys = Object.keys(jsonText);
            keys.forEach((key, index) => {
                // console.log(key);
                const value = jsonText[key];
                // console.log(this.jsonText[key]);
                const isLast = index === keys.length - 1;
                const isLeaf = typeof value !== 'object' || value === null;
                // console.log(value);
                const child = new TreeNode(key, this.level + 1, isLast, isLeaf, false, value);
                this.addChild(child);
                i++;
                // console.log(this.jsonText);
            });

        }
    }

    render(icon) {
        return this.isLeaf ? this.leafRender(icon) : this.nodeRender(icon);
    }

    leafRender(icon) {
        // console.log(this.jsonText);
        let line = '';
        line += this.isLast ? '└─' : '├─';
        line += icon.leafIcon + this.name;
        if (this.jsonText !== null) {
            // console.log(this.jsonText);
            line += ': ' + this.jsonText;
        }
        return [line];
    }

    nodeRender(icon) {
        const lineList = [];
        if (!this.isRoot) {
            let line = '';
            line += this.isLast ? '└─' : '├─';
            line += icon.nodeIcon + this.name;
            lineList.push(line);
        }
        this.children.forEach((child) => {
            const childLines = child.render(icon);
            childLines.forEach((line) => {
                if (this.level === 0) {
                    lineList.push(line);
                } else if (this.isLast) {
                    lineList.push('   ' + line);
                } else {
                    lineList.push('│  ' + line);
                }
            });
        });
        return lineList;
    }
}

export { TreeFactory, TreeNode };
