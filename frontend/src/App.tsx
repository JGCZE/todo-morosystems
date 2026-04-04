import { TodoItems, TodoToolBar } from './components/todo'

const App = () => (
  <div className='sm:border max-w-xl md:w-xl mx-auto mt-10 p-4'>
    <h2 className="pb-8">
      Todo appka
    </h2>

    <TodoToolBar />

    <TodoItems />
  </div>
)

export default App
