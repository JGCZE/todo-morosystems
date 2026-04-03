import { Button } from "@ui/Button"
import { Checkbox } from "@ui/Checkbox"
import { Pencil, Trash2 } from "lucide-react"
import { useDeleteTasksByIdMutation, useGetTasksQuery, usePostTasksByIdCompleteMutation, usePostTasksByIdIncompleteMutation } from "@/api/enhancedApi"
import TodoItemSkeleton from "./TodoItemSkeleton"

const TodoItems = () => {
  const { data: tasks, isFetching, isLoading } = useGetTasksQuery()
  const [deleteTask] = useDeleteTasksByIdMutation()
  const [updateToCompleted] = usePostTasksByIdCompleteMutation()
  const [updateToIncompleted] = usePostTasksByIdIncompleteMutation()

  const toggleCompleted = (id: string, completed: boolean) => (
    completed
      ? updateToIncompleted({ id })
      : updateToCompleted({ id })
  )


  // console.log(taskToShow)

  return (
    <section>
      {isLoading ? (
        <TodoItemSkeleton count={3} />
      ) : (
        <>
          <ul>
            {tasks?.map(({ completed, id, text }) => (
              <li className="flex items-center justify-between mb-6" key={id}>
                <div className="flex items-center gap-2 min-w-0">
                  <Checkbox
                    checked={completed}
                    onClick={() => toggleCompleted(id, completed)}
                  />

                  <span className="text-sm sm:text-base line-clamp-2 md:line-clamp-1 text-left">
                    {text}
                  </span>
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

          <div>
            <p>hotové úkoly: {tasks?.filter(t => t.completed).length}</p>
          </div>
        </>
      )
      }
    </section >
  )
}
export default TodoItems