import React, { useEffect, useRef, useState } from "react";

const PingPong = () => {
  const canvasRef = useRef(null);

  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Позиции и параметры мяча и ракеток
  let x, y, dx, dy;
  let leftPaddleY, rightPaddleY;
  let upPressed = false;
  let downPressed = false;
  let wPressed = false;
  let sPressed = false;
  let animationId;

  const ballRadius = 10;
  const paddleHeight = 75;
  const paddleWidth = 10;

  // Инициализация игры
  const initGame = (canvas) => {
    x = canvas.width / 2;
    y = canvas.height / 2;
    dx = 2 * (Math.random() > 0.5 ? 1 : -1);
    dy = 2 * (Math.random() > 0.5 ? 1 : -1);
    leftPaddleY = (canvas.height - paddleHeight) / 2;
    rightPaddleY = (canvas.height - paddleHeight) / 2;
  };

  // Сброс мяча после гола, direction - направление мяча (1 или -1)
  const resetBall = (direction, canvas) => {
    x = canvas.width / 2;
    y = canvas.height / 2;
    dx = 2 * direction;
    dy = 2 * (Math.random() > 0.5 ? 1 : -1);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    initGame(canvas);

    const keyDownHandler = (e) => {
      if (e.key === "ArrowUp") upPressed = true;
      else if (e.key === "ArrowDown") downPressed = true;
      else if (e.key === "w") wPressed = true;
      else if (e.key === "s") sPressed = true;
    };

    const keyUpHandler = (e) => {
      if (e.key === "ArrowUp") upPressed = false;
      else if (e.key === "ArrowDown") downPressed = false;
      else if (e.key === "w") wPressed = false;
      else if (e.key === "s") sPressed = false;
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    };

    const drawPaddles = () => {
      ctx.beginPath();
      ctx.rect(0, leftPaddleY, paddleWidth, paddleHeight);
      ctx.rect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    };

    const drawScores = () => {
      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(`Игрок 1: ${leftScore}`, 20, 25);
      ctx.fillText(`Игрок 2: ${rightScore}`, canvas.width - 120, 25);
    };

    const movePaddles = () => {
      if (upPressed && rightPaddleY > 0) rightPaddleY -= 7;
      if (downPressed && rightPaddleY < canvas.height - paddleHeight) rightPaddleY += 7;
      if (wPressed && leftPaddleY > 0) leftPaddleY -= 7;
      if (sPressed && leftPaddleY < canvas.height - paddleHeight) leftPaddleY += 7;
    };

    const collisionDetection = () => {
      // Мяч вышел за правую границу - очко левому игроку
      if (x + dx > canvas.width - ballRadius) {
        setLeftScore((prev) => prev + 1);
        resetBall(-1, canvas);
        return;
      }

      // Мяч вышел за левую границу - очко правому игроку
      if (x + dx < ballRadius) {
        setRightScore((prev) => prev + 1);
        resetBall(1, canvas);
        return;
      }

      // Отскок от верхней и нижней стенок
      if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        dy = -dy;
      }

      // Отскок от ракеток
      if (
        (x + dx > canvas.width - ballRadius - paddleWidth &&
          y > rightPaddleY &&
          y < rightPaddleY + paddleHeight) ||
        (x + dx < ballRadius + paddleWidth &&
          y > leftPaddleY &&
          y < leftPaddleY + paddleHeight)
      ) {
        dx = -dx;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawPaddles();
      drawScores();
      collisionDetection();
      movePaddles();

      x += dx;
      y += dy;

      animationId = requestAnimationFrame(draw);
    };

    if (isPlaying) {
      draw();
    } else {
      // Если игра на паузе, останавливаем анимацию
      cancelAnimationFrame(animationId);
    }

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [isPlaying, leftScore, rightScore]);

  return (
    <div style={{ textAlign: "center", backgroundColor: "#222", padding: 20, color: "white", userSelect: "none" }}>
      <h1>🏓 Ping Pong</h1>
      <p>Управление: W/S — левый игрок, стрелки ↑/↓ — правый игрок</p>
      <button
        onClick={() => setIsPlaying((prev) => !prev)}
        style={{ padding: "10px 20px", marginBottom: 15, cursor: "pointer" }}
      >
        {isPlaying ? "Пауза" : "Начать игру"}
      </button>
      <canvas
        ref={canvasRef}
        width={480}
        height={320}
        style={{ backgroundColor: "#000", display: "block", margin: "auto", border: "2px solid #0095DD" }}
      />
    </div>
  );
};

export default PingPong;
