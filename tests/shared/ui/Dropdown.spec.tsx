import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Dropdown } from "@shared/ui";

const OPTIONS = [
  { value: "a" as const, label: "Option A" },
  { value: "b" as const, label: "Option B" },
];

describe("Dropdown", () => {
  it("renders label and all options including the default", () => {
    render(<Dropdown id="d" label="Choose" value="" options={OPTIONS} onChange={() => {}} />);
    expect(screen.getByLabelText(/choose/i)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Any" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Option A" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Option B" })).toBeInTheDocument();
  });

  it("calls onChange with the selected value", () => {
    const onChange = vi.fn();
    render(<Dropdown id="d" label="Choose" value="" options={OPTIONS} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText(/choose/i), { target: { value: "b" } });
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("reflects the controlled value", () => {
    render(<Dropdown id="d" label="Choose" value="a" options={OPTIONS} onChange={() => {}} />);
    expect((screen.getByLabelText(/choose/i) as HTMLSelectElement).value).toBe("a");
  });
});
