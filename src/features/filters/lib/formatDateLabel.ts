const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const

/**
 * Formats a YearMonth pair into a human-readable label.
 * e.g. ("2022-03", "2024-06") → "Mar 2022 – Jun 2024"
 *      ("2022-03", null)      → "From Mar 2022"
 *      (null, "2024-06")      → "Until Jun 2024"
 *      (null, null)           → null
 */
export function formatDateLabel(from: string | null, to: string | null): string | null {
  if (!from && !to) return null
  const fmt = (ym: string) => {
    const [y, m] = ym.split('-')
    return `${MONTHS[Number(m) - 1]} ${y}`
  }
  if (from && to) return `${fmt(from)} \u2013 ${fmt(to)}`
  if (from) return `From ${fmt(from)}`
  return `Until ${fmt(to!)}`
}
