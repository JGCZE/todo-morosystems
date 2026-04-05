import type { TFilter } from "@/store/filterSlice";
import type { RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useDeleteTasksByIdMutation, useGetTasksQuery, usePostTasksByIdCompleteMutation, usePostTasksMutation } from "@/api/enhancedApi";
import { setFilter } from '@/store/filterSlice';

export const useTodoToolBar = () => {
  const [newTask, setNewTask] = useState("")

  const { data: tasks } = useGetTasksQuery()
  const [addTask] = usePostTasksMutation();
  const [updateToCompleted] = usePostTasksByIdCompleteMutation()
  const [deleteTask] = useDeleteTasksByIdMutation()

  const dispatch = useDispatch()

  const changeFilter = (value: TFilter) => dispatch(setFilter(value))

  const filterStatus = useSelector((state: RootState) => state.filtering.value);

  const handleAddTask = async () => {
    if (!newTask.trim()) {
      return
    }

    try {
      await addTask({ createTask: { text: newTask } }).unwrap()
      setNewTask("")
    } catch (error) {
      console.error(error)
      toast.error("The task could not be added. Please try again later.")
    }
  }

  const handleDeleteAllCompleted = async () => {
    const completedTasks = tasks?.filter((task) => task.completed) ?? []

    const result = await Promise.allSettled(
      completedTasks.map(({ id }) => deleteTask({ id }).unwrap())
    )

    const isError = result.some((res) => res.status === "rejected")

    if (isError) {
      const errors = result.filter((r) => r.status === "rejected")
      console.error(errors)
      toast.error("Some tasks could not be deleted. Please try again later.")
    }
  }

  const getVisibleTasks = () => {
    if (filterStatus === "completed") {
      return tasks?.filter((t) => t.completed) ?? []
    }

    if (filterStatus === "active") {
      return tasks?.filter((t) => !t.completed) ?? []
    }

    return tasks ?? []
  }

  const handleAllTasksDone = async () => {
    const activeTasks = getVisibleTasks().filter((task) => !task.completed)

    const result = await Promise.allSettled(
      activeTasks.map(({ id }) => updateToCompleted({ id }).unwrap())
    )

    const isError = result.some((res) => res.status === "rejected")

    if (isError) {
      const errors = result.filter((r) => r.status === "rejected")
      console.error(errors)
      toast.error("Some tasks could not be marked as completed. Please try again later.")
    }
  }

  return {
    changeFilter,
    filterStatus,
    handleAddTask,
    handleAllTasksDone,
    handleDeleteAllCompleted,
    newTask,
    setNewTask,
  }
}