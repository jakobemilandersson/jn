import React from 'react'

type Props = {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}

export default function Dropdown({ label, value, options, onChange }: Props) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded border p-2"
        aria-label={label}
      >
        <option value="">Any</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}
