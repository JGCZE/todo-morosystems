import { useGetTasksQuery } from '@/api/enhancedApi'
import { TodoItems, TodoToolBar } from './components/todo'

const App = () => {
  const { error } = useGetTasksQuery()

  if (error) return <p>Error loading tasks</p>

  return (
    <div className='sm:border max-w-xl md:w-xl mx-auto mt-10 p-4'>
      <h2 className="pb-8">
        Todo appka
      </h2>

      <TodoToolBar />

      <TodoItems />
    </div>
  )
}

export default App
