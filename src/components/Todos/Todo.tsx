import { useState } from 'react'
import styles from './Todo.module.css'
import { RiTodoFill, RiDeleteBin2Line } from 'react-icons/ri'
import { FaCheck } from 'react-icons/fa'
import { Todo as TodoType } from '../../types'

interface TodoProps {
  todo: TodoType
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
  updateTodo: (id: string, newText: string) => void
}

const Todo: React.FC<TodoProps> = ({
  todo,
  deleteTodo,
  toggleTodo,
  updateTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editText.trim()) {
      updateTodo(todo.id, editText.trim())
      setIsEditing(false)
    }
  }

  return (
    <div
      className={`${styles.todo} ${
        todo.isCompleted ? styles.completedTodo : ''
      } ${styles[`priority-${todo.priority}`]}`}
    >
      <RiTodoFill className={styles.todoIcon} />
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className={styles.editForm}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            autoFocus
            className={styles.editInput}
          />
        </form>
      ) : (
        <div className={styles.todoText} onClick={() => setIsEditing(true)}>
          {todo.text}
          <span className={styles.createdAt}>
            (Создано:{' '}
            {todo.createdAt.toLocaleString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
            )
          </span>
        </div>
      )}
      <RiDeleteBin2Line
        className={styles.deleteIcon}
        onClick={(e: React.MouseEvent<SVGElement>) => {
          deleteTodo(todo.id)
        }}
      />
      <FaCheck
        className={styles.checkIcon}
        onClick={(e: React.MouseEvent<SVGElement>) => {
          toggleTodo(todo.id)
        }}
      />
    </div>
  )
}

export default Todo
