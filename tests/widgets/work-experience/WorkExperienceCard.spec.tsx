// tests/widgets/work-experience/WorkExperienceCard.spec.tsx
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
  it("opens description sheet when the read-more button is clicked", () => {
    const onOpen = vi.fn();

    render(
      <WorkExperienceCard
        experience={experience}
        selectedSkills={[]}
        selectedStackTypes={[]}
        isOpen={false}
        onOpen={onOpen}
      />
    );

    const toggle = screen.getByRole("button", {
      name: /Read more about Frontend Dev/i,
    });

    // Sheet not yet open — fulltext not in the document
    expect(
      screen.queryByText(/Worked extensively with React/i)
    ).not.toBeInTheDocument();

    fireEvent.click(toggle);

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("renders sheet content when isOpen is true", () => {
    render(
      <WorkExperienceCard
        experience={experience}
        selectedSkills={[]}
        selectedStackTypes={[]}
        isOpen={true}
      />
    );

    expect(
      screen.getByText(/Worked extensively with React/i)
    ).toBeInTheDocument();
  });

  it("renders the dialog into document.body via portal", () => {
    render(
      <WorkExperienceCard
        experience={experience}
        selectedSkills={[]}
        selectedStackTypes={[]}
        isOpen={true}
      />
    );

    const dialog = screen.getByRole("dialog");
    expect(document.body).toContainElement(dialog);
  });

  it("renders a single flat Skills section when no skills are selected", () => {
    render(
      <WorkExperienceCard
        experience={experience}
        selectedSkills={[]}
        selectedStackTypes={[]}
        isOpen={true}
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
        isOpen={true}
      />
    );

    expect(screen.getByText("Matched skills")).toBeInTheDocument();
    expect(screen.getByText("Other skills")).toBeInTheDocument();

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
  });

  it("calls onOpen when the read-more button is clicked", () => {
    const onOpen = vi.fn();

    render(
      <WorkExperienceCard
        experience={experience}
        selectedSkills={[]}
        selectedStackTypes={[]}
        isOpen={false}
        onOpen={onOpen}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: /Read more about Frontend Dev/i })
    );

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the sheet close action is triggered", () => {
    const onClose = vi.fn();

    render(
      <WorkExperienceCard
        experience={experience}
        selectedSkills={[]}
        selectedStackTypes={[]}
        isOpen={true}
        onClose={onClose}
      />
    );

    // BottomSheet renders a close button with aria-label containing "Close"
    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
