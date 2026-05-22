/** A month+year string in "YYYY-MM" format, e.g. "2024-03". */
export type YearMonth = string & { readonly __brand: 'YearMonth' };

export type TimelineEventKind = 'work' | 'education' | 'project';

export type TimelineEvent = {
  id: string;
  kind: TimelineEventKind;
  title: string;
  subtitle?: string;
  start: YearMonth;
  end?: YearMonth;
  detail: string;
  url?: string;
  tags?: string[];
};
