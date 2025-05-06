import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import styles from './App.module.css'

function App() {
  return (
    <div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>
          Главная
        </Link>
        <Link to="/about" className={styles.navLink}>
          О приложении
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
