import type { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { useGetTasksQuery } from "@/api/enhancedApi"
import { Button } from "../ui/Button"
import TodoItem from "./TodoItem"
import TodoItemSkeleton from "./TodoItemSkeleton"

const TodoItems = () => {
  const { data: tasks, error, isLoading } = useGetTasksQuery()
  const filter = useSelector((state: RootState) => state.filtering.value)

  if (error) {
    return (
      <div className="mx-auto mt-10 p-4 text-center">
        <p>Nepodařilo se načíst úkoly.</p>

        <Button onClick={() => window.location.reload()}>
          Zkusit znovu
        </Button>
      </div>
    )
  }

  const itemsToShow = tasks?.filter((task) => {
    if (filter === "completed") {
      return task.completed
    }

    if (filter === "active") {
      return !task.completed
    }

    return task
  })

  if (!itemsToShow?.length && !isLoading) {
    return (
      <div className="mx-auto mt-10 p-4 text-center">
        <p>Žádné úkoly k zobrazení.</p>
      </div>
    )
  }

  return (
    <section>
      {isLoading ? (
        <TodoItemSkeleton count={4} />
      ) : (
        <ul>
          {itemsToShow?.map((task) => (
            <TodoItem key={task.id} task={task} />
          ))}
        </ul>
      )}

      <p>
        hotové úkoly: {tasks?.filter((task) => task.completed).length}
      </p>
    </section >
  )
}
export default TodoItems