import { useState, useRef, useEffect } from 'react'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const

export type MonthRangeValue = { from: string | null; to: string | null }

type Props = {
  id: string
  label: string
  value: MonthRangeValue
  onChange: (next: MonthRangeValue) => void
  minYear: number
  maxYear: number
}

function parseYearMonth(ym: string | null): { month: string; year: number } | null {
  if (!ym) return null
  const [y, m] = ym.split('-')
  return { year: Number(y), month: m }
}

function formatLabel(value: MonthRangeValue): string | null {
  const from = parseYearMonth(value.from)
  const to = parseYearMonth(value.to)
  if (!from && !to) return null
  const fmt = (p: { month: string; year: number }) => `${MONTHS[Number(p.month) - 1].slice(0, 3)} ${p.year}`
  if (from && to) return `${fmt(from)} \u2013 ${fmt(to)}`
  if (from) return `From ${fmt(from)}`
  return `Until ${fmt(to!)}`
}

function yearRange(min: number, max: number): number[] {
  const years: number[] = []
  for (let y = min; y <= max; y++) years.push(y)
  return years
}

export function MonthRangePicker({ id, label, value, onChange, minYear, maxYear }: Props) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('mousedown', handler)
    return () => window.removeEventListener('mousedown', handler)
  }, [])

  const years = yearRange(minYear, maxYear)

  const fromParsed = parseYearMonth(value.from)
  const toParsed = parseYearMonth(value.to)

  const handleFromMonth = (m: string) => {
    const year = fromParsed?.year ?? minYear
    onChange({ ...value, from: m ? `${year}-${m}` : null })
  }
  const handleFromYear = (y: string) => {
    const month = fromParsed?.month ?? '01'
    onChange({ ...value, from: y ? `${y}-${month}` : null })
  }
  const handleToMonth = (m: string) => {
    const year = toParsed?.year ?? maxYear
    onChange({ ...value, to: m ? `${year}-${m}` : null })
  }
  const handleToYear = (y: string) => {
    const month = toParsed?.month ?? '12'
    onChange({ ...value, to: y ? `${y}-${month}` : null })
  }

  const triggerLabel = formatLabel(value)
  const selectCls = 'w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm text-black dark:text-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400'

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <button
        id={id}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className="mt-1 w-full h-10 flex items-center justify-between gap-2 border border-gray-300 dark:border-gray-600 rounded px-3 text-left bg-white dark:bg-gray-800 text-black dark:text-gray-100 focus:ring focus:outline-none"
      >
        <span className="truncate">
          {triggerLabel ?? (
            <span className="text-gray-500 dark:text-gray-400">Any period</span>
          )}
        </span>
        <svg aria-hidden="true" className="shrink-0 w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 shadow-lg p-3 flex flex-col gap-4">
          {([
            { rowLabel: 'From', monthVal: fromParsed?.month, yearVal: fromParsed?.year, onMonth: handleFromMonth, onYear: handleFromYear },
            { rowLabel: 'To',   monthVal: toParsed?.month,   yearVal: toParsed?.year,   onMonth: handleToMonth,   onYear: handleToYear },
          ] as const).map(({ rowLabel, monthVal, yearVal, onMonth, onYear }) => (
            <div key={rowLabel} className="flex flex-col gap-1.5">
              <span className="text-xs text-gray-400 dark:text-gray-500">{rowLabel}</span>
              <div className="flex gap-2">
                <select
                  aria-label={`${rowLabel} month`}
                  value={monthVal ?? ''}
                  onChange={e => onMonth(e.target.value)}
                  className={selectCls}
                >
                  <option value="">Month</option>
                  {MONTHS.map((name, i) => (
                    <option key={name} value={String(i + 1).padStart(2, '0')}>{name}</option>
                  ))}
                </select>
                <select
                  aria-label={`${rowLabel} year`}
                  value={yearVal ?? ''}
                  onChange={e => onYear(e.target.value)}
                  className={selectCls}
                >
                  <option value="">Year</option>
                  {years.map(y => (
                    <option key={y} value={String(y)}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
