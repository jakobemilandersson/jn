import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { WorkExperienceCard } from "@widgets/work-experience";
import type { WorkExperience, YearMonth } from "@entities/resume";

const experience: WorkExperience = {
  id: "1",
  kind: "work",
  role: "Frontend Dev",
  company: "Acme",
  stackType: "frontend",
  start: "2022-01" as YearMonth,
  skills: [
    { presentation: "React", stackType: "frontend" },
    { presentation: "TypeScript", stackType: "frontend" },
    { presentation: "PostgreSQL", stackType: "backend" },
  ],
  description: {
    title: "Built and maintained frontend systems",
    summary: "Built and maintained frontend systems for Acme.",
    fulltext: "Worked extensively with React and TypeScript.",
  },
};

describe("WorkExperienceCard", () => {
  it("keeps the full description and skills hidden until expanded", () => {
    render(<WorkExperienceCard experience={experience} selectedSkills={[]} selectedStackTypes={[]} isOpen={false} onOpen={vi.fn()} />);
    expect(screen.getByText("Built and maintained frontend systems")).toBeInTheDocument();
    expect(screen.queryByText(/Worked extensively with React/i)).not.toBeInTheDocument();
    expect(screen.queryByText("Technology & skills")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Expand details for Frontend Dev/i })).toHaveAttribute("aria-expanded", "false");
  });

  it("requests opening when the closed card action is clicked", () => {
    const onOpen = vi.fn();
    render(<WorkExperienceCard experience={experience} selectedSkills={[]} selectedStackTypes={[]} isOpen={false} onOpen={onOpen} />);
    fireEvent.click(screen.getByRole("button", { name: /Expand details for Frontend Dev/i }));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("renders description and all skills while expanded", () => {
    render(<WorkExperienceCard experience={experience} selectedSkills={[]} selectedStackTypes={[]} isOpen />);
    expect(screen.getByText(/Worked extensively with React/i)).toBeInTheDocument();
    expect(screen.getByText("Technology & skills")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
  });

  it("renders matched and other skill groups when a skill filter is active", () => {
    render(<WorkExperienceCard experience={experience} selectedSkills={["React"]} selectedStackTypes={[]} isOpen />);
    expect(screen.getByText("Matched skills")).toBeInTheDocument();
    expect(screen.getByText("Other skills")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
  });

  it("requests closing when expanded details are collapsed", () => {
    const onClose = vi.fn();
    render(<WorkExperienceCard experience={experience} selectedSkills={[]} selectedStackTypes={[]} isOpen onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /Collapse details for Frontend Dev/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("allows a skill chip to be used as a filter without toggling the card", () => {
    const onSkillPressed = vi.fn();
    const onClose = vi.fn();
    render(<WorkExperienceCard experience={experience} selectedSkills={[]} selectedStackTypes={[]} isOpen onSkillPressed={onSkillPressed} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "Filter by React" }));
    expect(onSkillPressed).toHaveBeenCalledWith(experience.skills[0]);
    expect(onClose).not.toHaveBeenCalled();
  });
});
