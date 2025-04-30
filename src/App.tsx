import './App.css'
import TodoList from './components/Todos/TodoList'
import TodoForm from './components/Todos/TodoForm'
import TodosActions from './components/Todos/TodosActions'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { type Todo } from './types'
import Clock from './components/Clock'

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saveTodos = localStorage.getItem('todos')
    return saveTodos ? JSON.parse(saveTodos) : []
  })
  const [filterTodos, setFilterTodos] = useState<
    'all' | 'active' | 'completed'
  >('all')
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  const addTodoHandler = (text: string) => {
    const newTodo: Todo = {
      text,
      isCompleted: false,
      id: nanoid(),
    }
    setTodos([...todos, newTodo])
  }

  const deleteTodoHandler = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodoHandler = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : { ...todo }
      )
    )
  }

  const resetTodosHandler = () => {
    setTodos([])
  }

  const deleteCompletedTodosHandler = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted))
  }

  const completedTodosCount = todos.filter((todo) => todo.isCompleted).length
  const filteredTodos = todos.filter((todo) => {
    if (filterTodos === 'active') return !todo.isCompleted
    if (filterTodos === 'completed') return todo.isCompleted
    return true
  })

  return (
    <div className="App">
      <Clock />
      <h1>Zzzap</h1>
      <TodoForm addTodo={addTodoHandler} />
      {!!todos.length && (
        <>
          <div className="filters">
            <button onClick={() => setFilterTodos('all')}>Все</button>
            <button onClick={() => setFilterTodos('active')}>Активные</button>
            <button onClick={() => setFilterTodos('completed')}>
              Завершенные
            </button>
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
      />
      {completedTodosCount > 0 && (
        <h2>{`Завершено задач: ${completedTodosCount}`}</h2>
      )}
    </div>
  )
}

export default App
