import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useFilterStore } from "@features/filters/model/useFilterStore";
import { StrictToggle } from "@features/filters/ui/StrictSkillsToggle";

const resetStore = () =>
  useFilterStore.setState({
    stackTypes: [],
    skills: [],
    strictSkillsMatch: false,
    dateFrom: null,
    dateTo: null,
  });

describe("StrictToggle", () => {
  beforeEach(() => resetStore());

  it("renders unchecked by default", () => {
    render(<StrictToggle />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("renders checked when store has strictSkillsMatch=true", () => {
    useFilterStore.setState({ strictSkillsMatch: true });
    render(<StrictToggle />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("calls setStrictSkillsMatch when toggled", () => {
    render(<StrictToggle />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(useFilterStore.getState().strictSkillsMatch).toBe(true);
  });
});
