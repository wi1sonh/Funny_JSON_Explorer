class AbstractJsonFactory {
    constructor() {
        if (new.target === AbstractJsonFactory) {
            throw new TypeError("Cannot construct AbstractJsonFactory instances directly");
        }
    }

    create(rootNode) {
        throw new Error("Method 'create()' must be implemented.");
    }
}

export { AbstractJsonFactory };