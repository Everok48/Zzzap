import { useState, FormEvent, ChangeEvent } from 'react'
import styles from './TodoForm.module.css'
import Button from '../UI/Button'

// Определяем типы для пропсов
interface TodoFormProps {
  addTodo: (text: string) => void
}

// Типизируем компонент
const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState<string>('')

  // Типизируем событие для формы
  const addTodoSubmitHundler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addTodo(text)
    setText('')
  }

  return (
    <div className={styles.todoFormContainer}>
      <form onSubmit={addTodoSubmitHundler}>
        <input
          value={text}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          placeholder="Добавить задачу"
        />
        <Button type="submit" title="Подтвердить добавление задачи">
          Подтвердить
        </Button>
      </form>
    </div>
  )
}

export default TodoForm
