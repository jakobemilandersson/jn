import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";
import { useFilterStore, DateIntervalField } from "@features/filters";
import type { YearMonth } from "@entities/resume";

// Mock only MonthRangePicker so we can drive onChange without a full calendar UI.
// importOriginal spreads all real exports so nothing else in @shared/ui is affected.
vi.mock("@shared/ui", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@shared/ui")>();
  return {
    ...actual,
    MonthRangePicker: ({
      onChange,
    }: {
      onChange: (v: { from: string | null; to: string | null }) => void;
    }) => (
      <>
        <button
          data-testid="set-range"
          onClick={() => onChange({ from: "2022-03", to: "2023-06" })}
        >
          Set range
        </button>
        <button
          data-testid="set-invalid-range"
          onClick={() => onChange({ from: "2023-06", to: "2022-03" })}
        >
          Set invalid range
        </button>
        <button
          data-testid="clear-range"
          onClick={() => onChange({ from: null, to: null })}
        >
          Clear
        </button>
      </>
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

describe("DateIntervalField", () => {
  beforeEach(() => resetStore());

  it("sets dateFrom and dateTo when a valid range is selected", () => {
    const { getByTestId } = render(<DateIntervalField />);
    getByTestId("set-range").click();
    const state = useFilterStore.getState();
    expect(state.dateFrom).toBe("2022-03");
    expect(state.dateTo).toBe("2023-06");
  });

  it("clears dateTo when to is before from", () => {
    const { getByTestId } = render(<DateIntervalField />);
    getByTestId("set-invalid-range").click();
    const state = useFilterStore.getState();
    expect(state.dateFrom).toBe("2023-06");
    expect(state.dateTo).toBeNull();
  });

  it("clears both dates when a null range is selected", () => {
    useFilterStore.setState({
      dateFrom: "2022-01" as YearMonth,
      dateTo: "2023-12" as YearMonth,
    });
    const { getByTestId } = render(<DateIntervalField />);
    getByTestId("clear-range").click();
    const state = useFilterStore.getState();
    expect(state.dateFrom).toBeNull();
    expect(state.dateTo).toBeNull();
  });
});
