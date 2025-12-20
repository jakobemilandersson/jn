import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkillChip } from "@shared/ui";

describe("SkillChip", () => {
  it("renders the label", () => {
    render(<SkillChip label="Python" variant="backend" />);
    expect(screen.getByText("Python")).toBeInTheDocument();
  });

  it("maps backend variant classes", () => {
    const { container } = render(
      <SkillChip label="node" variant="backend" />
    );
    expect(container.firstChild).toHaveClass("bg-green-100");
  });

  it("maps frontend variant classes", () => {
    const { container } = render(
      <SkillChip label="React" variant="frontend" />
    );
    expect(container.firstChild).toHaveClass("bg-purple-100");
  });

  it("maps fullstack variant classes", () => {
    const { container } = render(
      <SkillChip label="SomeRandomTool" variant="fullstack" />
    );
    expect(container.firstChild).toHaveClass("bg-blue-100");
  });
});
