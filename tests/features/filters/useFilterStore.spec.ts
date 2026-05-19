import { describe, it, expect, beforeEach } from "vitest";
import { useFilterStore } from "@features/filters/model/useFilterStore";

// Helper: reset Zustand store between tests
const resetStore = () => useFilterStore.setState({
  stackTypes: [],
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

    expect(state.stackTypes).toEqual([]);
    expect(state.skills).toEqual([]);
    expect(state.strictSkillsMatch).toBe(false);
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
  // clear()
  // -----------------------------------------------------
  it("resets stackTypes, skills, and strictSkillsMatch when clear() is called", () => {
    const state = useFilterStore.getState();

    state.toggleStackType("backend");
    state.setSkills(["X"]);
    state.setStrictSkillsMatch(true);

    state.clear();

    const cleared = useFilterStore.getState();
    expect(cleared.stackTypes).toEqual([]);
    expect(cleared.skills).toEqual([]);
    expect(cleared.strictSkillsMatch).toBe(false);
  });
});
