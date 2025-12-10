// tests/shared/ui/chips/SkillChip.spec.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkillChip } from "../../../../src/shared/ui/chips";

describe("SkillChip", () => {
  it("renders the label", () => {
    render(<SkillChip label="Python" />);
    expect(screen.getByText("Python")).toBeInTheDocument();
  });

  it("maps node to backend variant classes", () => {
    const { container } = render(<SkillChip label="node" />);
    expect(container.firstChild).toHaveClass("bg-green-100");
  });

  it("maps react to frontend variant classes", () => {
    const { container } = render(<SkillChip label="React" />);
    expect(container.firstChild).toHaveClass("bg-purple-100");
  });

  it("falls back to fullstack for unknown skill", () => {
    const { container } = render(<SkillChip label="SomeRandomTool" />);
    expect(container.firstChild).toHaveClass("bg-blue-100");
  });
});
