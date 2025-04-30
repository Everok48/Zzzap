import { FormEvent, ChangeEvent, useState } from 'react'
import Button from '../UI/Button'
import styles from './TodoForm.module.css'
import { Priority } from '../../types'

interface TodoFormProps {
  addTodo: (text: string, priority: Priority) => void
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState<string>('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [error, setError] = useState<string>('')

  const addTodoSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!text.trim()) {
      setError('Задача не может быть пустой')
      return
    }
    setError('')
    addTodo(text.trim(), priority)
    setText('')
    setPriority('medium')
  }

  return (
    <div className={styles.todoFormContainer}>
      <form onSubmit={addTodoSubmitHandler} className={styles.todoForm}>
        <div className={styles.inputWrapper}>
          <input
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setText(e.target.value)
              if (error && e.target.value.trim()) {
                setError('')
              }
            }}
            placeholder="Добавить задачу"
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            required
          />
          <Button
            type="submit"
            title="Подтвердить добавление задачи"
            disabled={!text.trim()}
          >
            Подтвердить
          </Button>
        </div>
        <div className={styles.priorityWrapper}>
          <label>Приоритет: </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className={styles.prioritySelect}
          >
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  )
}

export default TodoForm
