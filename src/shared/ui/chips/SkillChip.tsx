import { Skill } from "entities/resume";
import React from "react";

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

function inferVariant(skill: Skill): SkillChipVariant {
  return skill.stackType;
}

export function SkillChip({ skill, className = "" }: SkillChipProps) {
  const variant = inferVariant(skill);
  const variantClasses = VARIANT_STYLES[variant];

  return (
    <div
      role="presentation"
      className={
        `px-2 py-0.5 rounded text-xs font-medium inline-block ${variantClasses} ${className}`
      }
    >
      {skill.presentation}
    </div>
  );
}
