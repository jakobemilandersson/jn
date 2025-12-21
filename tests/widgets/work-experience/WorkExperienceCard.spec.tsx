// tests/widgets/work-experience/WorkExperienceCard.spec.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WorkExperienceCard } from "@widgets/work-experience";
import type { WorkExperience } from "@entities/resume";

const experience: WorkExperience = {
  id: "1",
  role: "Frontend Dev",
  company: "Acme",
  stackType: "frontend",
  start: "2022-01",
  skills: [
    { presentation: "React", stackType: "frontend" },
    { presentation: "TypeScript", stackType: "frontend" },
    { presentation: "PostgreSQL", stackType: "backend" },
  ],
};

describe("WorkExperienceCard", () => {
  it("renders a single flat Skills section when no skills are selected", () => {
    render(
      <WorkExperienceCard
        experience={experience}
        selectedSkills={[]}
        selectedStackType={null}
      />
    );

    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.queryByText("Matched skills")).toBeNull();
    expect(screen.queryByText("Other skills")).toBeNull();

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
  });

  it("renders matched and other skill groups when skills are selected", () => {
    render(
      <WorkExperienceCard
        experience={experience}
        selectedSkills={["React"]}
        selectedStackType={null}
      />
    );

    expect(screen.getByText("Matched skills")).toBeInTheDocument();
    expect(screen.getByText("Other skills")).toBeInTheDocument();

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
  });
});
