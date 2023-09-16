export const gen_board = (row_size: number, col_size: number) => {
	let board = [];
	for (let _ = 0; _ < row_size; _++) {
		board.push([...Array<boolean>(col_size).fill(false)]);
	}
	return board;
};

export const flip_cell = (board: Array<Array<boolean>>, row_i: number, col_i: number) => {
	const new_board = board.map((row, row_index) => {
		if (row_index === row_i) {
			return row.map((cell, col_index) => {
				if (col_index === col_i) {
					return !cell;
				} else {
					return cell;
				}
			});
		} else {
			return row;
		}
	});
	return new_board;
};

const get_neighber_count = (board: Array<Array<boolean>>, row: number, col: number) => {
	const numRows = board.length;
	const numCols = board[0].length;
	let neighbors_count = 0;

	const relativeCoords = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1]
	];

	for (const [dr, dc] of relativeCoords) {
		const newRow = row + dr;
		const newCol = col + dc;

		// Check if the neighbor is within the bounds of the grid
		if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
			if (board[newRow][newCol] === true) {
				neighbors_count++;
			}
		}
	}
	return neighbors_count;
};

export const run_simulation_step = async (board: Array<Array<boolean>>) => {
	return board.map((row, row_index) =>
		row.map((cell, col_index) => {
			let neighbor_count = get_neighber_count(board, row_index, col_index);
			if (cell) {
				if (neighbor_count <= 1 || neighbor_count >= 4) {
					return false;
				} else if (neighbor_count === 2 || neighbor_count === 3) {
					return true;
				}
			} else if (!cell) {
				if (neighbor_count === 3) {
					return true;
				}
			}
			return false;
		})
	);
};
