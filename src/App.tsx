import './App.css'
import TodoList from './components/Todos/TodoList'
import TodoForm from './components/Todos/TodoForm'
import TodosActions from './components/Todos/TodosActions'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import { type Todo } from './types' 

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

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

  return (
    <div className="App">
      <h1>Zzzap</h1>
      <TodoForm addTodo={addTodoHandler} />
      {!!todos.length && (
        <TodosActions
          completedTodosExist={!!completedTodosCount}
          resetTodos={resetTodosHandler}
          deleteCompletedTodos={deleteCompletedTodosHandler}
        />
      )}
      <TodoList
        todos={todos}
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
