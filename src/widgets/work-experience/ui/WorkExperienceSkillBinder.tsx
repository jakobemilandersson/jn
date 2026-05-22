import type { Skill, StackType, WorkExperience } from "@entities/resume"
import { useFilterStore } from "@features/filters";
import { WorkExperienceCard } from "@widgets/work-experience"

type Props = {
    experience: WorkExperience;
    selectedSkills: string[];
    selectedStackTypes: StackType[];
    isOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}

export function WorkExperienceSkillBinder({ experience, selectedSkills, selectedStackTypes, isOpen, onOpen, onClose }: Props) {
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
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
        />
    )
}
