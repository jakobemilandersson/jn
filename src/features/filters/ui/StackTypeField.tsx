import { useFilterStore } from '@features/filters'
import { SearchableMultiSelect } from '@shared/ui'
import type { StackType } from '@entities/resume'

const STACK_TYPE_OPTIONS: StackType[] = ['fullstack', 'backend', 'frontend']

export const STACK_TYPE_LABELS: Record<StackType, string> = {
  fullstack: 'Fullstack',
  backend: 'Backend',
  frontend: 'Frontend',
}

export const STACK_TYPE_OPTION_LABELS = STACK_TYPE_OPTIONS.map(
  (v) => STACK_TYPE_LABELS[v]
)

export const stackTypeFromLabel = (label: string): StackType | undefined =>
  STACK_TYPE_OPTIONS.find((v) => STACK_TYPE_LABELS[v] === label)

export function StackTypeField() {
  const stackTypes = useFilterStore((s) => s.stackTypes)
  const setStackTypes = useFilterStore((s) => s.setStackTypes)

  const selectedLabels = stackTypes.map((v) => STACK_TYPE_LABELS[v])

  const handleChange = (labels: string[]) => {
    const next = labels
      .map(stackTypeFromLabel)
      .filter((v): v is StackType => v !== undefined)
    setStackTypes(next)
  }

  return (
    <SearchableMultiSelect
      id="stack-type"
      label="Stack type"
      options={STACK_TYPE_OPTION_LABELS}
      selected={selectedLabels}
      onChange={handleChange}
    />
  )
}
