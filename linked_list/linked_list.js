class Block {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Blockchain {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // 时间复杂度O(n)
  findNode(index) {
    if (!this.head) {
      throw new Error('Blockchain is null');
    }
    if (index >= this.size || index < 0) {
      throw new Error('Index out of bounds');
    }

    let node = this.head;
    for (let i = 1; i <= index; i++) {
      node = node.next;
    }
    return node;
  }

  /**
   * @param {number} index
   * @return {Block}
   * 时间复杂度O(n)
   */

  removeAtIndex(index) {
    if (!this.head) {
      throw new Error('Blockchain is null');
    }
    if (index >= this.size || index < 0) {
      throw new Error('Index out of bounds');
    }
    let deleteNode = null;
    if (index === 0) {
      deleteNode = this.head;
      if (this.size === 1) {
        this.head = this.tail = null;
      } else {
        this.head = this.head.next;
      }
      this.size = this.size - 1;
      return deleteNode;
    }
    const node = this.findNode(index);
    const prev = this.findNode(index - 1);
    prev.next = node.next;
    deleteNode = node;
    if (index === this.size - 1) {
      this.tail = prev;
    }
    this.size = this.size - 1;
    return deleteNode;
  }

  /**
   *  @param {*} data
   *  @param {Number} index
   *  @returns {Blockchain}
   *  时间复杂度O(n)
   */

  add(data, index) {
    const node = new Block(data);
    if (index > this.size || index < 0) {
      throw new Error('Index out of bounds');
    }

    // 无 和 尾部 处理 tail, else 处理head与中间插入
    if (index === undefined || index === this.size) {
      if (!this.head) {
        this.head = node;
      }

      if (this.tail) {
        this.tail.next = node;
      }
      this.tail = node;
    } else {
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        const currentNode = this.findNode(index);
        const preNode = this.findNode(index - 1);
        node.next = currentNode;
        preNode.next = node;
      }
    }
    this.size = this.size + 1;
    return this;
  }

  /**
   * 时间复杂度O(n)
   */

  update(data, index) {
    const node = this.findNode(index);
    node.data = data;
  }
}

module.exports = { Blockchain, Block };
