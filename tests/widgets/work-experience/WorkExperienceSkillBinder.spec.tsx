import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import type { Skill, WorkExperience, YearMonth } from "@entities/resume";

import { WorkExperienceSkillBinder } from "@widgets/work-experience";

// --- mock Zustand store ---
const toggleSkill = vi.fn();

vi.mock("@features/filters/model/useFilterStore", () => ({
    useFilterStore: () => ({
        toggleSkill,
    }),
}));

describe("WorkExperienceSkillBinder", () => {
    beforeEach(() => {
        toggleSkill.mockClear();
    });

    const skill: Skill = {
        presentation: "React",
        stackType: "frontend",
    };

    const experience: WorkExperience = {
        id: "1",
        role: "Frontend Developer",
        company: "ACME",
        stackType: "frontend",
        skills: [skill],
        start: "2022-01" as YearMonth,
        description: null,
    };

    it("calls toggleSkill with skill.presentation when a skill chip is pressed", async () => {
        const user = userEvent.setup();

        // isOpen=true renders the sheet immediately; this test is about the
        // skill-press wiring, not the open/close lifecycle.
        render(
            <WorkExperienceSkillBinder
                experience={experience}
                selectedSkills={[]}
                selectedStackTypes={[]}
                isOpen={true}
            />
        );

        // Skill label must be visible inside the open sheet
        const chip = screen.getByText("React");

        await user.click(chip);

        expect(toggleSkill).toHaveBeenCalledTimes(1);
        expect(toggleSkill).toHaveBeenCalledWith("React");
    });
});
