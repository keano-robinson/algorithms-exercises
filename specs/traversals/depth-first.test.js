const preorderTraverse = (node, array) => {
	const buffer = [node];
	while (buffer.length) {
		const n = buffer.shift();
		array.push(n.value);
		if (n.right) buffer.unshift(n.right);
		if (n.left) buffer.unshift(n.left);
	}
	return array;
};

const inorderTraverse = (node, array) => {
	const buffer = [node];
	while (buffer.length) {
		const n = buffer.shift();
		if (typeof n === "number") {
			array.push(n);
			continue;
		}
		if (n.right) buffer.unshift(n.right);
		buffer.unshift(n.value);
		if (n.left) buffer.unshift(n.left);
	}
	return array;
};

const postorderTraverse = (node, array) => {
	const processNode = (n) => {
		if (n.left) processNode(n.left);
		if (n.right) processNode(n.right);
		array.push(n.value);
	};
	processNode(node);
	return array;
};

// unit tests
// do not modify the below code
describe("depth-first traversals", function () {
	const tree = {
		value: 8,
		left: {
			value: 4,
			left: {
				value: 3,
				left: {
					value: 2,
					left: null,
					right: null,
				},
				right: null,
			},
			right: {
				value: 5,
				left: null,
				right: {
					value: 7,
					left: {
						value: 6,
						left: null,
						right: null,
					},
				},
			},
		},
		right: {
			value: 12,
			left: {
				value: 10,
				left: {
					value: 9,
					left: null,
					right: null,
				},
				right: {
					value: 11,
					left: null,
					right: null,
				},
			},
		},
	};

	test("preorderTraverse", () => {
		expect(preorderTraverse(tree, [])).toEqual([
			8, 4, 3, 2, 5, 7, 6, 12, 10, 9, 11,
		]);
	});

	test("inorderTraverse", () => {
		expect(inorderTraverse(tree, [])).toEqual([
			2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
		]);
	});

	test("postorderTraverse", () => {
		expect(postorderTraverse(tree, [])).toEqual([
			2, 3, 6, 7, 5, 4, 9, 11, 10, 12, 8,
		]);
	});
});
