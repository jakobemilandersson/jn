import { useFilterStore } from '@features/filters'
import { MonthRangePicker } from '@shared/ui'
import type { MonthRangeValue } from '@shared/ui'
import type { YearMonth } from '@entities/resume'

const MIN_YEAR = 2019
const MAX_YEAR = new Date().getFullYear()

export function DateIntervalField() {
  const dateFrom = useFilterStore((s) => s.dateFrom)
  const dateTo = useFilterStore((s) => s.dateTo)
  const setDateFrom = useFilterStore((s) => s.setDateFrom)
  const setDateTo = useFilterStore((s) => s.setDateTo)

  const handleChange = ({ from, to }: MonthRangeValue) => {
    const nextFrom = from ? (from as YearMonth) : null
    const nextTo = to ? (to as YearMonth) : null
    const toIsBeforeFrom = nextFrom && nextTo && nextTo < nextFrom
    setDateFrom(nextFrom)
    setDateTo(toIsBeforeFrom ? null : nextTo)
  }

  return (
    <MonthRangePicker
      id="date-interval"
      label="Period"
      value={{ from: dateFrom, to: dateTo }}
      onChange={handleChange}
      minYear={MIN_YEAR}
      maxYear={MAX_YEAR}
    />
  )
}
