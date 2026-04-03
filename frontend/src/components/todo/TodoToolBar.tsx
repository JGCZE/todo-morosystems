import { Button } from "@ui/Button"
import { Input } from "@ui/Input"
import { useState } from "react";
import { usePostTasksMutation } from "@/api/enhancedApi";

const TodoToolBar = () => {
  const [newTask, setNewTask] = useState("")

  const [addTask] = usePostTasksMutation();

  const handleAddTask = async () => {
    if (!newTask.trim()) {
      return
    }

    await addTask({ createTask: { text: newTask } })
    setNewTask("")
  }

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

        <Button disabled={!newTask} onClick={handleAddTask}>
          Add Task
        </Button>
      </div>

      <div className="my-4 flex justify-center md:justify-between flex-wrap gap-2">
        <div className="flex gap-2">
          <Button variant="outline">all</Button>
          <Button variant="outline">active</Button>
          <Button variant="outline">completed</Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">all done</Button>
          <Button variant="destructive">remove completed</Button>
        </div>
      </div>
    </section>
  )
}
export default TodoToolBar