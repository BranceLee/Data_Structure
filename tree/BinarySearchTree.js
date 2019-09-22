class BinaryTreeNode {
  constructor(value = null) {
    this.left = null;
    this.right = null;
    this.value = value;
    this.parent = null;
  }

  setValue(value) {
    this.value = value;
    return true;
  }

  setRight(node) {
    if (this.right) {
      this.right.parent = null;
    }
    this.right = node;
    if (this.right) {
      this.right.parent = this;
    }
    return this;
  }

  setLeft(node) {
    if (this.left) {
      this.left.parent = null;
    }
    this.left = node;
    if (this.left) {
      this.left.parent = this;
    }
    return this;
  }
}

// 以节点为单元递归操作
class BinarySearchTreeNode extends BinaryTreeNode {
  constructor(value) {
    super(value);
  }

  /**
   * Note: 相同的元素不再插入，直接返回对应的Node
   * 从无到有的开始插
   * @param {*} value
   * @return {BinarySearchTreeNode}
   */
  insert(value) {
    if (this.value === null) {
      this.value = value;
      return this;
    }
    if (this.value === value) {
      return false;
    }
    if (value < this.value) {
      if (this.left) {
        return this.left.insert(value);
      }
      const newNode = new BinarySearchTreeNode(value);
      this.setLeft(newNode);
      return newNode;
    }
    if (this.value < value) {
      if (this.right) {
        return this.right.insert(value);
      }
      const newNode = new BinarySearchTreeNode(value);
      this.setRight(newNode);
      return newNode;
    }
    return this;
  }

  /**
   *
   * @param {BinarySearchTree} root
   * @param {*} value
   * @return {BinarySearchTreeNode}
   */
  findNode(root, value) {
    if (!root || root.value === value) {
      return root;
    }
    if (value < root.value) {
      return this.findNode(root.left, value);
    }
    if (root.value < value) {
      return this.findNode(root.right, value);
    }
  }

  /**
   * Remove 核心在于，该节点死后，找与该节点最相似，最合适的人上位。
   * 规则如下
   *  - No Child : just delete the node
   *  - One Child: target.left or the target.right replace the target
   *  - Two Child: find the next bigger and min node.value to replace the target and delete the node positon （右树最左与他最相似）
   *
   *  @param {*} value
   *  @returns {boolean}
   *
   */
  remove(value) {
    const target = this.findNode(this,value);
    if (!target) {
      throw new Error('Node no be found');
    }
    if(!target.left && !target.right){
      if(!target.parent){
        target.value = null;
        return true
      }
      if(target === target.parent.left){
        target.parent.left = null;
      }
      if(target === target.parent.right){
        target.parent.right = null;
      }
      return true
    }
    if (target.left && target.right) {
      const nextBiggerNode = target.right.findMin();
      /** 若不存在比右子节点还小的后代节点，最小的节点就只能是右子节点 */
      if (nextBiggerNode === target.right) {
        // target.right.left is null, here
        target.setRight(target.right.right);
        target.value = target.right.value;
      } else {
        /**  存在比右子键点还小的后代节点 */
        this.remove(nextBiggerNode);
        target.value = nextBiggerNode.value;
      }
    } else {
      const child = target.left || target.right;
      return target.replaceNode(child);
    }
    return true;
  }

  findMin(root) {
    if (!root.left) {
      return root;
    }
    return this.findMin(root.left);
  }

  findMax(root){
    if(!root.right){
      return root
    }
    return this.findMax(root.right)
  }

  replaceNode(newNode) {
    const parent = this.parent;
    if (!parent ) {
      newNode.parent = null;
      this.left = newNode.left;
      this.right = newNode.right;
      this.value = newNode.value;
      return true
    }
    if (parent.left && parent.left.value === this.value) {
      parent.setLeft(newNode);
      return true;
    }
    if (parent.right && parent.right.value === this.value) {
      parent.setRight(newNode);
      return true;
    }
    return false;
  }
}

module.exports = { BinaryTreeNode, BinarySearchTreeNode };
