import { IconFamily } from './Icon.js';
import { TreeFactory } from './TreeStyle.js';
import { RectangleFactory } from './RectangleStyle.js';

class JsonExplorer {
    constructor() {
        this.iconFamily = new IconFamily();
        this.iconFamily.loadFromFile('./config/icons.json');
        this.styleFamily = {
            'tree': new TreeFactory(),
            'rectangle': new RectangleFactory()
        };
    }

    builder(iconName, styleName, rootNode) {
        const icon = this.iconFamily.getIcon(iconName);
        const jsonNode = this.styleFamily[styleName].create(rootNode);
        return [icon, jsonNode];
    }

    explorer(icon, jsonNode) {
        const lineList = jsonNode.render(icon);
        lineList.forEach(line => {
            console.log(line);
        });
    }

    addStyle(styleName, newFactory) {
        this.styleFamily[styleName] = newFactory;
    }
}

export { JsonExplorer };
