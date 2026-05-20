import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useFilterStore } from "@features/filters/model/useFilterStore";
import { StackTypeField, stackTypeFromLabel } from "@features/filters";

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
});
