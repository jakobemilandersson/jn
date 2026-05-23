import type { WorkExperience } from '@entities/resume';
import type { ExperienceKind } from '@entities/resume';
import type { SkillChipVariant } from '@shared/ui';

export type TimelineTag = {
  label: string;
  stackType: SkillChipVariant;
};

export type TimelineViewModel = {
  id: string;
  kind: ExperienceKind;
  title: string;
  subtitle?: string;
  start: string;
  end?: string;
  detail: string;
  url?: string;
  tags?: TimelineTag[];
};

export function toTimelineViewModels(
  experiences: WorkExperience[],
): TimelineViewModel[] {
  return experiences.map((exp) => ({
    id: exp.id,
    kind: exp.kind,
    title: exp.company
      ? `${exp.role} — ${exp.company}`
      : exp.role,
    subtitle: exp.subtitle,
    start: exp.start,
    end: exp.end,
    detail: exp.description?.summary ?? '',
    url: exp.url,
    tags: exp.skills.map((skill) => ({
      label: skill.presentation,
      stackType: skill.stackType as SkillChipVariant,
    })),
  }));
}
