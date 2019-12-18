class BinarySearchTree {
    constructor() {
      this.root = null
    }
  
    Node(key) {
      let left = null
      let right = null
      return {
        key,
        left,
        right
      }
    }
  
    insert(key) {
      let newNode = this.Node(key)
      if (this.root === null) {
        // 如果根节点为空，那么插入的节点就为根节点
        this.root = newNode
      } else {
        this.insertNode(this.root, newNode)
      }
    }
  
    insertNode(node, newNode) {
      console.log(node)
      if (newNode.key < node.key) {
        if (node.left === null) {
          node.left = newNode
        } else {
          this.insertNode(node.left, newNode)
        }
      } else {
        if (node.right === null) {
          node.right = newNode
        } else {
          this.insertNode(node.right, newNode)
        }
      }
    }
  
    inOrderTraverse(callback) {
      this.inOrderTraverseNode(this.root, callback)
    }
  
    inOrderTraverseNode(node, callback) {
      if (node !== null) {
        this.inOrderTraverseNode(node.left, callback)
        callback(node.key)
        this.inOrderTraverseNode(node.right, callback)
      }
    }
  
    preOrderTraverse(callback) {
      this.preOrderTraverseNode(this.root, callback)
    }
  
    preOrderTraverseNode(node, callback) {
      if (node !== null) {
        callback(node.key)
        this.preOrderTraverseNode(node.left, callback)
        this.preOrderTraverseNode(node.right, callback)
      }
    }
    postOrderTraverse(callback) {
      this.postOrderTraverseNode(this.root, callback)
    }
  
    postOrderTraverseNode(node, callback) {
      if (node !== null) {
        this.postOrderTraverseNode(node.left, callback)
        this.postOrderTraverseNode(node.right, callback)
        callback(node.key)
      }
    }
  
    // 搜索最小
    min() {
      return this.minNode(this.root)
    }
  
    minNode(node) {
      if (node) {
        // 如果节点存在，而且左边不为 null
        while (node && node.left !== null) {
          node = node.left
        }
  
        return node.key
      }
  
      // 如果树为空，则返回 null
      return null
    }
  
    // 搜索最大
    max() {
      return this.maxNode(this.root)
    }
  
    maxNode(node) {
      if (node) {
        while (node && node.right !== null) {
          node = node.right
        }
  
        return node.key
      }
  
      return null
    }
    
    search(key) {
      return this.searchNode(this.root, key)
    }
  
    searchNode(node, key) {
      console.log('node-', node, '---', node === null, '-key-', key)
      if (node === null) {
        return false
      }
      // 如果 key 比节点的值小，那么搜索左边的子节点，下面的相反
      if (key < node.key) {
        return this.searchNode(node.left, key)
      } else if (key > node.key) {
        return this.searchNode(node.right, key)
      } else {
        console.log('didi')
        return true
      }
    }
  
    invertTree (node = this.root) {
      if (node === null) {
        return
      }
      this.invertTree(node.left)
      this.invertTree(node.right)
      this.exchange(node)
    }
    
    exchange (node) {
      let temp = node.left
      node.left = node.right
      node.right = temp
    }
  }
  