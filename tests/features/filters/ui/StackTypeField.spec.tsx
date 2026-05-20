import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useFilterStore, StackTypeField, stackTypeFromLabel } from "@features/filters";

// Mock SearchableMultiSelect to a simple select so we can fire onChange directly
// without the full combobox implementation.
vi.mock("@shared/ui", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@shared/ui")>();
  return {
    ...actual,
    SearchableMultiSelect: ({
      id,
      label,
      options,
      onChange,
    }: {
      id: string;
      label: string;
      options: string[];
      onChange: (selected: string[]) => void;
    }) => (
      <select
        aria-label={label}
        id={id}
        multiple
        onChange={(e) =>
          onChange(
            Array.from(e.target.selectedOptions).map((o) => o.value)
          )
        }
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    ),
  };
});

const resetStore = () =>
  useFilterStore.setState({
    stackTypes: [],
    skills: [],
    strictSkillsMatch: false,
    dateFrom: null,
    dateTo: null,
  });

describe("stackTypeFromLabel", () => {
  it("maps label strings back to StackType values", () => {
    expect(stackTypeFromLabel("Frontend")).toBe("frontend");
    expect(stackTypeFromLabel("Backend")).toBe("backend");
    expect(stackTypeFromLabel("Fullstack")).toBe("fullstack");
  });

  it("returns undefined for unknown labels", () => {
    expect(stackTypeFromLabel("Unknown")).toBeUndefined();
  });
});

describe("StackTypeField", () => {
  beforeEach(() => resetStore());

  it("renders the stack type selector", () => {
    render(<StackTypeField />);
    expect(screen.getByLabelText(/stack type/i)).toBeInTheDocument();
  });

  it("handleChange resolves label strings and calls setStackTypes", () => {
    const { getByLabelText } = render(<StackTypeField />);
    const select = getByLabelText(/stack type/i) as HTMLSelectElement;

    // Select 'Frontend' option
    Array.from(select.options).forEach((o) => {
      o.selected = o.value === "Frontend";
    });
    select.dispatchEvent(new Event("change", { bubbles: true }));

    expect(useFilterStore.getState().stackTypes).toEqual(["frontend"]);
  });
});
