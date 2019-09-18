const { Blockchain, Block } = require('../data_structures/linked_list');

describe('Test the linked list', () => {
  it('Test create blockchain should be empty', () => {
    const chain = new Blockchain();
    expect(chain.size).toBe(0);
    expect(chain.head).toBe(null);
    expect(chain.tail).toBe(null);
  });

  it('Test create block should get value', () => {
    const block = new Block(1);
    expect(block.data).toBe(1);
    expect(block.next).toBe(null);
  });

  it('Test the Add func param of index > size, should return error', () => {
    const chain = new Blockchain();
    expect(() => chain.add(1, 5)).toThrowError('Index out of bounds');
  });

  it('Test the Add func param of index === size, should add the block at the tail', () => {
    const chain = new Blockchain();
    for (let i = 0; i < 20; i++) {
      chain.add(i, chain.size);
      expect(chain.tail.data).toBe(i);
      expect(chain.head.data).toBe(0);
      expect(chain.size).toBe(i + 1);
    }
  });

  it('Test the Add func param of 0 < index < size, should add the block at index position', () => {
    const chain = new Blockchain();
    const block1 = new Block(1);
    const block2 = new Block(2);
    block2.next = block1;
    chain.head = block2;
    chain.tail = block1;
    chain.size = 2;
    chain.add(3, 1);
    expect(chain.size).toBe(3);
    expect(chain.head.data).toBe(2);
    expect(chain.head.next.data).toBe(3);
    expect(chain.tail.data).toBe(1);
    chain.add(4, 1);
    expect(chain.size).toBe(4);
    expect(chain.head.next.data).toBe(4);
    expect(chain.head.next.next.data).toBe(3);
    expect(chain.tail.data).toBe(1);
  });

  it('Test the Add func param of index === 0, should be added at the head place', () => {
    const chain = new Blockchain();
    for (let i = 0; i < 20; i++) {
      chain.add(i, 0);
      expect(chain.size).toBe(i + 1);
      expect(chain.head.data).toBe(i);
      expect(chain.tail.data).toBe(0);
    }
    for (let i = 0; i < 20; i++) {
      expect(chain.findNode(i).data).toBe(19 - i);
    }
  });

  it('Test the Add func param of index < 0, should return error', () => {
    const chain = new Blockchain();
    expect(() => chain.add(1, -1)).toThrowError('Index out of bounds');
  });

  it('Test the Add func parame of index === undefined, should be added at the tail place', () => {
    const chain = new Blockchain();
    for (let i = 0; i < 20; i++) {
      chain.add(i);
      expect(chain.size).toBe(i + 1);
      expect(chain.head.data).toBe(0);
      expect(chain.tail.data).toBe(i);
    }
    for (let i = 0; i < 20; i++) {
      expect(chain.findNode(i).data).toBe(i);
    }
  });

  it('Test the Add func param without index and data, and every block data is undefined', () => {
    const chain = new Blockchain();
    for (let i = 1; i <= 20; i++) {
      chain.add();
      expect(chain.size).toBe(i);
      expect(chain.head.data).toBe(undefined);
      expect(chain.tail.data).toBe(undefined);
    }
    for (let i = 0; i < 20; i++) {
      expect(chain.findNode(i).data).toBe(undefined);
    }
  });

  it('Test the Find func that chain without head, should return error', () => {
    const chain = new Blockchain();
    expect(() => chain.findNode(1)).toThrowError('Blockchain is null');
  });

  it(`Test the Find func param index >= chain's size, should return error`, () => {
    const chain = new Blockchain();
    chain.add(1, 0);
    expect(() => chain.findNode(1)).toThrowError('Index out of bounds');
  });

  it(`Test the Find func param index >= chain's size, should return error`, () => {
    const chain = new Blockchain();
    chain.add(1, 0);
    expect(() => chain.findNode(1)).toThrowError('Index out of bounds');
    expect(() => chain.findNode(2)).toThrowError('Index out of bounds');
  });

  it(`Test the Find func param index < 0, should return error`, () => {
    const chain = new Blockchain();
    chain.add(1, 0);
    expect(() => chain.findNode(-1)).toThrowError('Index out of bounds');
  });

  it('Test the Remove func that chain without head, should return error', () => {
    const chain = new Blockchain();
    expect(() => chain.removeAtIndex(1)).toThrowError('Blockchain is null');
  });

  it(`Test the Remove func param index >= chain's size, should return error`, () => {
    const chain = new Blockchain();
    chain.add(1, 0);
    expect(() => chain.removeAtIndex(1)).toThrowError('Index out of bounds');
    expect(() => chain.removeAtIndex(2)).toThrowError('Index out of bounds');
  });

  it(`Test the Remove func param index < 0, should return error`, () => {
    const chain = new Blockchain();
    chain.add(1, 0);
    expect(() => chain.removeAtIndex(-1)).toThrowError('Index out of bounds');
  });

  it('Test the Remove func param index === 0', () => {
    const chain = new Blockchain();
    chain.add(1, 0);
    chain.removeAtIndex(0);
    expect(chain.head).toBe(null);
    expect(chain.size).toBe(0);
    expect(chain.tail).toBe(null);

    chain.add(1, 0);
    chain.add(2, 0);
    chain.removeAtIndex(0);
    expect(chain.head.data).toBe(1);
    expect(chain.size).toBe(1);
    expect(chain.tail.data).toBe(1);
  });

  it('Test the Remove func param 0 < index < chain.size and index === chains.size -1', () => {
    const chain = new Blockchain();
    chain.add(0, 0);
    chain.add(1, 1);
    chain.add(2, 2);
    chain.removeAtIndex(2);
    expect(chain.head.data).toBe(0);
    expect(chain.size).toBe(2);
    expect(chain.tail.data).toBe(1);
  });

  it('Test the Remove func param 0 < index < chain.size and index !== chains.size -1', () => {
    const chain = new Blockchain();
    chain.add(0, 0);
    chain.add(1, 1);
    chain.add(2, 2);
    chain.removeAtIndex(1);
    expect(chain.head.data).toBe(0);
    expect(chain.size).toBe(2);
    expect(chain.tail.data).toBe(2);
  });

  it('Test update node', () => {
    const chain = new Blockchain();
    chain.add(1, 0);
    chain.update(100, 0);
    expect(chain.head.data).toBe(100);
    expect(chain.tail.data).toBe(100);
    expect(chain.size).toBe(1);
  });
});
