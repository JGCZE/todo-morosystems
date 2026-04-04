import type { RootState } from "@/store/store"
import { Button } from "@ui/Button"
import { Checkbox } from "@ui/Checkbox"
import { Label } from "@ui/Label"
import { Pencil, Trash2 } from "lucide-react"
import { useSelector } from "react-redux"
import { useDeleteTasksByIdMutation, useGetTasksQuery, usePostTasksByIdCompleteMutation, usePostTasksByIdIncompleteMutation } from "@/api/enhancedApi"
import TodoItemSkeleton from "./TodoItemSkeleton"

const TodoItems = () => {
  const { data: tasks, isLoading } = useGetTasksQuery()
  const [deleteTask] = useDeleteTasksByIdMutation()
  const [updateToCompleted] = usePostTasksByIdCompleteMutation()
  const [updateToIncompleted] = usePostTasksByIdIncompleteMutation()
  const filter = useSelector((state: RootState) => state.filtering.value)

  const toggleCompleted = (id: string, completed: boolean) => (
    completed
      ? updateToIncompleted({ id })
      : updateToCompleted({ id })
  )

  const itemsToShow = tasks?.filter((task) => {
    if (filter === "completed") {
      return task.completed
    }

    if (filter === "active") {
      return !task.completed
    }

    return task
  })

  return (
    <section>
      {isLoading ? (
        <TodoItemSkeleton count={4} />
      ) : (
        <>
          <ul>
            {itemsToShow?.map(({ completed, id, text }) => (
              <li className="flex items-center justify-between mb-6" key={id}>
                <div className="flex items-center gap-2 min-w-0">
                  <Checkbox
                    checked={completed}
                    className="size-5"
                    id={id}
                    onCheckedChange={() => toggleCompleted(id, completed)}
                  />

                  <Label className="text-sm sm:text-base line-clamp-2 md:line-clamp-1 text-left cursor-pointer" htmlFor={id}>
                    {text}
                  </Label>
                </div>

                <div className="flex gap-2">
                  <Button size="icon-sm" variant="ghost">
                    <Pencil />
                  </Button>

                  <Button onClick={() => deleteTask({ id })} size="icon-sm" variant="destructive">
                    <Trash2 />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )
      }
    </section >
  )
}
export default TodoItems