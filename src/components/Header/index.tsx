"use client";

import useSnakeStore from "@/store/snakeStore";
import React from "react";

const Header = () => {
  const { startGame } = useSnakeStore();

  return (
    <div className="w-full shadow p-4 flex justify-between items-center">
      <h1 className="text-3xl">SNAKE</h1>
      <p>score</p>
      <button onClick={startGame}>start</button>
    </div>
  );
};

export default Header;
