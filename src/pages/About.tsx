import { Link } from 'react-router-dom'
import '../App.css'

const About: React.FC = () => {
  return (
    <div className="App">
      <h1>О приложении Zzzap</h1>
      <p>
        Zzzap — это простое и удобное приложение для управления задачами,
        созданное для практики React и TypeScript.
      </p>
      <h2>Функционал</h2>
      <ul>
        <li>Добавление, редактирование и удаление задач</li>
        <li>Установка приоритетов (низкий, средний, высокий)</li>
        <li>Фильтрация задач по статусу и приоритету</li>
        <li>Сортировка задач по дате создания</li>
        <li>Поиск задач по тексту</li>
        <li>Переключение между светлой и тёмной темой</li>
        <li>Анимации и уведомления для улучшения UX</li>
      </ul>
      <h2>Технологии</h2>
      <ul>
        <li>React и TypeScript</li>
        <li>CSS Modules для стилей</li>
        <li>Framer Motion для анимаций</li>
        <li>React Toastify для уведомлений</li>
      </ul>
      <Link to="/" className="filters button">
        Назад к задачам
      </Link>

      {/* Добавляем подвал */}
      <footer className="footer">
        <h3>Создано с ❤️ Андреем Глотовым</h3>
        <p>
          Я — Андрей Глотов, фронтенд-разработчик с опытом работы 1.5 года.
          Специализируюсь на создании интерактивных и удобных интерфейсов с
          использованием современных технологий, таких как React и TypeScript.
        </p>
        <div className="footer-contacts">
          <p>
            📧 <a href="mailto:glotov_andrew@mail.ru">glotov_andrew@mail.ru</a>
          </p>
          <p>
            📱{' '}
            <a
              href="https://t.me/Everok"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Everok
            </a>
          </p>
        </div>
        <p className="footer-note">2025 © Все права защищены.</p>
      </footer>
    </div>
  )
}

export default About
