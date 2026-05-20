import { useFilterStore } from '@features/filters'
import type { YearMonth } from '@entities/resume'

export function DateIntervalField() {
  const dateFrom = useFilterStore((s) => s.dateFrom)
  const dateTo = useFilterStore((s) => s.dateTo)
  const setDateFrom = useFilterStore((s) => s.setDateFrom)
  const setDateTo = useFilterStore((s) => s.setDateTo)

  const handleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setDateFrom(v ? (v as YearMonth) : null)
  }

  const handleTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setDateTo(v ? (v as YearMonth) : null)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-gray-400 uppercase tracking-wide">
        Date interval
      </label>
      <div className="flex items-center gap-2">
        <input
          type="month"
          id="date-from"
          aria-label="From month"
          value={dateFrom ?? ''}
          onChange={handleFrom}
          className="
            w-full rounded border border-gray-600 bg-gray-800 px-2 py-1.5
            text-sm text-white placeholder-gray-500
            focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400
          "
        />
        <span className="text-xs text-gray-500 shrink-0">–</span>
        <input
          type="month"
          id="date-to"
          aria-label="To month"
          value={dateTo ?? ''}
          onChange={handleTo}
          className="
            w-full rounded border border-gray-600 bg-gray-800 px-2 py-1.5
            text-sm text-white placeholder-gray-500
            focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400
          "
        />
      </div>
    </div>
  )
}
