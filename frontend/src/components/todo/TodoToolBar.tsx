import { Button } from "@ui/Button"
import { Input } from "@ui/Input"


const TodoToolBar = () => {
  return (
    <section className="border-b">
      <div className="flex gap-2">
        <Input className="border-black" type="text" />

        <Button>
          Add Task
        </Button>
      </div>

      <div className="my-4 flex justify-center md:justify-between flex-wrap gap-2">
        <div className="flex gap-2">
          <Button variant="outline">all</Button>
          <Button variant="outline">active</Button>
          <Button variant="outline">completed</Button>
        </div>

        {/* akce */}
        <div className="flex gap-2">
          <Button variant="outline">all done</Button>
          <Button variant="destructive">remove completed</Button>
        </div>
      </div>
    </section>
  )
}
export default TodoToolBar