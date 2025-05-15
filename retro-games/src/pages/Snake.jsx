import React, { useState, useEffect } from 'react'

const BOARD_SIZE = 20
const getRandomCoord = () => [
  Math.floor(Math.random() * BOARD_SIZE),
  Math.floor(Math.random() * BOARD_SIZE)
]

export default function SnakeGame() {
  const [snake, setSnake] = useState([[0, 0]])
  const [food, setFood] = useState(getRandomCoord())
  const [direction, setDirection] = useState([0, 1])

  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case 'ArrowUp': setDirection([-1, 0]); break
        case 'ArrowDown': setDirection([1, 0]); break
        case 'ArrowLeft': setDirection([0, -1]); break
        case 'ArrowRight': setDirection([0, 1]); break
      }
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    const move = setInterval(() => {
      setSnake(s => {
        const newHead = [
          (s[0][0] + direction[0] + BOARD_SIZE) % BOARD_SIZE,
          (s[0][1] + direction[1] + BOARD_SIZE) % BOARD_SIZE
        ]
        const newSnake = [newHead, ...s]
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood(getRandomCoord())
          return newSnake
        } else {
          newSnake.pop()
          return newSnake
        }
      })
    }, 200)
    return () => clearInterval(move)
  }, [direction, food])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)` }}>
      {[...Array(BOARD_SIZE * BOARD_SIZE)].map((_, i) => {
        const x = Math.floor(i / BOARD_SIZE)
        const y = i % BOARD_SIZE
        const isSnake = snake.some(([sx, sy]) => sx === x && sy === y)
        const isFood = food[0] === x && food[1] === y
        return (
          <div key={i} style={{
            width: 20, height: 20, border: '1px solid #222',
            backgroundColor: isSnake ? 'lime' : isFood ? 'red' : 'black'
          }}></div>
        )
      })}
    </div>
  )
}
