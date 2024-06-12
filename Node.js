class JsonNode {
    constructor(isLeaf, isRoot) {
        this.isLeaf = isLeaf;
        this.isRoot = isRoot;
    }

    leafRender(icon) {
        // Implement this method as needed
    }

    nodeRender(icon) {
        // Implement this method as needed
    }

    render(icon) {
        // Implement this method as needed
    }
}

class Node extends JsonNode {
    constructor(name, level, val, isLast, isLeaf, isRoot) {
        super(isLeaf, isRoot);
        this.children = [];
        this.name = name;
        this.level = level;
        this.val = val;
        this.isLast = isLast;
    }

    addChild(child) {
        this.children.push(child);
    }
}

export { Node };