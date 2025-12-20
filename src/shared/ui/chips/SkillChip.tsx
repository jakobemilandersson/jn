import type { Skill } from "@entities/resume";

export type SkillChipVariant = "frontend" | "backend" | "fullstack";

export type SkillChipProps = {
  skill: Skill;
  className?: string;
};

const VARIANT_STYLES: Record<SkillChipVariant, string> = {
  frontend: "bg-purple-100 text-purple-700",
  backend: "bg-green-100 text-green-700",
  fullstack: "bg-blue-100 text-blue-700",
};

export function SkillChip({ skill, className = "" }: SkillChipProps) {
  const variantClasses = VARIANT_STYLES[skill.stackType];
  return (
    <div role="presentation" className={`px-2 py-0.5 rounded text-xs font-medium inline-block ${variantClasses} ${className}`}>
      {skill.presentation}
    </div>
  )
}

