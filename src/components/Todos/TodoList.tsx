import Todo from './Todo'
import styles from './TodoList.module.css'
import { Todo as TodoType } from '../../types'
import { motion, AnimatePresence } from 'framer-motion'

interface TodoListProps {
  todos: TodoType[]
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
  updateTodo: (id: string, newText: string) => void
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  toggleTodo,
  updateTodo,
}) => {
  return (
    <div className={styles.todoListContainer}>
      {!todos.length && <h2>Задач пока нет</h2>}
      <AnimatePresence>
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Todo
              todo={todo}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
              updateTodo={updateTodo}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TodoList
