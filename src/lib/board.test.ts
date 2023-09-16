import { describe, expect, test } from "vitest";
import { flip_cell, gen_board, run_simulation_step } from "./board";

describe("testing board functions", () => {
  test.each([
    [1, 2, [[false, false]]],
    [
      2,
      3,
      [
        [false, false, false],
        [false, false, false],
      ],
    ],
    [
      4,
      4,
      [
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
      ],
    ],
    [
      4,
      2,
      [
        [false, false],
        [false, false],
        [false, false],
        [false, false],
      ],
    ],
    [0, 1, []],
    [1, 0, [[]]],
  ])(
    "test gen_board on size (%i, %i)",
    (row_size, col_size, expected_board) => {
      const board = gen_board(row_size, col_size);
      expect(board).toStrictEqual(expected_board);
    }
  );

  test.each([
    [
      1,
      1,
      [
        [false, false],
        [false, false],
      ],
      [
        [false, false],
        [false, true],
      ],
    ],
    [
      0,
      1,
      [
        [false, false],
        [false, true],
      ],
      [
        [false, true],
        [false, true],
      ],
    ],
  ])(
    "test flip_cell on cell (%i, %i)",
    (row_index, col_index, board, expected_board) => {
      const new_board = flip_cell(board, row_index, col_index);
      expect(new_board).toStrictEqual(expected_board);
    }
  );

  test.each([
    [[[true]], [[false]]],
    [
      [
        [false, true],
        [true, false],
      ],
      [
        [false, false],
        [false, false],
      ],
    ],
    [
      [
        [false, true, false],
        [true, false, true],
        [true, true, false],
        [false, false, true],
      ],
      [
        [false, true, false],
        [true, false, true],
        [true, false, true],
        [false, true, false],
      ],
    ],
  ])("test simulation step", async (board, expected_board) => {
    const simulated_step = await run_simulation_step(board);
    expect(simulated_step).toStrictEqual(expected_board);
  });
});
