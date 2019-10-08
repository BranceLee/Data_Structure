const { BinarySearchTreeNode } = require('../BinarySearchTree');

const randArrays = () => {
  const testCases = [];
  const testCasesLength = 30;
  const tcMaxValue = 100;
  const tcMaxLength = 10;
  const tcValue = () => Math.round(Math.random() * tcMaxValue);
  const tcLength = () => Math.round(Math.random() * tcMaxLength + 1);
  Array.from({ length: testCasesLength }).forEach(() => {
    const tc = [];
    Array.from({ length: tcLength() }).forEach(() => {
      tc.push(tcValue());
    });
    testCases.push(tc);
  });
  return testCases;
};

const testCases = [
  [0],
  [0, 0],
  [0, 1],
  [0, -1],
  [0, 0, 0],
  [0, -1, -1],
  [0, 1, 1],
  [0, 1, 2],
  [0, -1, -1],
  [0, -1, -2],
  [0, 1, -1],
  [0, 1, -1, 2],
  [0, 1, -1, -2],
  [1, 1, -1, -2],
  [''],
  ['test'],
  ['test0', 'test1'],
  [false],
  [true, false],
  [undefined],
  [undefined, undefined],
  [undefined, undefined, undefined],
  [null, null],
  [null, null, null],
  [0, undefined, undefined],
  [0, undefined, null],
  [0, null, null],
  [0, true, true],
  [0, true, false],
  [0, true, false, false],
];

describe('BinarySearchTree', () => {
  it('Creating a bst, it should be an empty tree', () => {
    const bst = new BinarySearchTreeNode();
    expect(bst.left).toBeNull();
    expect(bst.right).toBeNull();
    expect(bst.parent).toBeNull();
    expect(bst.value).toBeNull();
  });

  it('should insert number', () => {
    const testCase = ['name', true, undefined, null, [], { name: 'alice' }];
    testCase.forEach(value => {
      const bst = new BinarySearchTreeNode();
      const newNode = bst.insert(value);
      expect(newNode).toBe(false);
    });
  });

  it('should insert value by bst order', () => {
    testCases.forEach(tc => {
      const bst = new BinarySearchTreeNode();
      tc.forEach(value => {
        const newNode = bst.insert(value);
        // case 相同插入相同参的时候
        if (!newNode) {
          expect(newNode).toBe(false);
          return;
        }
        // case在 Root 位置插入值
        if (!newNode.parent) {
          expect(newNode).toBe(bst);
          expect(newNode.left).toBe(null);
          expect(newNode.right).toBe(null);
          return;
        }
        // case 在左边插入
        if (newNode.parent.value > value) {
          expect(newNode.value).toBe(value);
          expect(newNode.parent.left).toBe(newNode);
          return;
        }
        // case 在右边插入
        if (newNode.parent.value < value) {
          expect(newNode.value).toBe(value);
          expect(newNode.parent.right).toBe(newNode);
          return;
        }
      });
    });
  });

  it('Find the tree node, it should be found in bst tree', () => {
    const tc = [1, 4, 0, -2, -8, -9, 8, 9, 10, 3];
    const bst = new BinarySearchTreeNode();
    tc.forEach(value => {
      bst.insert(value);
    });
    expect(bst.findNode(undefined, 8)).toBe(undefined);
    expect(bst.findNode(bst, -9).value).toBe(-9);
    expect(bst.findNode(bst, 8).value).toBe(8);
    expect(bst.findNode(bst, 4).left.value).toBe(3);
    expect(bst.findNode(bst, 4).right.value).toBe(8);
    expect(bst.findMin(bst).value).toBe(-9);
    expect(bst.findMax(bst).value).toBe(10);
  });

  it('Remove the target tree node, it should be remove and return boolen', () => {
    const bst = new BinarySearchTreeNode();
    expect(() => bst.remove(1)).toThrowError('Node no be found');

    bst.insert(1);
    expect(bst.remove(1)).toBe(true);
    expect(bst.value).toBe(null);

    bst.insert(1);
    bst.insert(2);
    bst.remove(2);
    expect(bst.right).toBe(null);

    bst.insert(2);
    bst.insert(3);
    bst.remove(3);
    expect(bst.right.right).toBeNull();
    expect(bst.right.value).toBe(2);
    expect(bst.left).toBe(null);
  });
});
