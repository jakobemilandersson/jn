// tests/widgets/work-experience/WorkExperienceCard.spec.tsx
import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
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
  description: {
    title: "Built and maintained frontend systems",
    fulltext: "Worked extensively with React and TypeScript.",
  },
};

describe("WorkExperienceCard", () => {
  it("opens description sheet when the read-more button is clicked", () => {
    render(
      <WorkExperienceCard
        experience={experience}
        selectedSkills={[]}
        selectedStackTypes={[]}
      />
    );

    const toggle = screen.getByRole("button", {
      name: /Read full description for Frontend Dev/i,
    });

    // Sheet not yet open — fulltext not in the document
    expect(
      screen.queryByText(/Worked extensively with React/i)
    ).not.toBeInTheDocument();

    fireEvent.click(toggle);

    // Sheet is mounted — fulltext is now present
    expect(
      screen.getByText(/Worked extensively with React/i)
    ).toBeInTheDocument();
  });


  it("renders a single flat Skills section when no skills are selected", () => {
    render(
      <WorkExperienceCard
        experience={experience}
        selectedSkills={[]}
        selectedStackTypes={[]}
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
        selectedStackTypes={[]}
      />
    );

    expect(screen.getByText("Matched skills")).toBeInTheDocument();
    expect(screen.getByText("Other skills")).toBeInTheDocument();

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
  });
});
