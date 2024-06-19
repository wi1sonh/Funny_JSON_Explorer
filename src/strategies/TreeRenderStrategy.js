import { RenderStrategy } from './RenderStrategy.js';
import { IconFamily } from '../icons/IconFamily.js';

class TreeRenderStrategy extends RenderStrategy {
    render(node, icon) {
        if (node.visited) return []; // Skip rendering if node is already visited
        node.visited = true; // Mark the node as visited
        // console.log(icon);
        return node.isLeaf ? this.leafRender(node, icon) : this.nodeRender(node, icon);
    }

    leafRender(node, icon) {
        let line = '';
        line += node.isLast ? '└─' : '├─';
        line += "😊" + node.name;
        if (node.val !== null) {
            line += ': ' + node.val;
        }
        return [line];
    }

    nodeRender(node, icon) {
        const lineList = [];
        if (!node.isRoot) {
            let line = '';
            line += node.isLast ? '└─' : '├─';
            line += "😎" + node.name;
            lineList.push(line);
        }
        node.children.forEach((child) => {
            const childLines = child.render(this);
            childLines.forEach((line) => {
                if (node.level === 0) {
                    lineList.push(line);
                } else if (node.isLast) {
                    lineList.push('   ' + line);
                } else {
                    lineList.push('│  ' + line);
                }
            });
        });
        return lineList;
    }
}

export { TreeRenderStrategy };
