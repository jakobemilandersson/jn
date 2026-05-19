import type { Skill, StackType, WorkExperience } from "@entities/resume"
import { useFilterStore } from "@features/filters";
import { WorkExperienceCard } from "@widgets/work-experience"

type Props = {
    experience: WorkExperience;
    selectedSkills: string[];
    selectedStackTypes: StackType[];
}

export function WorkExperienceSkillBinder({ experience, selectedSkills, selectedStackTypes }: Props) {
    const { toggleSkill } = useFilterStore();

    const handleSkillPress = (skill: Skill) => {
        toggleSkill(skill.presentation);
    }

    return (
        <WorkExperienceCard
            experience={experience}
            selectedSkills={selectedSkills}
            selectedStackTypes={selectedStackTypes}
            onSkillPressed={handleSkillPress}
        />
    )
}
