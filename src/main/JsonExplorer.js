import { JsonIterator } from '../iterators/JsonIterator.js';

class JsonExplorer {
    constructor(strategy) {
        this.strategy = strategy;
        // console.log(this.icon);
    }

    explore(rootNode, icon) {
        // console.log(icon);
        const iterator = new JsonIterator(rootNode);
        let result = [];
        while (iterator.hasNext()) {
            const node = iterator.next();
            // console.log(icon);
            result = result.concat(node.render(this.strategy, icon));
        }
        return result;
    }
}

export { JsonExplorer };
