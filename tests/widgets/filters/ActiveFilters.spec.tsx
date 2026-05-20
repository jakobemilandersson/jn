// tests/widgets/filters/ActiveFilters.spec.tsx
import { describe, it, expect, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useFilterStore } from "@features/filters/model/useFilterStore";
import { ActiveFilters } from "@widgets/filters";
import type { YearMonth } from "@entities/resume";

const resetStore = () =>
  useFilterStore.setState({
    stackTypes: [],
    skills: [],
    strictSkillsMatch: false,
    dateFrom: null,
    dateTo: null,
  });

describe("ActiveFilters", () => {
  beforeEach(() => {
    resetStore();
  });

  it("is visually hidden when all filters are empty", () => {
    render(<ActiveFilters />);
    const container = screen.getByRole("region", { hidden: true }) ??
      document.querySelector('[aria-live="polite"]');
    // The outermost div carries max-h-0 when nothing is active
    const el = document.querySelector('[aria-live="polite"]') as HTMLElement;
    expect(el).not.toBeNull();
    expect(el.className).toMatch(/max-h-0/);
  });

  it("renders a skill chip for each active skill", () => {
    useFilterStore.setState({ skills: ["React", "TypeScript"] });
    render(<ActiveFilters />);
    expect(screen.getByLabelText(/Remove React filter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Remove TypeScript filter/i)).toBeInTheDocument();
  });

  it("calls toggleSkill when a skill chip is clicked", () => {
    useFilterStore.setState({ skills: ["React"] });
    render(<ActiveFilters />);
    fireEvent.click(screen.getByLabelText(/Remove React filter/i));
    expect(useFilterStore.getState().skills).toEqual([]);
  });

  it("renders a stack type chip for each active stackType", () => {
    useFilterStore.setState({ stackTypes: ["frontend"] });
    render(<ActiveFilters />);
    expect(screen.getByLabelText(/Remove Frontend filter/i)).toBeInTheDocument();
  });

  it("calls toggleStackType when a stack type chip is clicked", () => {
    useFilterStore.setState({ stackTypes: ["frontend"] });
    render(<ActiveFilters />);
    fireEvent.click(screen.getByLabelText(/Remove Frontend filter/i));
    expect(useFilterStore.getState().stackTypes).toEqual([]);
  });

  it("renders a date chip when dateFrom is set", () => {
    useFilterStore.setState({ dateFrom: "2022-01" as YearMonth });
    render(<ActiveFilters />);
    expect(screen.getByLabelText(/Remove date interval filter/i)).toBeInTheDocument();
  });

  it("clears both date fields when the date chip is clicked", () => {
    useFilterStore.setState({
      dateFrom: "2022-01" as YearMonth,
      dateTo: "2023-12" as YearMonth,
    });
    render(<ActiveFilters />);
    fireEvent.click(screen.getByLabelText(/Remove date interval filter/i));
    expect(useFilterStore.getState().dateFrom).toBeNull();
    expect(useFilterStore.getState().dateTo).toBeNull();
  });
});
