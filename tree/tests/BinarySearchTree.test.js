const {
  BinarySearchTree,
  BinarySearchTreeNode,
} = require('../BinarySearchTree');

describe('BinarySearchTree', () => {
  it('should be an empty tree', () => {
    const bst = new BinarySearchTree();
    expect(bst.left).toBe(null);
    expect(bst.right).toBe(null);
    expect(bst.parent).toBe(null);
    expect(bst.value).toBe(null);
  });
});
