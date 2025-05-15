import React, { useState, useEffect, useRef } from "react";

const gridHeight = 10;
const gridWidth = 30;  // Большая трасса
const initialCar = { row: 5, col: 0 };
const obstacleCount = 50;

const RaceHorizontalFixed = () => {
  const [car, setCar] = useState(initialCar);
  const [obstacles, setObstacles] = useState(new Set());
  const [winner, setWinner] = useState(null);
  const intervalRef = useRef(null);
  const trackRef = useRef(null);

  const generateObstacles = () => {
    const obs = new Set();
    while (obs.size < obstacleCount) {
      const row = Math.floor(Math.random() * gridHeight);
      const col = Math.floor(Math.random() * gridWidth);
      if (!(row === initialCar.row && col === initialCar.col) && col !== gridWidth - 1) {
        obs.add(`${row}-${col}`);
      }
    }
    return obs;
  };

  useEffect(() => {
    setObstacles(generateObstacles());
  }, []);

  useEffect(() => {
    if (winner) return;

    const handleKeyDown = (e) => {
      setCar((prev) => {
        let newRow = prev.row;
        if (e.key === "ArrowUp" && prev.row > 0) newRow--;
        if (e.key === "ArrowDown" && prev.row < gridHeight - 1) newRow++;

        if (obstacles.has(`${newRow}-${prev.col}`)) {
          setWinner("💥 Врезался! Игра окончена.");
          clearInterval(intervalRef.current);
          return prev;
        }

        return { ...prev, row: newRow };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [winner, obstacles]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (winner) return;

      setCar((prev) => {
        const newCol = prev.col + 1;
        if (newCol >= gridWidth) {
          setWinner("🏆 Победа! Ты доехал до финиша!");
          clearInterval(intervalRef.current);
          return prev;
        }

        if (obstacles.has(`${prev.row}-${newCol}`)) {
          setWinner("💥 Врезался! Игра окончена.");
          clearInterval(intervalRef.current);
          return prev;
        }

        return { ...prev, col: newCol };
      });
    }, 500);

    return () => clearInterval(intervalRef.current);
  }, [winner, obstacles]);

  // Автоскролл за машиной
  useEffect(() => {
    if (!trackRef.current) return;
    const container = trackRef.current;
    // Размер одной клетки
    const cellWidth = 40;
    // Центрируем машину по горизонтали (примерно)
    // Желательно, чтобы машина была в центре или немного левее центра видимой области
    const visibleWidth = container.clientWidth;
    const targetScrollLeft = car.col * cellWidth - visibleWidth / 2 + cellWidth / 2;
    container.scrollTo({
      left: targetScrollLeft > 0 ? targetScrollLeft : 0,
      behavior: "smooth",
    });
  }, [car]);

  const restartGame = () => {
    setCar(initialCar);
    setWinner(null);
    setObstacles(generateObstacles());
  };

  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < gridHeight; row++) {
      for (let col = 0; col < gridWidth; col++) {
        const key = `${row}-${col}`;
        let background = "#222";
        if (car.row === row && car.col === col) background = "#007bff"; // синий яркий
        else if (obstacles.has(key)) background = "#b54545"; // красный темный
        else if (col === gridWidth - 1) background = "#666"; // финиш серый
        else if (col === 0) background = "#444"; // старт темный серый

        grid.push(
          <div
            key={key}
            style={{
              width: 40,
              height: 40,
              backgroundColor: background,
              border: "1px solid #111",
              transition: "background-color 0.3s ease",
              boxSizing: "border-box",
              borderRadius: 4,
            }}
          />
        );
      }
    }
    return grid;
  };

  return (
    <div
      style={{
        textAlign: "center",
        color: "white",
        background:
          "linear-gradient(135deg, #0d0d0d, #1a1a1a)",
        minHeight: "100vh",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: 5 }}>🏁 Горизонтальная гонка с большой трассой</h1>
      <p style={{ marginTop: 0, marginBottom: 20, fontSize: 18 }}>
        🎮 Управление: стрелки ↑ ↓
      </p>

      {winner && (
        <h2
          style={{
            color: winner.includes("Победа") ? "#00ff00" : "#ff4444",
            marginBottom: 20,
          }}
        >
          {winner}
        </h2>
      )}

      <button
        onClick={restartGame}
        style={{
          padding: "12px 25px",
          fontSize: 16,
          backgroundColor: "#007bff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          color: "white",
          fontWeight: "600",
          boxShadow: "0 4px 10px rgba(0,123,255,0.3)",
          marginBottom: 20,
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        Рестарт
      </button>

      <div
        ref={trackRef}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridWidth}, 40px)`,
          width: "100%",
          maxWidth: 800,
          margin: "auto",
          overflowX: "auto",
          borderRadius: 8,
          boxShadow: "0 0 20px rgba(0,0,0,0.7)",
          backgroundColor: "#111",
          padding: 10,
        }}
      >
        {renderGrid()}
      </div>
    </div>
  );
};

export default RaceHorizontalFixed;
