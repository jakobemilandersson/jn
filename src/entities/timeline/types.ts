import type { YearMonth } from '@entities/resume';

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
