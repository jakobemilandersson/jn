import { describe, it, expect, beforeEach } from "vitest";
import { useFilterStore } from "@features/filters/model/useFilterStore";
import type { YearMonth } from "@entities/resume/types";

// Helper: reset Zustand store between tests
const resetStore = () => useFilterStore.setState({
  stackTypes: [],
  skills: [],
  strictSkillsMatch: false,
  dateFrom: null,
  dateTo: null,
});

describe("useFilterStore", () => {
  beforeEach(() => {
    resetStore();
  });

  // -----------------------------------------------------
  // Initialization
  // -----------------------------------------------------
  it("initializes with default filter values", () => {
    const state = useFilterStore.getState();

    expect(state.stackTypes).toEqual([]);
    expect(state.skills).toEqual([]);
    expect(state.strictSkillsMatch).toBe(false);
    expect(state.dateFrom).toBeNull();
    expect(state.dateTo).toBeNull();
  });

  // -----------------------------------------------------
  // stackTypes
  // -----------------------------------------------------
  it("adds a stackType when toggleStackType is called", () => {
    useFilterStore.getState().toggleStackType("frontend");

    expect(useFilterStore.getState().stackTypes).toEqual(["frontend"]);
  });

  it("removes a stackType when toggleStackType is called again with the same value", () => {
    useFilterStore.getState().toggleStackType("frontend");
    useFilterStore.getState().toggleStackType("frontend");

    expect(useFilterStore.getState().stackTypes).toEqual([]);
  });

  it("supports multiple stackTypes simultaneously", () => {
    useFilterStore.getState().toggleStackType("frontend");
    useFilterStore.getState().toggleStackType("backend");

    expect(useFilterStore.getState().stackTypes).toEqual(["frontend", "backend"]);
  });

  it("replaces the stackTypes array when setStackTypes is called", () => {
    useFilterStore.getState().setStackTypes(["frontend", "backend"]);
    expect(useFilterStore.getState().stackTypes).toEqual(["frontend", "backend"]);
  });

  // -----------------------------------------------------
  // skills
  // -----------------------------------------------------
  it("adds and removes skills via toggleSkill", () => {
    const { toggleSkill } = useFilterStore.getState();

    toggleSkill("React");
    expect(useFilterStore.getState().skills).toEqual(["React"]);

    toggleSkill("React"); // toggles off
    expect(useFilterStore.getState().skills).toEqual([]);
  });

  it("replaces the skills array when setSkills is called", () => {
    useFilterStore.getState().setSkills(["A", "B"]);
    expect(useFilterStore.getState().skills).toEqual(["A", "B"]);
  });

  // -----------------------------------------------------
  // strictSkillsMatch
  // -----------------------------------------------------
  it("sets strictSkillsMatch when setStrictSkillsMatch is called", () => {
    useFilterStore.getState().setStrictSkillsMatch(true);
    expect(useFilterStore.getState().strictSkillsMatch).toBe(true);
  });

  // -----------------------------------------------------
  // dateFrom / dateTo
  // -----------------------------------------------------
  it("sets dateFrom when setDateFrom is called", () => {
    useFilterStore.getState().setDateFrom("2023-01" as YearMonth);
    expect(useFilterStore.getState().dateFrom).toBe("2023-01");
  });

  it("clears dateFrom when setDateFrom is called with null", () => {
    useFilterStore.getState().setDateFrom("2023-01" as YearMonth);
    useFilterStore.getState().setDateFrom(null);
    expect(useFilterStore.getState().dateFrom).toBeNull();
  });

  it("sets dateTo when setDateTo is called", () => {
    useFilterStore.getState().setDateTo("2024-12" as YearMonth);
    expect(useFilterStore.getState().dateTo).toBe("2024-12");
  });

  it("clears dateTo when setDateTo is called with null", () => {
    useFilterStore.getState().setDateTo("2024-12" as YearMonth);
    useFilterStore.getState().setDateTo(null);
    expect(useFilterStore.getState().dateTo).toBeNull();
  });

  // -----------------------------------------------------
  // clear()
  // -----------------------------------------------------
  it("resets all filter state when clear() is called", () => {
    const state = useFilterStore.getState();

    state.toggleStackType("backend");
    state.setSkills(["X"]);
    state.setStrictSkillsMatch(true);
    state.setDateFrom("2022-01" as YearMonth);
    state.setDateTo("2023-12" as YearMonth);

    state.clear();

    const cleared = useFilterStore.getState();
    expect(cleared.stackTypes).toEqual([]);
    expect(cleared.skills).toEqual([]);
    expect(cleared.strictSkillsMatch).toBe(false);
    expect(cleared.dateFrom).toBeNull();
    expect(cleared.dateTo).toBeNull();
  });
});
