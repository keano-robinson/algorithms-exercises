/*
  AVL Tree
  
  Name you class/function (anything we can call new on) Tree
  
  I would suggest making a Node class as well (it will help _a lot_ with AVL trees) Whereas with BSTs we 
  could get away with most of the logic living in the Tree class, that will be a lot tougher with AVL
  trees dues how the function calls must be recursive in order to get the balancing correct.
  
  Tree must a method called add that takes a value and adds it to the tree and then correctly balances the
  tree. There is only one correct structure for any given order of adding numbers and the unit tests enforce
  that structure.
  
  If you have any questions conceptually about balancing the tree, refer to the class website.
  
  Make sure you are calling the properties
  of the Nodes as follows:
  value - integer - the value being store in the tree
  left  - Node    - the subtree containing Node's with values less than the current Node's value
  right - Node    - the subtree containing Node's with values greater than the current Node's value

*/

class Tree {
	// code goes here
	constructor() {
		this.root = null;
	}
	add(value) {
		if (!this.root) {
			this.root = new Node(value);
		} else {
			this.root.add(value); // adding delegated to Node
		}
	}
	toObject() {
		return this.root;
	}
}

class Node {
	// code also goes here
	constructor(value) {
		this.left = null;
		this.right = null;
		this.value = value;
		this.height = 1;
	}
	add(value) {
		if (value === this.value) return;
		if (value < this.value) {
			if (this.left instanceof Node) {
				this.left.add(value);
			} else {
				this.left = new Node(value);
			}
		} else {
			if (this.right instanceof Node) {
				this.right.add(value);
			} else {
				this.right = new Node(value);
			}
		}
		this.updateInNewLocation();
		this.balance();
	}
	balance() {
		const left = this.left ?? { height: 0 };
		const right = this.right ?? { height: 0 };
		if (left.height - right.height > 1) {
			// the tree is left heavy
			if (this.left.right) {
				// this branch has a bend: double rotate
				this.left.rotateRR();
			}
			// this branch is linear: single rotate
			this.rotateLL();
		} else if (right.height - left.height > 1) {
			// the tree is right heavy
			if (this.right.left) {
				// this branch has a bend: double rotate
				this.right.rotateLL();
			}
			// this branch is linear: single rotate
			this.rotateRR();
		}
	}
	rotateRR() {
		// rotates the right subtree
		// retains the left subtree only
		const replacementNode = new Node(this.value);
		replacementNode.left = this.left;
		replacementNode.right = this.right.left;
		this.value = this.right.value;
		this.right = this.right.right;
		this.left = replacementNode;
		this.left.updateInNewLocation();
		this.updateInNewLocation();
	}
	rotateLL() {
		// retains the right subtree only
		const replacementNode = new Node(this.value);
		replacementNode.right = this.right;
		replacementNode.left = this.left.right;
		this.value = this.left.value;
		this.left = this.left.left;
		this.right = replacementNode;
		this.right.updateInNewLocation();
		this.updateInNewLocation();
	}
	updateInNewLocation() {
		// assumes that the height of the child nodes are correct ==> must update nodes heights from leaf to root;
		const left = this.left ?? { height: 0 };
		const right = this.right ?? { height: 0 };
		this.height = Math.max(left.height, right.height) + 1;
	}
}

// unit tests
// do not modify the below code
describe.skip("AVL Tree", function () {
	test("creates a correct tree", () => {
		const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
		const tree = new Tree();
		nums.map((num) => tree.add(num));
		const objs = tree.toObject();
		expect(objs.value).toEqual(4);

		expect(objs.left.value).toEqual(2);

		expect(objs.left.left.value).toEqual(1);
		expect(objs.left.left.left).toBeNull();
		expect(objs.left.left.right).toBeNull();

		expect(objs.left.right.value).toEqual(3);
		expect(objs.left.right.left).toBeNull();
		expect(objs.left.right.right).toBeNull();

		expect(objs.right.value).toEqual(7);

		expect(objs.right.left.value).toEqual(6);
		expect(objs.right.left.right).toBeNull();

		expect(objs.right.left.left.value).toEqual(5);
		expect(objs.right.left.left.left).toBeNull();
		expect(objs.right.left.left.right).toBeNull();

		expect(objs.right.right.value).toEqual(9);

		expect(objs.right.right.left.value).toEqual(8);
		expect(objs.right.right.left.left).toBeNull();
		expect(objs.right.right.left.right).toBeNull();

		expect(objs.right.right.right.value).toEqual(10);
		expect(objs.right.right.right.left).toBeNull();
		expect(objs.right.right.right.right).toBeNull();
	});
});
