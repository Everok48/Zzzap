import { useState, useEffect } from 'react';
import TodoList from '../components/Todos/TodoList';
import TodoForm from '../components/Todos/TodoForm';
import TodosActions from '../components/Todos/TodosActions';
import { nanoid } from 'nanoid';
import { type Todo, Priority } from '../types';
import Clock from '../components/Clock';
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext';
import '../App.css';

const Home: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const [todos, setTodos] = useState<Todo[]>(() => {
    const saveTodos = localStorage.getItem('todos');
    const parsedTodos = saveTodos ? JSON.parse(saveTodos) : [];
    return parsedTodos.map((todo: Todo) => ({
      ...todo,
      createdAt: todo.createdAt ? new Date(todo.createdAt) : new Date(),
      priority: todo.priority || 'medium',
    }));
  });

  const [filterTodos, setFilterTodos] = useState<'all' | 'active' | 'completed'>('all');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodoHandler = (text: string, priority: Priority) => {
    const newTodo: Todo = {
      text,
      isCompleted: false,
      id: nanoid(),
      createdAt: new Date(),
      priority,
    };
    setTodos([...todos, newTodo]);
    toast.success('Задача добавлена!');
  };

  const deleteTodoHandler = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.info('Задача удалена');
  };

  const toggleTodoHandler = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const updateTodoHandler = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
    toast.success('Задача обновлена');
  };

  const resetTodosHandler = () => {
    setTodos([]);
    toast.info('Все задачи сброшены');
  };

  const deleteCompletedTodosHandler = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted));
    toast.info('Завершенные задачи удалены');
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
  };

  const completedTodosCount = todos.filter((todo: Todo) => todo.isCompleted).length;

  const filteredTodos = todos
    .filter((todo: Todo) => {
      const matchesStatus =
        filterTodos === 'active' ? !todo.isCompleted :
        filterTodos === 'completed' ? todo.isCompleted :
        true;

      const matchesPriority = filterPriority === 'all' ? true : todo.priority === filterPriority;

      const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesPriority && matchesSearch;
    })
    .sort((a: Todo, b: Todo) => {
      const dateA = a.createdAt.getTime();
      const dateB = b.createdAt.getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="App" data-theme={theme}>
      <header className="app-header">
        <Clock />
        <h1>Zzzap</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          Переключить тему ({theme === 'light' ? 'Темная' : 'Светлая'})
        </button>
      </header>
      <main className="app-main">
        <TodoForm addTodo={addTodoHandler} />
        {!!todos.length && (
          <>
            <div className="filters">
              <div className="search-filter">
                <input
                  type="text"
                  placeholder="Поиск задач..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="status-filter">
                <button
                  onClick={() => setFilterTodos('all')}
                  className={filterTodos === 'all' ? 'active' : ''}
                >
                  Все
                </button>
                <button
                  onClick={() => setFilterTodos('active')}
                  className={filterTodos === 'active' ? 'active' : ''}
                >
                  Активные
                </button>
                <button
                  onClick={() => setFilterTodos('completed')}
                  className={filterTodos === 'completed' ? 'active' : ''}
                >
                  Завершенные
                </button>
              </div>
              <div className="priority-filter">
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value as Priority | 'all')}
                >
                  <option value="all">Все приоритеты</option>
                  <option value="low">Низкий</option>
                  <option value="medium">Средний</option>
                  <option value="high">Высокий</option>
                </select>
              </div>
              <div className="sort-filter">
                <button onClick={toggleSortOrder}>
                  Сортировать: {sortOrder === 'newest' ? 'Новые' : 'Старые'}
                </button>
              </div>
            </div>
            <TodosActions
              completedTodosExist={!!completedTodosCount}
              resetTodos={resetTodosHandler}
              deleteCompletedTodos={deleteCompletedTodosHandler}
            />
          </>
        )}
        <TodoList
          todos={filteredTodos}
          deleteTodo={deleteTodoHandler}
          toggleTodo={toggleTodoHandler}
          updateTodo={updateTodoHandler}
        />
        {!todos.length && (
          <div className="noTasksMessage">Добавь свою первую задачу!</div>
        )}
        {completedTodosCount > 0 && (
          <h2 className="completedMessage">{`Завершено задач: ${completedTodosCount}`}</h2>
        )}
      </main>
    </div>
  );
};

export default Home;