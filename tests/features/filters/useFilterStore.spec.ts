import { describe, it, expect, beforeEach } from "vitest";
import { useFilterStore } from "@features/filters/model/useFilterStore";

// Helper: reset Zustand store between tests
const resetStore = () => useFilterStore.setState({
  stackType: null,
  skills: [],
  strictSkillsMatch: false,
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

    expect(state.stackType).toBeNull();
    expect(state.skills).toEqual([]);
    expect(state.strictSkillsMatch).toBe(false);
  });

  // -----------------------------------------------------
  // stackType
  // -----------------------------------------------------
  it("sets stackType when setStackType is called", () => {
    useFilterStore.getState().setStackType("frontend");

    expect(useFilterStore.getState().stackType).toBe("frontend");
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
  // clear()
  // -----------------------------------------------------
  it("resets stackType, skills, and strictSkillsMatch when clear() is called", () => {
    const state = useFilterStore.getState();

    state.setStackType("backend");
    state.setSkills(["X"]);
    state.setStrictSkillsMatch(true);

    state.clear();

    const cleared = useFilterStore.getState();
    expect(cleared.stackType).toBeNull();
    expect(cleared.skills).toEqual([]);
    expect(cleared.strictSkillsMatch).toBe(false);
  });
});
