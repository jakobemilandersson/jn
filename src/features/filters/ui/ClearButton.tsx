import { useFilterStore } from "../model/useFilterStore"

export const ClearButton = () => {
  const clear = useFilterStore((s) => s.clear)

  return (
    <button
      type="button"
      aria-label="Clear filters"
      className="px-4 py-2 rounded border"
      onClick={clear}
    >
      Clear
    </button>
  )
}
