import { create } from "zustand";

type IDirection = "left" | "right" | "up" | "down";

interface ISnake {
  x: number;
  y: number;
}

interface ISnakeState {
  canvasCtx: CanvasRenderingContext2D | null;
  playing: boolean;
  snake: ISnake[];
}

interface ISnakeFunctions {
  initializeBoard: (ctx: CanvasRenderingContext2D | null) => void;
  startGame: () => void;
  manageSnakeMovement: (e: KeyboardEvent) => void;
  drawSnake: () => void;
}

const CANVAS_HEIGHT = 1000;
const CANVAS_WIDTH = 1000;
const SNAKE_INTERVAL = 20;
const SNAKE_BLOCK_SIZE = 19;

const useSnakeStore = create<ISnakeState & ISnakeFunctions>((set, get) => ({
  canvasCtx: null,
  playing: false,
  snake: [
    { x: 10, y: 10 },
    { x: 10, y: 30 },
    { x: 10, y: 50 },
    { x: 10, y: 70 },
  ],

  initializeBoard: (ctx) =>
    set({
      canvasCtx: ctx,
    }),

  startGame: () => {
    get().drawSnake();

    return set({ playing: true });
  },

  drawSnake: () => {
    const ctx = get().canvasCtx;
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "green";

    get().snake.forEach((s) => {
      ctx.fillRect(s.x, s.y, SNAKE_BLOCK_SIZE, SNAKE_BLOCK_SIZE);
    });
  },

  manageSnakeMovement: (e) => {
    const ctx = get().canvasCtx;
    let snakeCopy = [...get().snake];
    if (!ctx || !get().playing) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (e.key == "a" || e.key == "ArrowLeft") {
      console.log("left");
    }
    if (e.key == "d" || e.key == "ArrowRight") {
      const newHead = { x: snakeCopy[0].x + SNAKE_INTERVAL, y: snakeCopy[0].y };

      snakeCopy.unshift(newHead);
      snakeCopy.pop();
    }
    if (e.key == "w" || e.key == "ArrowUp") {
      console.log("up");
    }
    if (e.key == "s" || e.key == "ArrowDown") {
      console.log("down");
    }

    set({ snake: snakeCopy });
    get().drawSnake();
  },
}));

export default useSnakeStore;
