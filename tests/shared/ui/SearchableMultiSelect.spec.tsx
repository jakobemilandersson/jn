import { render, screen, fireEvent } from "@testing-library/react";
import { SearchableMultiSelect } from "@shared/ui/SearchableMultiSelect";

describe("SearchableMultiSelect", () => {
  it("filters options based on query", () => {
    const onChange = vi.fn();
    render(
      <SearchableMultiSelect
        id="skills"
        label="Skills"
        options={["Ruby", "React", "Python"]}
        selected={[]}
        onChange={onChange}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    fireEvent.change(screen.getByPlaceholderText("Search…"), {
      target: { value: "py" },
    });

    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.queryByText("Ruby")).toBeNull();
  });
});
