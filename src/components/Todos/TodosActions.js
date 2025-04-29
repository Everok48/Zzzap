import Button from '../UI/Button'
import { RiDeleteBin2Line, RiRefreshLine } from 'react-icons/ri'
import styles from './TodosActions.module.css'

function TodosActions({
  resetTodos,
  deleteCompletedTodos,
  completedTodosExist,
}) {
  return (
    <div className={styles.TodosActionsContainer}>
      <Button title="Сбросить задачи" onClick={resetTodos}>
        <RiRefreshLine />
      </Button>
      <Button
        title="Удалить завершенные задачи"
        onClick={deleteCompletedTodos}
        disabled={!completedTodosExist}
      >
        <RiDeleteBin2Line />
      </Button>
    </div>
  )
}

export default TodosActions
