import { Node } from '../nodes/Node.js';
import { AbstractJsonFactory } from './AbstractJsonFactory.js';

class RectangleFactory extends AbstractJsonFactory {
    create(rootNode) {
        return new RectangleNode(null, 0, false, false, true, rootNode);
    }
}

class RectangleNode extends Node {
    constructor(name, level, isLast, isLeaf, isRoot, jsonText) {
        super(name, level, jsonText, isLast, isLeaf, isRoot);
        this.jsonText = jsonText;
        this.visited = false; // Add a visited flag
        if (!this.isLeaf) {
            let i = 0;
            const keys = Object.keys(jsonText);
            keys.forEach((key, index) => {
                const value = jsonText[key];
                const isLast = index === keys.length - 1;
                const isLeaf = typeof value !== 'object' || value === null;
                const child = new RectangleNode(key, this.level + 1, isLast, isLeaf, false, value);
                this.addChild(child);
                i++;
            });
        }
    }
}

export { RectangleFactory, RectangleNode };
