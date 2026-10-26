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

type DraftSide = { month: string | null; year: string | null }

function parseYearMonth(ym: string | null): { month: string; year: string } | null {
  if (!ym) return null
  const [y, m] = ym.split('-')
  return { year: y, month: m }
}

function formatLabel(value: MonthRangeValue): string | null {
  const from = parseYearMonth(value.from)
  const to = parseYearMonth(value.to)
  if (!from && !to) return null
  const fmt = (p: { month: string; year: string }) =>
    `${MONTHS[Number(p.month) - 1].slice(0, 3)} ${p.year}`
  if (from && to) return `${fmt(from)} – ${fmt(to)}`
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

  const parsedFrom = parseYearMonth(value.from)
  const parsedTo = parseYearMonth(value.to)
  const [fromDraft, setFromDraft] = useState<DraftSide>({
    month: parsedFrom?.month ?? null,
    year: parsedFrom?.year ?? null,
  })
  const [toDraft, setToDraft] = useState<DraftSide>({
    month: parsedTo?.month ?? null,
    year: parsedTo?.year ?? null,
  })

  useEffect(() => {
    const p = parseYearMonth(value.from)
    setFromDraft({ month: p?.month ?? null, year: p?.year ?? null })
  }, [value.from])
  useEffect(() => {
    const p = parseYearMonth(value.to)
    setToDraft({ month: p?.month ?? null, year: p?.year ?? null })
  }, [value.to])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('mousedown', handler)
    return () => window.removeEventListener('mousedown', handler)
  }, [])

  const years = yearRange(minYear, maxYear)

  const handleFromMonth = (m: string) => {
    if (!m) {
      setFromDraft({ month: null, year: null })
      onChange({ ...value, from: null })
      return
    }
    const next = { ...fromDraft, month: m }
    setFromDraft(next)
    if (next.year) onChange({ ...value, from: `${next.year}-${m}` })
  }

  const handleFromYear = (y: string) => {
    if (!y) {
      setFromDraft({ month: null, year: null })
      onChange({ ...value, from: null })
      return
    }
    const month = fromDraft.month ?? '01'
    const next: DraftSide = { month, year: y }
    setFromDraft(next)
    const nextFrom = `${y}-${month}`
    const nextValue: MonthRangeValue =
      value.to !== null && value.to < nextFrom
        ? { from: nextFrom, to: null }
        : { ...value, from: nextFrom }
    if (nextValue.to === null) setToDraft({ month: null, year: null })
    onChange(nextValue)
  }

  const handleToMonth = (m: string) => {
    if (!m) {
      setToDraft({ month: null, year: null })
      onChange({ ...value, to: null })
      return
    }
    const next = { ...toDraft, month: m }
    setToDraft(next)
    if (next.year) onChange({ ...value, to: `${next.year}-${m}` })
  }

  const handleToYear = (y: string) => {
    if (!y) {
      setToDraft({ month: null, year: null })
      onChange({ ...value, to: null })
      return
    }
    const month = toDraft.month ?? '12'
    const nextTo = `${y}-${month}`
    if (value.from !== null && nextTo < value.from) {
      setToDraft({ month: null, year: null })
      onChange({ ...value, to: null })
      return
    }
    const next: DraftSide = { month, year: y }
    setToDraft(next)
    onChange({ ...value, to: nextTo })
  }

  const triggerLabel = formatLabel(value)
  const selectCls = 'w-full min-w-0 rounded-lg border border-white/10 bg-[#111722] px-2 py-2 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300'

  return (
    <div className="relative w-full min-w-0" ref={containerRef}>
      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-white/45" htmlFor={id}>
        {label}
      </label>
      <button
        id={id}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className="flex h-11 w-full min-w-0 items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/20 px-3 text-left text-sm text-white transition hover:border-white/20 hover:bg-white/[0.035] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
      >
        <span className={`truncate ${triggerLabel ? 'text-white/85' : 'text-white/40'}`}>
          {triggerLabel ?? 'Any'}
        </span>
        <svg aria-hidden="true" className={`h-4 w-4 shrink-0 text-white/45 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-30 mt-2 flex max-h-[min(24rem,70vh)] w-full min-w-0 flex-col gap-3 overflow-y-auto rounded-xl border border-white/10 bg-[#111722] p-2.5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:min-w-[15rem]">
          {([
            { rowLabel: 'From', monthVal: fromDraft.month, yearVal: fromDraft.year, onMonth: handleFromMonth, onYear: handleFromYear },
            { rowLabel: 'To', monthVal: toDraft.month, yearVal: toDraft.year, onMonth: handleToMonth, onYear: handleToYear },
          ] as const).map(({ rowLabel, monthVal, yearVal, onMonth, onYear }) => (
            <div key={rowLabel} className="flex min-w-0 flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">{rowLabel}</span>
              <div className="flex min-w-0 gap-2">
                <select aria-label={`${rowLabel} month`} value={monthVal ?? ''} onChange={e => onMonth(e.target.value)} className={selectCls}>
                  <option value="">Month</option>
                  {MONTHS.map((name, i) => (
                    <option key={name} value={String(i + 1).padStart(2, '0')}>{name}</option>
                  ))}
                </select>
                <select aria-label={`${rowLabel} year`} value={yearVal ?? ''} onChange={e => onYear(e.target.value)} className={selectCls}>
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
