import React, { useState } from 'react'
import axios from 'axios'
import '../../styles/creategame.css'; 

const apikey = import.meta.env.VITE_GENIMI_API_KEY

export default function CreateGame() {
  const [description, setDescription] = useState('')
  const [codeResult, setCodeResult] = useState('')
  const [error, setError] = useState('')

  const generateGameCode = async (e) => {
    e.preventDefault()
    setError('')
    setCodeResult('')

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apikey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Сгенерируй простую игру на HTML/CSS/JS по описанию: ${description}. Покажи только код.`,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const code = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Нет ответа от модели.'
      setCodeResult(code)
    } catch (err) {
      setError('Ошибка генерации: ' + err.message)
    }
  }

  return (
    <div className="create-game-container">
      <h2>🎮 Создай свою игру</h2>
      <form onSubmit={generateGameCode} className="create-game-form">
        <textarea
          placeholder="Опиши игру (например: арканоид, тетрис, змейка...)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Сгенерировать игру</button>
      </form>

      {codeResult && (
        <div className="code-result">
          <h3>💡 Результат</h3>
          <pre>{codeResult}</pre>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  )
}
