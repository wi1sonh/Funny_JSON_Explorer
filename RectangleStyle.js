import { Node } from './Node.js';
import { AbstractJsonFactory } from './JsonStyleFactory.js';

class RectangleFactory extends AbstractJsonFactory {
    create(rootNode) {
        return new RectangleNode(null, 0, false, false, true, rootNode);
    }
}

class RectangleNode extends Node {
    constructor(name, level, isLast, isLeaf, isRoot, jsonText) {
        super(name, level, jsonText, isLast, isLeaf, isRoot);
        this.jsonText = jsonText;
        if (!this.isLeaf) {
            let i = 0;
            // console.log(jsonText);
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

    render(icon) {
        let lineList = this.isLeaf ? this.leafRender(icon) : this.nodeRender(icon);

        if (this.isRoot) {
            let lineStart = lineList[0].split('');
            lineStart[0] = '┌';
            lineStart[lineStart.length - 1] = '┐';
            lineList[0] = lineStart.join('');

            let end = lineList.length - 1;
            let lineEnd = lineList[end].split('');
            for (let i = 0; i < lineEnd.length; i++) {
                if (lineEnd[i] === '│') {
                    lineEnd[i] = (i === 0) ? '└' : '┴';
                } else if (lineEnd[i] === ' ') {
                    lineEnd[i] = '─';
                } else if (lineEnd[i] === '├') {
                    lineEnd[i] = '┴';
                    break;
                }
            }
            lineEnd[lineEnd.length - 1] = '┘';
            lineList[end] = lineEnd.join('');
        }
        return lineList;
    }

    leafRender(icon) {
        let line = '├─' + icon.leafIcon + this.name;
        if (this.jsonText !== null) {
            line += ': ' + this.jsonText;
        }
        line += ' ';
        for (let i = line.length; i < 43 - 2 - (this.level - 1) * 3; i++) {
            line += '─';
        }
        line += '─┤';
        return [line];
    }

    nodeRender(icon) {
        let lineList = [];
        if (!this.isRoot) {
            let line = '├─' + icon.nodeIcon + this.name + ' ';
            for (let i = line.length; i < 43 - 2 - (this.level - 1) * 3; i++) {
                line += '─';
            }
            line += '─┤';
            lineList.push(line);
        }

        this.children.forEach((child) => {
            let childLines = child.render(icon);
            childLines.forEach((line) => {
                lineList.push((this.level === 0) ? line : '│  ' + line);
            });
        });

        return lineList;
    }
}

export { RectangleFactory, RectangleNode };
