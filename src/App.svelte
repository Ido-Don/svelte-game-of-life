<script lang="ts">
  import { flip_cell, gen_board, run_simulation_step } from "./lib/board";
  let game_running = false;
  let BOARD_WIDTH: number;
  let BOARD_HEIGHT: number;
  const calculate_cells_with_gap = (
    size: number,
    gap_size: number,
    cell_size: number
  ) => {
    let result = Math.floor((size + gap_size) / (gap_size + cell_size));
    if ((size + gap_size) % (gap_size + cell_size) === 0) {
      return result - 1;
    }
    return result;
  };
  const cell_size = 30;
  $: cells_in_width = calculate_cells_with_gap(BOARD_WIDTH, 3, cell_size);
  $: cells_in_height = calculate_cells_with_gap(BOARD_HEIGHT, 3, cell_size);
  $: board = gen_board(cells_in_height, cells_in_width);
  const run_game = async () => {
    if (game_running) {
      board = await run_simulation_step(board);
      setTimeout(run_game, 200);
    }
  };

  $: if (game_running) {
    run_game();
  }

  const user_flip_cell = (row_index: number, col_index: number) => {
    if (!game_running) {
      board = flip_cell(board, row_index, col_index);
    }
  };
</script>

<main>
  <form>
    <input bind:checked={game_running} type="checkbox" />
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>simulate lifes</label>
  </form>
  <div
    id="board"
    style="--size: {cell_size}px"
    bind:clientWidth={BOARD_WIDTH}
    bind:clientHeight={BOARD_HEIGHT}
  >
    {#each board as row, row_index}
      {#each row as cell, col_index}
        {#if cell}
          <button
            on:mousedown={() => {
              user_flip_cell(row_index, col_index);
            }}
            on:mouseenter={(event) => {
              const MOUSE_CLICKED = 1;
              if (event.buttons === MOUSE_CLICKED) {
                user_flip_cell(row_index, col_index);
              }
            }}
            class="cell alive"
          />
        {:else}
          <button
            on:mousedown={() => {
              user_flip_cell(row_index, col_index);
            }}
            on:mouseenter={(event) => {
              const MOUSE_NOT_CLICKED = 0;
              if (event.buttons !== MOUSE_NOT_CLICKED) {
                user_flip_cell(row_index, col_index);
              }
            }}
            class="cell dead"
          />
        {/if}
      {/each}
    {/each}
  </div>
</main>

<style>
  .cell {
    width: var(--size);
    height: var(--size);
    border: 0;
    margin: 0;
    padding: 0;
  }
  .dead {
    background-color: black;
  }
  .alive {
    background-color: white;
  }
  #board {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 3px;
    flex-grow: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: black;
  }
  form {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
