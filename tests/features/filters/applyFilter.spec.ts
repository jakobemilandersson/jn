import { describe, it, expect } from "vitest";
import { applyFilters } from "@features/filters/lib/applyFilters";
import type { WorkExperience, Skill, YearMonth } from "@entities/resume/types";

// -----------------------------------------------------
// Minimal deterministic factories
// -----------------------------------------------------

const makeSkill = (presentation: string, stackType: "fullstack" | "backend" | "frontend" = "fullstack"): Skill => ({
  presentation,
  stackType,
});

const makeExp = (overrides: Partial<WorkExperience>): WorkExperience => ({
  id: "id",
  role: "Dev",
  company: "Corp",
  description: null,
  start: "2020-01" as YearMonth,
  end: "2021-01" as YearMonth,
  stackType: "fullstack",
  skills: [],
  ...overrides,
});

// -----------------------------------------------------
// Test dataset
// -----------------------------------------------------

const DATA: WorkExperience[] = [
  makeExp({
    id: "a",
    stackType: "fullstack",
    skills: [makeSkill("react"), makeSkill("ts")],
  }),

  makeExp({
    id: "b",
    stackType: "backend",
    skills: [makeSkill("ruby")],
  }),

  makeExp({
    id: "c",
    stackType: "frontend",
    skills: [makeSkill("react")],
  }),

  makeExp({
    id: "d",
    stackType: "backend",
    skills: [makeSkill("go"), makeSkill("docker")],
  }),
];

// -----------------------------------------------------
// Loose mode (strict = false)
// -----------------------------------------------------
describe("applyFilters — loose mode (ANY skill)", () => {
  it("returns all experiences when no filters are applied", () => {
    const res = applyFilters(DATA, [], [], false);
    expect(res.map(r => r.id)).toEqual(["a", "b", "c", "d"]);
  });

  it("filters by a single stackType", () => {
    const res = applyFilters(DATA, ["backend"], [], false);
    expect(res.map(r => r.id)).toEqual(["b", "d"]);
  });

  it("filters by multiple stackTypes (OR)", () => {
    const res = applyFilters(DATA, ["backend", "frontend"], [], false);
    expect(res.map(r => r.id)).toEqual(["b", "c", "d"]);
  });

  it("returns experiences matching ANY selected skill", () => {
    const res = applyFilters(DATA, [], ["react"], false);
    expect(res.map(r => r.id)).toEqual(["a", "c"]);
  });

  it("filters by BOTH stackTypes and ANY skill", () => {
    const res = applyFilters(DATA, ["backend"], ["docker"], false);
    expect(res.map(r => r.id)).toEqual(["d"]);
  });

  it("returns empty list when no experience matches ANY skill", () => {
    const res = applyFilters(DATA, [], ["unknown"], false);
    expect(res.length).toBe(0);
  });
});

// -----------------------------------------------------
// Strict mode (strict = true)
// -----------------------------------------------------
describe("applyFilters — strict mode (ALL skills)", () => {
  it("requires ALL selected skills to be present", () => {
    const res = applyFilters(DATA, [], ["react", "ts"], true);
    expect(res.map(r => r.id)).toEqual(["a"]);
  });

  it("returns empty when at least one required skill is missing", () => {
    const res = applyFilters(DATA, [], ["react", "ts", "go"], true);
    expect(res.length).toBe(0);
  });

  it("filters by BOTH stackTypes and ALL skills", () => {
    const res = applyFilters(DATA, ["fullstack"], ["react", "ts"], true);
    expect(res.map(r => r.id)).toEqual(["a"]);
  });

  it("does not match experiences missing any required skill", () => {
    const res = applyFilters(DATA, [], ["react", "ts"], true);
    expect(res.map(r => r.id)).toEqual(["a"]); // c has only react
  });

  it("treats one-skill strict mode the same as loose mode for one skill", () => {
    const res = applyFilters(DATA, [], ["ruby"], true);
    expect(res.map(r => r.id)).toEqual(["b"]);
  });
});

