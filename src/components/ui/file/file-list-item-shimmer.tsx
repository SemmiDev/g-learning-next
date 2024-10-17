import Shimmer from '../shimmer'

export default function FileListItemShimmer() {
  return (
    <div className="flex items-center bg-gray-50/80 rounded-md p-1">
      <div className="p-3">
        <Shimmer className="size-5" />
      </div>
      <div className="flex-1 space-y-2">
        <Shimmer className="h-2.5 w-1/2" />
        <Shimmer className="h-2 w-1/3" />
      </div>
    </div>
  )
}
