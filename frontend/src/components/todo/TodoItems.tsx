import { Button } from "@ui/Button"
import { Checkbox } from "@ui/Checkbox"
import { Pencil, Trash2 } from "lucide-react"
import { useGetTasksQuery } from "@/api/enhancedApi"
import TodoItemSkeleton from "./TodoItemSkeleton"

const TodoItems = () => {
  const { data: tasks, isFetching, isLoading } = useGetTasksQuery()

  return (
    <section>
      {isLoading || isFetching ? (
        <TodoItemSkeleton />
      ) : (
        <ul>
          {tasks?.map((task) => (
            <li className="flex items-center justify-between mb-6" key={task.id}>
              <div className="flex items-center gap-2 min-w-0">
                <Checkbox
                  checked={task.completed}
                />

                <span className="text-sm sm:text-base line-clamp-2 md:line-clamp-1 text-left">
                  {task.text}
                </span>
              </div>

              <div className="flex gap-2">
                <Button size="icon-sm" variant="ghost">
                  <Pencil />
                </Button>

                <Button size="icon-sm" variant="destructive">
                  <Trash2 />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )
      }
    </section >
  )
}
export default TodoItems