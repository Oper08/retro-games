import React, { useState, useEffect, useRef } from "react";

const rows = 20;
const cols = 10;

const SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  L: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
};

const getRandomShape = () => {
  const keys = Object.keys(SHAPES);
  const shape = SHAPES[keys[Math.floor(Math.random() * keys.length)]];
  return shape;
};

const createEmptyGrid = () => Array.from({ length: rows }, () => Array(cols).fill(0));

const Tetris = () => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [shape, setShape] = useState(getRandomShape());
  const [position, setPosition] = useState({ row: 0, col: 3 });
  const intervalRef = useRef(null);

  const resetGame = () => {
    setGrid(createEmptyGrid());
    setScore(0);
    setGameOver(false);
    setShape(getRandomShape());
    setPosition({ row: 0, col: 3 });
    setRunning(true);
  };

  const placeShape = (grid, shape, pos, value) => {
    const newGrid = grid.map((row) => [...row]);
    shape.forEach((r, y) => {
      r.forEach((cell, x) => {
        if (cell && pos.row + y >= 0) {
          newGrid[pos.row + y][pos.col + x] = value;
        }
      });
    });
    return newGrid;
  };

  const isValidMove = (grid, shape, pos) => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const newY = pos.row + y;
          const newX = pos.col + x;
          if (
            newY >= rows ||
            newX < 0 ||
            newX >= cols ||
            (newY >= 0 && grid[newY][newX])
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const mergeShape = () => {
    const newGrid = placeShape(grid, shape, position, 1);
    const cleared = clearLines(newGrid);
    setGrid(cleared);
    setShape(getRandomShape());
    setPosition({ row: 0, col: 3 });

    if (!isValidMove(cleared, shape, { row: 0, col: 3 })) {
      setGameOver(true);
      setRunning(false);
    }
  };

  const clearLines = (grid) => {
    const newGrid = grid.filter((row) => row.some((cell) => cell === 0));
    const linesCleared = rows - newGrid.length;
    if (linesCleared > 0) {
      const emptyRows = Array.from({ length: linesCleared }, () =>
        Array(cols).fill(0)
      );
      setScore((prev) => prev + linesCleared * 100);
      return [...emptyRows, ...newGrid];
    }
    return grid;
  };

  const move = (dir) => {
    if (!running || gameOver) return;
    const newPos =
      dir === "down"
        ? { ...position, row: position.row + 1 }
        : dir === "left"
        ? { ...position, col: position.col - 1 }
        : { ...position, col: position.col + 1 };

    if (isValidMove(grid, shape, newPos)) {
      setPosition(newPos);
    } else if (dir === "down") {
      mergeShape();
    }
  };

  const rotate = () => {
    const rotated = shape[0].map((_, i) => shape.map((row) => row[i])).reverse();
    if (isValidMove(grid, rotated, position)) {
      setShape(rotated);
    }
  };

  const update = () => move("down");

  useEffect(() => {
    if (running && !gameOver) {
      intervalRef.current = setInterval(update, 500);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, gameOver, shape, position]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") move("left");
      if (e.key === "ArrowRight") move("right");
      if (e.key === "ArrowDown") move("down");
      if (e.key === "ArrowUp" || e.key === "w") rotate();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [shape, position, running]);

  const displayGrid = placeShape(grid, shape, position, 2);

  return (
    <div style={{ textAlign: "center", color: "white", fontFamily: "monospace" }}>
      <h1>Тетрис</h1>
      <p>Очки: {score}</p>
      {gameOver && <p style={{ color: "red" }}>Игра окончена</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 24px)`,
          gap: "1px",
          margin: "auto",
          width: cols * 24,
          background: "#111",
        }}
      >
        {displayGrid.flat().map((cell, i) => (
          <div
            key={i}
            style={{
              width: 24,
              height: 24,
              backgroundColor: cell === 0 ? "#222" : cell === 1 ? "#0ff" : "#fff",
              border: "1px solid #000",
            }}
          />
        ))}
      </div>
      <div style={{ marginTop: "1rem" }}>
        {!running && !gameOver && (
          <button onClick={() => setRunning(true)}>Начать</button>
        )}
        <button onClick={resetGame} style={{ marginLeft: "10px" }}>
          Рестарт
        </button>
      </div>
    </div>
  );
};

export default Tetris;
