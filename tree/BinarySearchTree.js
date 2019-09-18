class BinarySearchTreeNode{
    constructor(value = null){
        this.left = null;
        this.right = null;
        this.value = value;
        this.parent = null;
    }

    setValue =(value)=>{
        this.value = value
        return true
    }

    setRight=(node)=>{
        if(this.right){
            this.right.parent = null
        }
        this.right = node 
        if(this.right){
            this.right.parent = this
        }
        return this
    }

    setLeft=(node)=>{
        if(this.left){
            this.left.parent = null
        }
        this.left = node
        if(this.left){
            this.left.parent = this;
        }
        return this
    }

    findMin=()=>{
        /* if(!this.left){
        *     return this
        *   }
        *   this.findMin(this.left)
        */ 
        while(this.left!==null){
            this = this.left
        }
    }

    replaceNode=( newNode = null)=>{
        const parent = this.parent
        if(!parent){
            newNode.parent = null;
            this.left = newNode.left;
            this.right = newNode.right;
            this.value = newNode.value;
        }
        if (parent.left && parent.left.value === this.value) {
            parent.left = newNode;
          return true;
        }
        if (parent.right && parent.right.value === this.value) {
            parent.right = newNode;
          return true;
        }
        return false;
      }
}

// 以节点为单元递归操作
class BinarySearchTree extends BinarySearchTreeNode{
    constructor(value){
        super(value)
    }

    /**
     * Note: 相同的元素不再插入，直接返回对应的Node
     * 从无到有的开始插
     * @param {*} value 
     * @return {BinarySearchTreeNode}
     */
    insert(value){
        if(this.value === null){
            this.value = value;
            return this
        }
        if(value < this.value){
            if(this.left){
              return this.left.insert(value)
            }
            const newNode = new BinarySearchTreeNode(value)
            this.left = newNode
            return newNode
        }
        if(this.value < value){
            if(this.right){
                return this.right.insert(value) 
            }
            const newNode = new BinarySearchTreeNode(value)
            this.right = newNode
            return newNode
        }
        return this 
    }

    /**
     * 
     * @param {BinarySearchTree} root 
     * @param {*} value 
     * @return {BinarySearchTreeNode}
     */
    findNode(root, value){
        if (!root || root.value === value){
            return root
        }
        if(value < root.value){
            return this.findNode(root.left, value)
        }
        if(root.value < value){
            return this.findNode(root.right, value)
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

    remove(value){
        const target = this.findNode(value)
        if(!target){
            throw new Error('Node no be found')
        }
        if(target.left && target.right){
            const nextBiggerNode = target.right.findMin();
            /** 若不存在比右子节点还小的后代节点，最小的节点就只能是右子节点 */
            if(nextBiggerNode === target.right){
                // target.right.left is null, here
                target.right = target.right.right
                target.value = target.right.value
            }else{
                /**  存在比右子键点还小的后代节点 */
                this.remove(nextBiggerNode);
                target.value = nextBiggerNode.value;
            }            
        }else {
            child = target.left || target.right
            target.replaceNode(child)
        }
        return true
    }
}

module.exports = {BinarySearchTree, BinarySearchTreeNode}