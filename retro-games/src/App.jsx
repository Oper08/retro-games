import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Snake from './pages/Snake.jsx'
import PingPong from './pages/PingPong.jsx'
import Tetris from './pages/Tetris.jsx'
import Race from './pages/Race.jsx'
import CreateGame from './pages/CreateGame.jsx'


import './style.css'



<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/register" element={<Register />} />
  <Route path="/snake" element={<Snake />} />
</Routes>

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen font-mono">
      <Header />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/snake" element={<Snake />} />
          <Route path="/tetris" element={<Tetris />} /> 
           <Route path='/pong' element={<PingPong />} />
         <Route path='/Race' element={<Race />} />
         <Route path="/create" element={<CreateGame />} />

        </Routes>
      </main>
    </div>
  )
}
