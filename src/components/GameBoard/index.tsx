"use client";

import useSnakeStore from "@/store/snakeStore";
import React, { useEffect, useRef } from "react";

const GameBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { initializeBoard, manageSnakeMovement } = useSnakeStore();

  useEffect(() => {
    if (canvasRef.current) {
      initializeBoard(canvasRef.current.getContext("2d"));
    }
  }, [initializeBoard]);

  useEffect(() => {
    window.addEventListener("keydown", manageSnakeMovement);

    return () => {
      window.removeEventListener("keydown", manageSnakeMovement);
    };
  }, [manageSnakeMovement]);

  return (
    <div className="p-4">
      <canvas
        ref={canvasRef}
        width={1000}
        height={1000}
        className=" bg-slate-200"
      ></canvas>
    </div>
  );
};

export default GameBoard;
