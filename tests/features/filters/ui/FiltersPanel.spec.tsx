import { describe, it, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { useFilterStore, FiltersPanel } from "@features/filters";

const resetStore = () =>
  useFilterStore.setState({
    stackTypes: [],
    skills: [],
    strictSkillsMatch: false,
    dateFrom: null,
    dateTo: null,
  });

describe("FiltersPanel", () => {
  beforeEach(() => resetStore());

  it("renders without crashing", () => {
    // Smoke test — confirms all sub-fields compose correctly.
    // Individual field behaviour is tested in their own specs.
    render(<FiltersPanel />);
  });
});
