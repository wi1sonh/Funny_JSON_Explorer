import { RenderStrategy } from './RenderStrategy.js';

class RectangleRenderStrategy extends RenderStrategy {
    render(node, icon) {
        if (node.visited) return []; // Skip rendering if node is already visited
        node.visited = true; // Mark the node as visited
        // console.log(icon);
        let lineList = node.isLeaf ? this.leafRender(node, icon) : this.nodeRender(node, icon);

        if (node.isRoot) {
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

    leafRender(node, icon) {
        // console.log(icon);
        let line = '├─' + "😊" + node.name;
        if (node.val !== null) {
            line += ': ' + node.val;
        }
        line += ' ';
        for (let i = line.length; i < 43 - 2 - (node.level - 1) * 3; i++) {
            line += '─';
        }
        line += '─┤';
        return [line];
    }

    nodeRender(node, icon) {
        let lineList = [];
        if (!node.isRoot) {
            let line = '├─' + "😎" + node.name + ' ';
            for (let i = line.length; i < 43 - 2 - (node.level - 1) * 3; i++) {
                line += '─';
            }
            line += '─┤';
            lineList.push(line);
        }

        node.children.forEach((child) => {
            let childLines = child.render(this);
            childLines.forEach((line) => {
                lineList.push((node.level === 0) ? line : '│  ' + line);
            });
        });

        return lineList;
    }
}

export { RectangleRenderStrategy };
