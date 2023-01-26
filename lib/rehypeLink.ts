import type { Root } from 'hast';
import { hasProperty } from 'hast-util-has-property';
import { visit } from 'unist-util-visit';

const rephyTargetBlank = () => {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (hasProperty(node, 'target')) {
        return;
      }
      node.properties!.target = '_blank';
    });
  };
};

export default rephyTargetBlank;
