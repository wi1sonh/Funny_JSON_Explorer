import fs from 'fs';

class Icon {
    constructor(nodeIcon, leafIcon) {
        this.leafIcon = leafIcon;
        this.nodeIcon = nodeIcon;
    }
}

class IconFamily {
    constructor() {
        this.allIcon = {
            'default': [' ', ' '],
            'poker': ['\u2662', '\u2664']
        };
    }

    addIcon(iconName, leafIcon, nodeIcon) {
        this.allIcon[iconName] = [nodeIcon, leafIcon];
    }

    getIcon(iconName) {
        const [nodeIcon, leafIcon] = this.allIcon[iconName] || this.allIcon['default'];
        return new Icon(nodeIcon, leafIcon);
    }

    loadFromFile(filePath) {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const config = JSON.parse(data);

            for (const iconName in config) {
                const { leafIcon, nodeIcon } = config[iconName];
                this.addIcon(iconName, leafIcon, nodeIcon);
            }
        } catch (error) {
            console.error(`Error loading icon configuration: ${error}`);
        }
    }
}

export { IconFamily };