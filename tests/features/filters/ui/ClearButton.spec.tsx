import { describe, it, expect, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useFilterStore, ClearButton } from "@features/filters";
import type { YearMonth } from "@entities/resume";

const resetStore = () =>
  useFilterStore.setState({
    stackTypes: [],
    skills: [],
    strictSkillsMatch: false,
    dateFrom: null,
    dateTo: null,
  });

describe("ClearButton", () => {
  beforeEach(() => resetStore());

  it("renders a button labelled 'Clear filters'", () => {
    render(<ClearButton />);
    expect(screen.getByRole("button", { name: /clear filters/i })).toBeInTheDocument();
  });

  it("calls store.clear() when clicked", () => {
    useFilterStore.setState({
      skills: ["React"],
      stackTypes: ["frontend"],
      strictSkillsMatch: true,
      dateFrom: "2022-01" as YearMonth,
      dateTo: "2023-12" as YearMonth,
    });
    render(<ClearButton />);
    fireEvent.click(screen.getByRole("button", { name: /clear filters/i }));
    const state = useFilterStore.getState();
    expect(state.skills).toEqual([]);
    expect(state.stackTypes).toEqual([]);
    expect(state.strictSkillsMatch).toBe(false);
    expect(state.dateFrom).toBeNull();
    expect(state.dateTo).toBeNull();
  });
});
