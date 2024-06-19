class JsonIterator {
    constructor(rootNode) {
        this.stack = [rootNode];
    }

    next() {
        if (this.stack.length === 0) {
            return null;
        }
        const node = this.stack.pop();
        for (let i = node.children.length - 1; i >= 0; i--) {
            this.stack.push(node.children[i]);
        }
        return node;
    }

    hasNext() {
        return this.stack.length > 0;
    }
}

export { JsonIterator };
