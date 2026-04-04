import type { TFilter } from "@/store/filterSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
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


  const handleAddTask = async () => {
    if (!newTask.trim()) {
      return
    }

    await addTask({ createTask: { text: newTask } })
    setNewTask("")
  }

  const handleDeleteAllCompleted = async () => {
    const completedTasks = tasks?.filter((task) => task.completed) ?? []

    const result = await Promise.allSettled(
      completedTasks.map(({ id }) => deleteTask({ id }).unwrap())
    )

    const isError = result.some((res) => res.status === "rejected")

    if (isError) {
      alert("Failed to delete some tasks. Please try again.")
    }
  }

  const handleAllTasksDone = async () => {
    const activeTasks = tasks?.filter((task) => !task.completed) ?? []

    const result = await Promise.allSettled(
      activeTasks.map(({ id }) => updateToCompleted({ id }).unwrap())
    )

    const isError = result.some((res) => res.status === "rejected")

    if (isError) {
      alert("Failed to update some tasks. Please try again.")
    }

  }

  return {
    changeFilter,
    handleAddTask,
    handleAllTasksDone,
    handleDeleteAllCompleted,
    newTask,
    setNewTask,
  }
}