import React from 'react'
import { useFilterStore } from '../model/useFilterStore'
import { Dropdown } from '@shared/ui'
import { StackType } from '@entities/resume'

export const StackTypeDropdown = () => {
  const stackType = useFilterStore((s) => s.stackType)
  const setStackType = useFilterStore((s) => s.setStackType)

  const OPTIONS = [
    { value: 'fullstack', label: 'Fullstack' },
    { value: 'backend', label: 'Backend' },
    { value: 'frontend', label: 'Frontend' }
  ] as const

  return (
    <Dropdown
      id="stack-type"
      label="Stack type"
      options={OPTIONS}
      value={stackType ?? ''}
      onChange={(v) => setStackType(v === '' ? null : v as StackType)}
    />
  )
}
