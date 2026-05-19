import type { Skill } from "@entities/resume";
import { getAllSkills } from "@entities/resume";
import type { OptionGroup } from "@shared/ui";

export const SKILL_OPTIONS: readonly Skill[] = Object.freeze(
  getAllSkills().sort((a, b) =>
    a.presentation.localeCompare(b.presentation)
  )
);

export function getSkillOptions(): string[] {
  return SKILL_OPTIONS.map(s => s.presentation);
}

const STACK_TYPE_ORDER = ["frontend", "backend", "fullstack"] as const;

const STACK_TYPE_LABELS: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  fullstack: "Fullstack",
};

export function getGroupedSkillOptions(): OptionGroup[] {
  return STACK_TYPE_ORDER
    .map(type => ({
      label: STACK_TYPE_LABELS[type],
      options: SKILL_OPTIONS
        .filter(s => s.stackType === type)
        .map(s => s.presentation),
    }))
    .filter(g => g.options.length > 0);
}
