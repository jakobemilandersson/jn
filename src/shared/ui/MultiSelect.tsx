import React from 'react'

type Props = {
  label: string
  options: string[]
  selected: string[]
  onToggle: (skill: string) => void
}

export default function MultiSelect({ label, options, selected, onToggle }: Props) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">{label}</legend>
      <div className="mt-1 flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={`px-3 py-1 rounded border ${isSelected ? 'bg-slate-700 text-white' : ''}`}
              aria-pressed={isSelected}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
