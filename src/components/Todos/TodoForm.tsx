// Todo.tsx
import styles from './Todo.module.css'
import { RiTodoFill, RiDeleteBin2Line } from 'react-icons/ri'
import { FaCheck } from 'react-icons/fa'
import { Todo } from '../../types'

interface TodoProps {
  todo: Todo
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
}

const TodoItem: React.FC<TodoProps> = ({ todo, deleteTodo, toggleTodo }) => {
  return (
    <div
      className={`${styles.todo} ${
        todo.isCompleted ? styles.completedTodo : ''
      }`}
    >
      <RiTodoFill className={styles.todoIcon} />
      <div className={styles.todoText}>{todo.text}</div>
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

export default TodoItem
