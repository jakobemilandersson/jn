import { describe, it, expect, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useFilterStore } from "@features/filters/model/useFilterStore";
import { useFilteredResume } from "@features/filters";
import type { WorkExperience, YearMonth } from "@entities/resume";

const resetStore = () =>
  useFilterStore.setState({
    stackTypes: [],
    skills: [],
    strictSkillsMatch: false,
    dateFrom: null,
    dateTo: null,
  });

const fe: WorkExperience = {
  id: "1",
  role: "Frontend Dev",
  company: "Acme",
  stackType: "frontend",
  skills: [{ presentation: "React", stackType: "frontend" }],
  start: "2022-01" as YearMonth,
};

const be: WorkExperience = {
  id: "2",
  role: "Backend Dev",
  company: "Acme",
  stackType: "backend",
  skills: [{ presentation: "Node", stackType: "backend" }],
  start: "2021-01" as YearMonth,
};

const data = [fe, be];

describe("useFilteredResume", () => {
  beforeEach(() => {
    resetStore();
  });

  it("returns all data when no filters are active", () => {
    const { result } = renderHook(() => useFilteredResume(data));
    expect(result.current).toHaveLength(2);
  });

  it("filters by stackType from the store", () => {
    useFilterStore.setState({ stackTypes: ["frontend"] });
    const { result } = renderHook(() => useFilteredResume(data));
    expect(result.current).toEqual([fe]);
  });

  it("filters by skill from the store", () => {
    useFilterStore.setState({ skills: ["Node"] });
    const { result } = renderHook(() => useFilteredResume(data));
    expect(result.current).toEqual([be]);
  });

  it("returns stable reference when store state is unchanged", () => {
    const { result, rerender } = renderHook(() => useFilteredResume(data));
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });
});
