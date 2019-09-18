const { Blockchain } = require('../linked_list/linked_list');

class Queue {
  constructor() {
    this.elements = new Blockchain();
  }

  isEmpty() {
    return this.elements.size === 0;
  }

  // add index at the end of the chain.
  push(e) {
    this.elements.add(e);
  }

  // pop at the start of the chain
  pop() {
    if (this.isEmpty()) {
      throw new Error('Blockchain is null');
    }
    const data = this.elements.head.data;
    this.elements.removeAtIndex(0);
    return data;
  }
}

module.exports = Queue;
