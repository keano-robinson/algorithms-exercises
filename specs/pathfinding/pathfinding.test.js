// write in a function thats a X by X array of arrays of numbers
// as well two x/y combinations and have it return the shortest
// length (you don't need to track the actual path) from point A
// to point B.
//
// the numbers in the maze array represent as follows:
// 0 – open space
// 1 - closed space, cannot pass through. a wall
// 2 - one of the two origination points
//
// you will almost certainly need to transform the maze into your own
// data structure to keep track of all the meta data

// this is a little tool I wrote to log out the maze to the console.
// it is opinionated of how to do that and you do not have to do it
// the way I did. however feel free to use it if you'd like
const logMaze = require("./logger");

const A = 1;
const B = 2;
const NO_ONE = 0;
function findShortestPathLength(maze, [xA, yA], [xB, yB]) {
	// transform maze into data structure - graph
	// do breadth first search
	// notional graph with children: (x, y-1), (x + 1, y), (x, y + 1), (x - 1, y)
	// replace each point in graph with object containing the meta data
	if (!Array.isArray(maze) || !Array.isArray(maze[0]))
		throw new TypeError("Invalid maze");

	// initialization: transform maze
	for (y in maze) {
		for (x in maze[y]) {
			if (x == xA && y == yA)
				maze[y][x] = { openedBy: A, closed: false, length: 0 };
			else if (x == xB && y == yB)
				maze[y][x] = { openedBy: B, closed: false, length: 0 };
			else if (maze[y][x] === 1)
				maze[y][x] = { openedBy: NO_ONE, closed: true, length: Infinity };
			else maze[y][x] = { openedBy: NO_ONE, closed: false, length: undefined };
		}
	}

	const seenByA = new Set();
	const seenByB = new Set();
	const hasASeen = (x, y) => {
		return seenByA.has(`${x};${y}`);
	};
	const hasBSeen = (x, y) => {
		return seenByB.has(`${x};${y}`);
	};
	const isWithinBounds = (x, y) => {
		return x >= 0 && x < maze[0].length && y >= 0 && y < maze.length;
	};
	const labelCoordinatePoint = (entity, x, y, stepsTaken) => {
		if (entity === A) seenByA.add(`${x};${y}`);
		else if (entity === A) seenByB.add(`${x};${y}`);

		if (!isWithinBounds(x, y))
			return { openedBy: NO_ONE, closed: true, length: Infinity };

		const point = maze[y][x];
		if (point.closed) return point;
		if (point.openedBy) return point;
		point.openedBy = entity;
		point.length = stepsTaken;
		return point;
	};
	let frontierA = [[xA, yA]];
	let frontierB = [[xB, yB]];
	let steps = 0;
	logMaze(maze);
	while (frontierA.length && frontierB.length) {
		const newFrontierA = [];
		while (frontierA.length) {
			const [x, y] = frontierA.pop();
			const p = labelCoordinatePoint(A, x, y, steps);
			if (p.openedBy === B) {
				logMaze(maze);
				return p.length + steps;
			}
			if (!p.closed) {
				[
					[x, y - 1],
					[x + 1, y],
					[x, y + 1],
					[x - 1, y],
				].forEach((coordinate) => {
					if (!hasASeen(...coordinate) && isWithinBounds(...coordinate))
						newFrontierA.push(coordinate);
				});
			}
		}
		const newFrontierB = [];
		while (frontierB.length) {
			const [x, y] = frontierB.pop();
			const p = labelCoordinatePoint(B, x, y, steps);
			if (p.openedBy === A) {
				logMaze(maze);
				return p.length + steps;
			}
			if (!p.closed) {
				[
					[x - 1, y],
					[x, y + 1],
					[x + 1, y],
					[x, y - 1],
				].forEach((coordinate) => {
					if (!hasBSeen(...coordinate) && isWithinBounds(...coordinate))
						newFrontierB.push(coordinate);
				});
			}
		}
		frontierA = newFrontierA;
		frontierB = newFrontierB;
		logMaze(maze);
		steps++;
	}
	return -1;
}

const byEachOther = [
	[0, 0, 0, 0, 0],
	[0, 2, 2, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 1, 1, 1, 1],
	[0, 0, 0, 0, 0],
];
const impossible = [
	[0, 0, 0, 0, 0],
	[0, 2, 0, 0, 0],
	[0, 0, 1, 1, 1],
	[1, 1, 1, 0, 0],
	[0, 0, 0, 0, 2],
];

const fifteenByFifteen = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
	[0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
	[0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
	[0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
	[0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0],
	[0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
	[0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
	[0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
	[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
	[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const sp = findShortestPathLength(byEachOther, [1, 1], [4, 4]);
console.log(sp);

// there is a visualization tool in the completed exercise
// it requires you to shape your objects like I did
// see the notes there if you want to use it

// // unit tests
// // do not modify the below code
describe.skip("pathfinding – happy path", function () {
	const fourByFour = [
		[2, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 2],
	];
	test("should solve a 4x4 maze", () => {
		expect(findShortestPathLength(fourByFour, [0, 0], [3, 3])).toEqual(6);
	});

	const sixBySix = [
		[0, 0, 0, 0, 0, 0],
		[0, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 1, 1, 1, 1, 1],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 2, 0, 0, 0],
	];
	test("should solve a 6x6 maze", () => {
		expect(findShortestPathLength(sixBySix, [1, 1], [2, 5])).toEqual(7);
	});

	const eightByEight = [
		[0, 0, 1, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 0, 0, 1],
		[0, 0, 0, 0, 0, 1, 0, 0],
		[0, 0, 0, 1, 0, 1, 1, 0],
		[0, 0, 0, 0, 0, 0, 1, 0],
		[0, 2, 0, 0, 0, 0, 1, 0],
		[0, 0, 0, 0, 0, 0, 1, 2],
	];
	test("should solve a 8x8 maze", () => {
		expect(findShortestPathLength(eightByEight, [1, 7], [7, 7])).toEqual(16);
	});

	// const fifteenByFifteen = [
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
	// 	[0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
	// 	[0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
	// 	[0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
	// 	[0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0],
	// 	[0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
	// 	[0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
	// 	[0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
	// 	[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
	// 	[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// ];
	// test("should solve a 15x15 maze", () => {
	// 	expect(findShortestPathLength(fifteenByFifteen, [1, 1], [8, 8])).toEqual(
	// 		78
	// 	);
	// });
});

// // I care far less if you solve these
// // nonetheless, if you're having fun, solve some of the edge cases too!
// // just remove the .skip from describe.skip
describe.skip("pathfinding – edge cases", function () {
	const byEachOther = [
		[0, 0, 0, 0, 0],
		[0, 2, 2, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 1, 1, 1, 1],
		[0, 0, 0, 0, 0],
	];
	test("should solve the maze if they're next to each other", () => {
		expect(findShortestPathLength(byEachOther, [1, 1], [2, 1])).toEqual(1);
	});

	const impossible = [
		[0, 0, 0, 0, 0],
		[0, 2, 0, 0, 0],
		[0, 0, 1, 1, 1],
		[1, 1, 1, 0, 0],
		[0, 0, 0, 0, 2],
	];
	test("should return -1 when there's no possible path", () => {
		expect(findShortestPathLength(impossible, [1, 1], [4, 4])).toEqual(-1);
	});
});
