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
  food: ISnake | null;
  intervalId?: number;
  direction: IDirection;
  changedDirDuringInterval: boolean;
  score: number;
}

interface ISnakeFunctions {
  initializeBoard: (ctx: CanvasRenderingContext2D | null) => void;
  clearBoard: () => void;
  startGame: () => void;
  changeSnakeDirection: (e: KeyboardEvent) => void;
  moveSnake: () => void;
  drawSnake: () => void;
  stopGame: () => void;
  collisionCheck: () => boolean;
  generateSnakeFood: () => void;
  clearSnakeFood: () => void;
  drawSnakeFood: () => void;
}

const CANVAS_HEIGHT = 1000;
const CANVAS_WIDTH = 1000;
const SNAKE_INTERVAL = 20;
const SNAKE_BLOCK_SIZE = 19;

const initialState: Omit<ISnakeState, "canvasCtx"> = {
  playing: false,
  snake: [
    { x: 0, y: 0 },
    { x: 0, y: 20 },
    { x: 0, y: 40 },
    { x: 0, y: 60 },
    { x: 0, y: 80 },
    { x: 0, y: 100 },
    { x: 0, y: 120 },
    { x: 0, y: 140 },
    { x: 0, y: 160 },
  ],
  direction: "right",
  changedDirDuringInterval: false,
  food: null,
  score: 0,
};

const useSnakeStore = create<ISnakeState & ISnakeFunctions>((set, get) => ({
  canvasCtx: null,
  ...initialState,

  initializeBoard: (ctx) =>
    set({
      canvasCtx: ctx,
    }),

  clearBoard: () => {
    const ctx = get().canvasCtx;
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  },

  startGame: () => {
    get().drawSnake();

    let intervalId = window.setInterval(function () {
      get().moveSnake();
      set({ changedDirDuringInterval: false });
    }, 400);

    return set({ playing: true, intervalId });
  },

  stopGame: () => {
    if (get().intervalId != null) {
      clearInterval(get().intervalId);
    }

    get().clearBoard();

    return set({ ...initialState });
  },

  moveSnake: () => {
    const snakeCopy = [...get().snake];
    const snakeHead = snakeCopy[0];
    const dir = get().direction;

    snakeCopy.pop();

    switch (dir) {
      case "down":
        snakeCopy.unshift({ ...snakeHead, y: snakeHead.y + SNAKE_INTERVAL });
        break;
      case "up":
        snakeCopy.unshift({ ...snakeHead, y: snakeHead.y - SNAKE_INTERVAL });
        break;
      case "left":
        snakeCopy.unshift({ ...snakeHead, x: snakeHead.x - SNAKE_INTERVAL });
        break;
      case "right":
        snakeCopy.unshift({ ...snakeHead, x: snakeHead.x + SNAKE_INTERVAL });
        break;
      default:
        break;
    }

    set({ snake: snakeCopy });
    get().drawSnake();
  },

  collisionCheck: () => {
    let collision = false;
    const snake = [...get().snake];
    const head = snake[0];

    const gameOver = () => {
      alert("game over");
      get().stopGame();
      collision = true;
    };

    if (
      head.x > CANVAS_WIDTH - SNAKE_INTERVAL ||
      head.x < 0 ||
      head.y > CANVAS_HEIGHT - SNAKE_INTERVAL ||
      head.y < 0
    ) {
      gameOver();
    }

    for (let i = 1; i < snake.length; i++) {
      const node = snake[i];
      if (node.x == head.x && node.y == head.y) {
        gameOver();
      }
    }

    return collision;
  },

  drawSnake: () => {
    const ctx = get().canvasCtx;
    if (!ctx) return;

    if (get().collisionCheck()) return;

    get().clearBoard();

    ctx.fillStyle = "green";

    get().snake.forEach((s) => {
      ctx.fillRect(s.x, s.y, SNAKE_BLOCK_SIZE, SNAKE_BLOCK_SIZE);
    });
  },

  changeSnakeDirection: (e) => {
    const ctx = get().canvasCtx;

    if (!ctx || !get().playing || get().changedDirDuringInterval) return;
    let dir: IDirection = get().direction;

    function setDirChange(d: IDirection) {
      set({ direction: d, changedDirDuringInterval: true });
    }

    if (e.key == "a" || e.key == "ArrowLeft") {
      if (dir == "right") return;

      setDirChange("left");
    }
    if (e.key == "d" || e.key == "ArrowRight") {
      if (dir == "left") return;

      setDirChange("right");
    }
    if (e.key == "w" || e.key == "ArrowUp") {
      if (dir == "down") return;

      setDirChange("up");
    }
    if (e.key == "s" || e.key == "ArrowDown") {
      if (dir == "up") return;

      setDirChange("down");
    }
  },

  //food
  generateSnakeFood: () => {
    const x =
      Math.floor((Math.random() * CANVAS_WIDTH) / SNAKE_INTERVAL) *
      SNAKE_INTERVAL;
    const y =
      Math.floor((Math.random() * CANVAS_HEIGHT) / SNAKE_INTERVAL) *
      SNAKE_INTERVAL;

    get().clearSnakeFood();
    set({ food: { x, y } });
    get().drawSnakeFood();
  },

  clearSnakeFood: () => {
    const ctx = get().canvasCtx;
    const lastFood = get().food;
    if (!ctx) return;

    if (lastFood) {
      ctx.clearRect(lastFood.x, lastFood.y, SNAKE_BLOCK_SIZE, SNAKE_BLOCK_SIZE);
    }
  },

  drawSnakeFood: () => {
    const ctx = get().canvasCtx;
    if (!ctx) return;
    const food = get().food;

    ctx.fillStyle = "red";

    if (food) {
      ctx.fillRect(food.x, food.y, SNAKE_BLOCK_SIZE, SNAKE_BLOCK_SIZE);
    }
  },
}));

export default useSnakeStore;
