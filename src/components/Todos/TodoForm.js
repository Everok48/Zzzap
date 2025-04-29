import { useState } from 'react'
import styles from './TodoForm.module.css'
import Button from '../UI/Button'

function TodoForm({ addTodo }) {
  const [text, setText] = useState('')
  const addTodoSubmitHundler = (event) => {
    event.preventDefault()
    addTodo(text)
    setText('')
  }
  return (
    <div className={styles.todoFormContainer}>
      <form onSubmit={addTodoSubmitHundler}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
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
