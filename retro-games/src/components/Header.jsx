import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <h1>🎮 Ретро Игры</h1>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/register">Регистрация</Link>
        <Link to="/create" className="hover:underline">Создать свою игру</Link>

      </nav>
    </header>
  )
}
