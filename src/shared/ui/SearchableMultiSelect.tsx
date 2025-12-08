import { useState, useRef, useEffect } from "react";

export type SearchableMultiSelectProps = {
  id: string,
  label: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
};

export function SearchableMultiSelect({
  id,
  label,
  options,
  selected,
  onChange,
}: SearchableMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = options.filter(o =>
    o.toLowerCase().includes(query.toLowerCase())
  );

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="block text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      {/* Control */}
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className="mt-1 w-full block border rounded px-3 py-2 text-left bg-inherit focus:ring focus:outline-none"
        onClick={() => setOpen(o => !o)}
      >
        {selected.length > 0 ? (
          <div className="inline-flex flex-wrap gap-1">
            {selected.map(s => (
              <span
                key={s}
                className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs"
              >
                {s}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-500">Select skills…</span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute z-20 mt-1 w-full border rounded bg-white shadow-lg p-2"
        >
          <input
            aria-label={`Search ${label}`}
            className="w-full border rounded px-2 py-1 mb-2 text-sm"
            placeholder="Search…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />

          <ul role="listbox" className="max-h-48 overflow-y-auto">
            {filtered.map(option => (
              <li
                key={option}
                role="option"
                aria-selected={selected.includes(option)}
                className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => toggle(option)}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggle(option)}
                  className="rounded"
                />
                <span>{option}</span>
              </li>
            ))}

            {filtered.length === 0 && (
              <li className="px-2 py-1 text-sm text-gray-500">
                No matches.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
