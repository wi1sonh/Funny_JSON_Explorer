import { JsonNode } from './JsonNode.js';

class Node extends JsonNode {
    constructor(name, level, val, isLast, isLeaf, isRoot, icon) {
        super(isLeaf, isRoot);
        this.children = [];
        this.name = name;
        this.level = level;
        this.val = val;
        this.isLast = isLast;
        this.icon = icon;
        // console.log(this.icon);
    }

    addChild(child) {
        this.children.push(child);
    }
}

export { Node };