// -----------------------------------------------------
// Ordering by number of matching skills
// -----------------------------------------------------
describe("applyFilters — ordering by matching skill count", () => {
  it("orders results by number of matching skills (descending)", () => {
    const res = applyFilters(DATA, [], ["react", "ts"], false)
    expect(res.map(r => r.id)).toEqual(["a", "c"])
    // a matches 2 skills, c matches 1
  })

  it("keeps stable order when match counts are equal", () => {
    const res = applyFilters(DATA, [], ["react"], false)
    expect(res.map(r => r.id)).toEqual(["a", "c"])
    // both match 1 skill → preserve original order
  })

  it("orders backend results correctly when multiple matches exist", () => {
    const res = applyFilters(DATA, ["backend"], ["go", "docker"], false)
    expect(res.map(r => r.id)).toEqual(["d"])
  })
})

// -----------------------------------------------------
// Date interval filter
// -----------------------------------------------------
describe("applyFilters — date interval", () => {
  // Dataset with varied, non-overlapping periods:
  // exp-past:    2018-01 – 2019-06
  // exp-mid:     2020-03 – 2022-08
  // exp-recent:  2023-06 – 2024-12
  // exp-ongoing: 2024-01 – (no end, ongoing)
  const past    = makeExp({ id: "past",    start: "2018-01" as YearMonth, end: "2019-06" as YearMonth })
  const mid     = makeExp({ id: "mid",     start: "2020-03" as YearMonth, end: "2022-08" as YearMonth })
  const recent  = makeExp({ id: "recent",  start: "2023-06" as YearMonth, end: "2024-12" as YearMonth })
  const ongoing = makeExp({ id: "ongoing", start: "2024-01" as YearMonth, end: undefined })
  const DATE_DATA = [past, mid, recent, ongoing]

  it("returns all when no date filter is set", () => {
    const res = applyFilters(DATE_DATA, [], [], false)
    expect(res.map(r => r.id)).toEqual(["past", "mid", "recent", "ongoing"])
  })

  it("filters with dateFrom only — excludes roles that ended before the from date", () => {
    const res = applyFilters(DATE_DATA, [], [], false, "2020-01" as YearMonth, null)
    // past ended 2019-06, before 2020-01 → excluded
    expect(res.map(r => r.id)).toEqual(["mid", "recent", "ongoing"])
  })

  it("filters with dateTo only — excludes roles that started after the to date", () => {
    const res = applyFilters(DATE_DATA, [], [], false, null, "2022-12" as YearMonth)
    // recent started 2023-06, after 2022-12 → excluded; ongoing started 2024-01 → excluded
    expect(res.map(r => r.id)).toEqual(["past", "mid"])
  })

  it("filters with both dateFrom and dateTo — keeps only overlapping roles", () => {
    const res = applyFilters(DATE_DATA, [], [], false, "2020-01" as YearMonth, "2022-12" as YearMonth)
    expect(res.map(r => r.id)).toEqual(["mid"])
  })

  it("includes an ongoing role (no end) when its start is before dateTo", () => {
    const res = applyFilters(DATE_DATA, [], [], false, "2024-06" as YearMonth, "2025-01" as YearMonth)
    // recent: 2023-06–2024-12 overlaps; ongoing: 2024-01–∞ overlaps
    expect(res.map(r => r.id)).toEqual(["recent", "ongoing"])
  })

  it("includes a role that exactly starts on the dateTo boundary", () => {
    const res = applyFilters(DATE_DATA, [], [], false, null, "2023-06" as YearMonth)
    // recent starts exactly on 2023-06 → included
    expect(res.map(r => r.id)).toEqual(["past", "mid", "recent"])
  })

  it("includes a role that exactly ends on the dateFrom boundary", () => {
    const res = applyFilters(DATE_DATA, [], [], false, "2019-06" as YearMonth, null)
    // past ends exactly on 2019-06 → included
    expect(res.map(r => r.id)).toEqual(["past", "mid", "recent", "ongoing"])
  })

  it("returns empty when the interval is after all roles", () => {
    const res = applyFilters(DATE_DATA, [], [], false, "2030-01" as YearMonth, "2030-12" as YearMonth)
    expect(res.map(r => r.id)).toEqual([])
  })
})
