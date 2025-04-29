import TodoItem from './Todo'; // Обновляем импорт
import styles from './TodoList.module.css';
import { Todo } from '../../types';

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo, toggleTodo }) => {
  return (
    <div className={styles.todoListContainer}>
      {!todos.length && <h2>Задач пока нет</h2>}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;