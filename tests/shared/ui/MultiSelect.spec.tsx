import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MultiSelect } from "@shared/ui";

describe("MultiSelect", () => {
  const options = ["React", "Node", "TypeScript"];

  it("renders all options as buttons", () => {
    render(<MultiSelect label="Skills" options={options} selected={[]} onToggle={() => {}} />);
    options.forEach((opt) => {
      expect(screen.getByRole("button", { name: opt })).toBeInTheDocument();
    });
  });

  it("marks selected options with aria-pressed=true", () => {
    render(<MultiSelect label="Skills" options={options} selected={["React"]} onToggle={() => {}} />);
    expect(screen.getByRole("button", { name: "React" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Node" })).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onToggle with the option value when clicked", () => {
    const onToggle = vi.fn();
    render(<MultiSelect label="Skills" options={options} selected={[]} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole("button", { name: "Node" }));
    expect(onToggle).toHaveBeenCalledWith("Node");
  });
});
