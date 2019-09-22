const Queue = require('../queue');

/**
 *
 * @param {number} size
 * @returns {Queue}
 * generate the [0, 1, 2, 3, ...] 长度为 size 的自然数队列
 */
const genQueueNatureArray = size => {
  if (size < 0) {
    throw new Error('size can less than 0');
  }
  const queue = new Queue();
  Array.from({ length: size }).map((value, index) => {
    queue.push(index);
  });
  return queue;
};

describe('Test the queue', () => {
  it('should create empty queue when initial', () => {
    const queue = new Queue();
    expect(queue.elements.size).toBe(0);
    expect(queue.elements.head).toBe(null);
    expect(queue.elements.tail).toBe(null);
    expect(queue.isEmpty()).toBe(true);
  });

  it('should store different data type to queue', () => {
    const testCase = ['alice', true, false, 1, null, undefined, {name:'alice'}, []];

    testCase.forEach((value, index) => {
      const queue = new Queue();
      queue.push(value);
      expect(queue.elements.size).toBe(1);
      expect(queue.elements.head.data).toBe(testCase[index]);
      expect(queue.elements.tail.data).toBe(testCase[index]);
    });
  });

  it('should store undefined to the queue when without param in push function', () => {
    const queue = new Queue();

    for (let i = 1; i < 4; i++) {
      queue.push();
      expect(queue.elements.size).toBe(i);
      expect(queue.elements.head.data).toBe(undefined);
      expect(queue.elements.tail.data).toBe(undefined);
    }
  });

  it('should pop element from the queue', () => {
    const queue = new Queue();
    const tc = [1, 2, 3];

    tc.forEach(value => {
      queue.push(value);
    });

    const popItem1 = queue.pop();
    expect(popItem1).toBe(1);
    expect(queue.elements.size).toBe(2);
    expect(queue.elements.head.data).toBe(2);
    expect(queue.elements.tail.data).toBe(3);

    const popItem2 = queue.pop();
    expect(popItem2).toBe(2);
    expect(queue.elements.size).toBe(1);
    expect(queue.elements.tail.data).toBe(3);
    expect(queue.elements.head.data).toBe(3);

    const popItem3 = queue.pop();
    expect(popItem3).toBe(3);
    expect(queue.elements.size).toBe(0);
    expect(queue.elements.head).toBe(null);
    expect(queue.elements.tail).toBe(null);
  });

  it('should check empty function ', () => {
    const queue = new Queue();
    expect(() => queue.pop()).toThrowError('Blockchain is null');

    queue.push(1);
    queue.pop();
    expect(() => queue.pop()).toThrowError('Blockchain is null');
  });

  it('Test the empty function', () => {
    const queue = new Queue();
    expect(queue.isEmpty()).toBe(true);

    queue.push(1);
    expect(queue.isEmpty()).toBe(false);

    queue.pop();
    expect(queue.isEmpty()).toBe(true);
  });

  it('should dequeue from queue in FIFO with invalid param', () => {
    const queue = genQueueNatureArray(3);
    const popedItem = queue.pop(5);
    expect(popedItem).toBe(0);
    expect(queue.elements.size).toBe(2);
    expect(queue.elements.head.data).toBe(1);
    expect(queue.elements.tail.data).toBe(2);
  });

  
});
