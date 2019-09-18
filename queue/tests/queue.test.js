const Queue = require('../data_structures/queue');

describe('Test the queue', () => {
  it('Test create queue should be empty', () => {
    const queue = new Queue();
    expect(queue.elements.size).toBe(0);
    expect(queue.elements.head).toBe(null);
    expect(queue.elements.tail).toBe(null);
    expect(queue.isEmpty()).toBe(true);
  });

  it('Test push element to queue', () => {
    const queue = new Queue();
    queue.push(1);
    expect(queue.elements.tail.data).toBe(1);
    queue.push(2);
    expect(queue.elements.tail.data).toBe(2);
  });

  it('Test pop element to queue', () => {
    const queue = new Queue();
    queue.push(1);
    queue.push(2);
    queue.push(3);
    queue.pop();
    expect(queue.elements.tail.data).toBe(3);
    expect(queue.elements.head.data).toBe(2);
    expect(queue.elements.size).toBe(2);
    queue.pop();
    expect(queue.elements.tail.data).toBe(3);
    expect(queue.elements.head.data).toBe(3);
    expect(queue.elements.size).toBe(1);
    queue.pop();
    expect(queue.elements.tail).toBe(null);
    expect(queue.elements.head).toBe(null);
    expect(queue.elements.size).toBe(0);

    expect(() => queue.pop()).toThrowError('Blockchain is null');
  });
});
