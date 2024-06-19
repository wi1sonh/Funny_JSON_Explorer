class JsonNode {
    constructor(isLeaf, isRoot, icon) {
        this.isLeaf = isLeaf;
        this.isRoot = isRoot;
        this.icon = icon;
    }

    render(strategy, icon) {
        // console.log(icon);
        return strategy.render(this, icon);
    }
}

export { JsonNode };
