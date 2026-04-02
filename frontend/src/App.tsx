import { useGetTasksQuery } from '@/api/enhancedApi'

const App = () => {
  const { data: tasks, error, isLoading } = useGetTasksQuery()

  console.log('Tasks:', tasks)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading tasks</p>

  return (
    <ul>
      {tasks?.map((task) => (
        <li key={task.id}>{task.text}</li>
      ))}
    </ul>
  )
}

export default App
