const { BinarySearchTreeNode } = require('../BinarySearchTree');

const randArrays = () => {
  const testCases = [];
  const testCasesLength = 30;
  const tcMaxValue = 100;
  const tcMaxLength = 10;
  const tcValue = () =>( Math.round(Math.random() * tcMaxValue));
  const tcLength = () => Math.round(Math.random() * tcMaxLength + 1);
  Array.from({ length: testCasesLength }).forEach(() => {
    const tc = [];
    Array.from({ length: tcLength() }).forEach(() => {
      tc.push(tcValue());
    });
    testCases.push(tc);
  });
  return testCases
};

describe('BinarySearchTree', () => {
  it('Creating a bst, it should be an empty tree', () => {
    const bst = new BinarySearchTreeNode();
    expect(bst.left).toBeNull();
    expect(bst.right).toBeNull();
    expect(bst.parent).toBeNull();
    expect(bst.value).toBeNull();
  });

  it('Inserting value, it should be in bst order', () => {
    const testCases = [
      [0],
      [0, -1],
      [0, 1],
      [0, 1, 2],
      [0, -1, -2],
      [0, 1, -1],
      [0, 1, -1, 2],
      [0, 1, -1, -2],
      [1, 1, -1, -2],
    ];
    // const testCases = randArrays()
    testCases.forEach(tc => {
      const bst = new BinarySearchTreeNode();
      tc.forEach(value => {
        const newNode = bst.insert(value);
        if (!newNode) {
          expect(newNode).toBe(false);
          return;
        }
        if (!newNode.parent) {
          expect(newNode).toBe(bst);
          expect(newNode.left).toBe(null);
          expect(newNode.right).toBe(null);
          return;
        }
        if (newNode.parent.value === value) {
          expect(newNode.parent).toBe(null);
        }
        if (newNode.parent.value > value) {
          expect(newNode.parent.left).toBe(newNode);
        }
        if (newNode.parent.value < value) {
          expect(newNode.parent.right).toBe(newNode);
        }
      });
    });
  });
});
