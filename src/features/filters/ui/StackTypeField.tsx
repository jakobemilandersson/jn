import { useFilterStore } from '@features/filters'
import { SearchableMultiSelect } from '@shared/ui'
import type { StackType } from '@entities/resume'

const STACK_TYPE_OPTIONS: StackType[] = ['fullstack', 'backend', 'frontend']

const STACK_TYPE_LABELS: Record<StackType, string> = {
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
  const toggleStackType = useFilterStore((s) => s.toggleStackType)

  const selectedLabels = stackTypes.map((v) => STACK_TYPE_LABELS[v])

  const handleChange = (labels: string[]) => {
    const next = labels
      .map(stackTypeFromLabel)
      .filter((v): v is StackType => v !== undefined)
    // Sync: toggle any that differ from current state
    const current = new Set(stackTypes)
    const incoming = new Set(next)
    for (const v of STACK_TYPE_OPTIONS) {
      if (current.has(v) !== incoming.has(v)) {
        toggleStackType(v)
      }
    }
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
