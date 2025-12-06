import React from 'react'

type Option<T extends string> = { value: T; label: string }

type Props<T extends string> = {
  id: string
  label: string
  value: T | ''
  options: readonly Option<T>[]
  onChange: (v: T | '') => void
}

export const Dropdown = <T extends string>({ id, label, value, options, onChange }: Props<T>) => {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T | '')}
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
