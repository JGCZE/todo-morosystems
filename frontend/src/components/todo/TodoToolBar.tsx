import { Button } from "@ui/Button"
import { Input } from "@ui/Input"
import { useTodoToolBar } from "./hooks/useTodoToolBar";

const TodoToolBar = () => {
  const {
    changeFilter, filterStatus, handleAddTask,
    handleAllTasksDone, handleDeleteAllCompleted, newTask, setNewTask,
  } = useTodoToolBar()

  return (
    <section className="border-b">
      <div className="flex gap-2">
        <Input
          className="border-black"
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask()
            }
          }}
          placeholder="Add new task"
          type="text"
          value={newTask}
        />

        <Button
          className="border-black"
          disabled={!newTask}
          onClick={handleAddTask}
        >
          Add Task
        </Button>
      </div>

      <div className="my-4 flex justify-center md:justify-between flex-wrap gap-2">
        <div className="flex gap-2">
          <Button
            onClick={() => changeFilter("all")}
            variant={filterStatus === "all" ? "secondary" : "outline"}
          >
            all
          </Button>

          <Button
            onClick={() => changeFilter("active")}
            variant={filterStatus === "active" ? "secondary" : "outline"}
          >
            active
          </Button>

          <Button
            onClick={() => changeFilter("completed")}
            variant={filterStatus === "completed" ? "secondary" : "outline"}
          >
            completed
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleAllTasksDone}
            variant="outline">
            all done
          </Button>

          <Button
            onClick={handleDeleteAllCompleted}
            variant="destructive"
          >
            remove completed
          </Button>
        </div>
      </div>

    </section>
  )
}
export default TodoToolBar