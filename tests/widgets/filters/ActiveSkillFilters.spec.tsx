// tests/widgets/filters/ActiveSkillFilters.spec.tsx
import { describe, it, expect, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useFilterStore } from "@features/filters/model/useFilterStore";
import { ActiveSkillFilters } from "@widgets/filters/ui/ActiveSkillFilters";
import type { YearMonth } from "@entities/resume";

const resetStore = () =>
  useFilterStore.setState({
    stackTypes: [],
    skills: [],
    strictSkillsMatch: false,
    dateFrom: null,
    dateTo: null,
  });

describe("ActiveSkillFilters", () => {
  beforeEach(() => {
    resetStore();
  });

  it("is visually hidden when no skills are active", () => {
    render(<ActiveSkillFilters />);
    const el = document.querySelector('[aria-live="polite"]') as HTMLElement;
    expect(el).not.toBeNull();
    expect(el.className).toMatch(/max-h-0/);
  });

  it("renders a chip for each active skill", () => {
    useFilterStore.setState({ skills: ["React"] });
    render(<ActiveSkillFilters />);
    expect(screen.getByLabelText(/Remove React filter/i)).toBeInTheDocument();
  });

  it("calls toggleSkill when a chip is clicked", () => {
    useFilterStore.setState({ skills: ["React"] });
    render(<ActiveSkillFilters />);
    fireEvent.click(screen.getByLabelText(/Remove React filter/i));
    expect(useFilterStore.getState().skills).toEqual([]);
  });
});
