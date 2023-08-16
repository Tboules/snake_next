"use client";

import useSnakeStore from "@/store/snakeStore";
import React from "react";

const Header = () => {
  const { startGame, stopGame, playing, generateSnakeFood, score } =
    useSnakeStore();

  return (
    <div className="w-full shadow p-4 flex justify-between items-center">
      <h1 className="text-3xl">SNAKE</h1>
      <p>score: {score}</p>
      {playing ? (
        <button onClick={stopGame}>stop</button>
      ) : (
        <button onClick={startGame}>start</button>
      )}
    </div>
  );
};

export default Header;
