import { Skeleton } from "@ui/Skeleton"

const TodoItemSkeleton = ({ count = 3 }: { count?: number }) => (
  <ul>
    {Array.from({ length: count }).map((_, i) => (
      <li className="flex items-center justify-between mb-6" key={i}>
        <div className="flex flex-1 items-center gap-2 min-w-0">
          <Skeleton className="h-7 w-8 rounded shrink-0" />
          <Skeleton className="h-7 rounded w-full" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-7 w-8 rounded" />
          <Skeleton className="h-7 w-8 rounded" />
        </div>
      </li>
    ))}
  </ul>
)

export default TodoItemSkeleton
