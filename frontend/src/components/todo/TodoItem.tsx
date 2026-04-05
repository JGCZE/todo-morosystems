import type { Task } from "@/api/generatedApi"
import { Pencil, Save, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useDeleteTasksByIdMutation, usePostTasksByIdCompleteMutation, usePostTasksByIdIncompleteMutation, usePostTasksByIdMutation } from "@/api/enhancedApi"
import { Button } from "../ui/Button"
import { Checkbox } from "../ui/Checkbox"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"

const TodoItem = ({ task }: { task: Task }) => {
  const { completed, id, text } = task

  const [newText, setNewText] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const [deleteTask] = useDeleteTasksByIdMutation()
  const [updateToCompleted] = usePostTasksByIdCompleteMutation()
  const [updateToIncompleted] = usePostTasksByIdIncompleteMutation()
  const [updateTask] = usePostTasksByIdMutation();

  const toggleCompleted = async () => {
    const action = completed
      ? updateToIncompleted({ id })
      : updateToCompleted({ id })

    try {
      await action.unwrap()
    } catch (error) {
      console.error(error)
      toast.error("The task status could not be changed.")
    }
  }

  const handleSaveEdit = async () => {
    if (!newText.trim()) {
      return
    }

    try {
      await updateTask({ id, updateTask: { text: newText } }).unwrap()
    } catch (error) {
      console.error(error)
      toast.error("The task could not be updated. Please try again later.")
    }

    setIsEditing(false)
  }

  const handleDelete = async () => {
    try {
      await deleteTask({ id }).unwrap()
    } catch (error) {
      console.error(error)
      toast.error("The task could not be deleted.")
    }
  }

  const handleStartEdit = () => {
    setIsEditing(true)
    setNewText(text)
  }

  return (
    <li className="flex items-center justify-between mb-6" key={id}>
      <div className="flex items-center gap-2 min-w-0 sm:flex-1 sm:mr-14 md:mr-20">
        <Checkbox
          checked={completed}
          className="size-5"
          id={id}
          onCheckedChange={toggleCompleted}
        />

        {isEditing ? (
          <>
            <Input
              autoFocus
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveEdit()
                }
              }}
              type="text"
              value={newText}
            />
            <Button
              onClick={handleSaveEdit}
              size="icon-sm"
            >
              <Save />
            </Button>
          </>
        ) : (
          <Label
            className="text-sm line-clamp-2 text-left cursor-pointer sm:text-base md:line-clamp-1"
            htmlFor={id}
          >
            {text}
          </Label>
        )}
      </div>

      <div className="flex gap-2">
        {!isEditing && (
          <Button
            onClick={handleStartEdit}
            size="icon-sm"
            variant="ghost"
          >
            <Pencil />
          </Button>
        )}

        <Button
          onClick={handleDelete}
          size="icon-sm"
          variant="destructive"
        >
          <Trash2 />
        </Button>
      </div>
    </li>
  )
}
export default TodoItem