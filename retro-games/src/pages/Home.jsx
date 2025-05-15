import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const games = [
  {
    name: "Тетрис",
    icon: "🧱",
    path: "/tetris",
    description: "Классический Тетрис с падающими блоками",
  },
  {
    name: "Змейка",
    icon: "🐍",
    path: "/snake",
    description: "Управляй змейкой и собирай яблоки",
  },
  {
    name: "Гонки",
    icon: "🏎️",
    path: "/race",
    description: "Управляй машиной и избегай препятствий",
  },
  {
    name: "Пинпонг",
    icon: "🏓",
    path: "/pong",
    description: "Классический пинг-понг для двоих игроков",
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState(games);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  // Для плавного появления карточек
  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Фильтрация игр по названию
  useEffect(() => {
    const filtered = games.filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGames(filtered);
  }, [searchTerm]);

  // Выбрать случайную игру
  const playRandomGame = () => {
    const randomGame = games[Math.floor(Math.random() * games.length)];
    navigate(randomGame.path);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f2027, #203a43, #2c5364)", 
        color: "white",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "5px", userSelect: "none" }}>
        🎮 Игры
      </h1>
      <p
        style={{
          marginTop: 0,
          marginBottom: "20px",
          fontSize: "1.2rem",
          color: "#ccc",
          userSelect: "none",
        }}
      >
        Выбери игру и наслаждайся!
      </p>

      <input
        type="text"
        placeholder="Поиск игры..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px 15px",
          borderRadius: "8px",
          border: "none",
          width: "300px",
          maxWidth: "90vw",
          marginBottom: "30px",
          fontSize: "1rem",
          outline: "none",
          boxShadow: "0 0 10px rgba(255,255,255,0.2)",
          backgroundColor: "#1e2a38",
          color: "white",
          userSelect: "text",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "900px",
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        {filteredGames.length ? (
          filteredGames.map((game, i) => (
            <Link
              to={game.path}
              key={i}
              className="game-card"
              style={{
                backgroundColor: "#1e2a38",
                padding: "20px",
                borderRadius: "12px",
                boxShadow:
                  "0 4px 15px rgba(0, 0, 0, 0.3), inset 0 0 10px #0095DD",
                color: "white",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                userSelect: "none",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px #0095DD, inset 0 0 15px #00bfff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(0, 0, 0, 0.3), inset 0 0 10px #0095DD";
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "12px" }}>
                {game.icon}
              </div>
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "1.2rem",
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                {game.name}
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#a0cfff",
                  textAlign: "center",
                  userSelect: "text",
                }}
              >
                {game.description}
              </div>
            </Link>
          ))
        ) : (
          <div
            style={{
              gridColumn: "1/-1",
              color: "#999",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            Игры не найдены.
          </div>
        )}
      </div>

      <button
        onClick={playRandomGame}
        style={{
          marginTop: "40px",
          backgroundColor: "#0095DD",
          border: "none",
          padding: "12px 30px",
          borderRadius: "30px",
          color: "white",
          fontSize: "1.1rem",
          cursor: "pointer",
          boxShadow: "0 0 15px #00bfff",
          userSelect: "none",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00bfff")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0095DD")}
      >
        🎲 Случайная игра
      </button>

      <button
        onClick={() => alert("Функция генерации игры в разработке!")}
        style={{
          marginTop: "20px",
          backgroundColor: "#22bb55",
          border: "none",
          padding: "12px 30px",
          borderRadius: "30px",
          color: "white",
          fontSize: "1.1rem",
          cursor: "pointer",
          boxShadow: "0 0 15px #33cc77",
          userSelect: "none",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#33cc77")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#22bb55")}
        title="Скоро здесь будет генератор игр на базе ИИ"
      >
        ✨ Создать свою игру
      </button>

      <footer
        style={{
          marginTop: "50px",
          fontSize: "0.8rem",
          color: "#555",
          userSelect: "none",
        }}
      >
        © 2025 Игровая Платформа. Все права защищены.
      </footer>
    </div>
  );
}
