import { useState, useRef, useEffect, useMemo } from "react";

export type OptionGroup = {
  label: string;
  options: string[];
};

type FlatProps = {
  options: string[];
  grouped?: never;
};

type GroupedProps = {
  grouped: OptionGroup[];
  options?: never;
};

export type SearchableMultiSelectProps = (FlatProps | GroupedProps) & {
  id: string;
  label: string;
  selected: string[];
  onChange: (next: string[]) => void;
};

export function SearchableMultiSelect({
  id,
  label,
  options,
  grouped,
  selected,
  onChange,
}: SearchableMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const allOptions = useMemo(
    () => grouped ? grouped.flatMap(g => g.options) : (options ?? []),
    [grouped, options]
  );

  const filteredFlat = useMemo(
    () => allOptions.filter(o => o.toLowerCase().includes(query.toLowerCase())),
    [allOptions, query]
  );

  const filteredGroups = useMemo(() => {
    if (!grouped) return null;
    return grouped
      .map(g => ({
        label: g.label,
        options: g.options.filter(o =>
          o.toLowerCase().includes(query.toLowerCase())
        ),
      }))
      .filter(g => g.options.length > 0);
  }, [grouped, query]);

  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter(v => v !== value)
        : [...selected, value]
    );
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  const triggerLabel =
    selected.length === 0
      ? null
      : `${label} \u00b7 ${selected.length}`;

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>

      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}${
          selected.length > 0 ? `, ${selected.length} selected` : ""
        }`}
        className="mt-1 w-full h-10 flex items-center justify-between gap-2 border border-gray-300 dark:border-gray-600 rounded px-3 text-left bg-white dark:bg-gray-800 text-black dark:text-gray-100 focus:ring focus:outline-none"
        onClick={() => setOpen(o => !o)}
      >
        <span className="truncate">
          {triggerLabel ?? (
            <span className="text-gray-500 dark:text-gray-400">Select skills…</span>
          )}
        </span>
        <svg
          aria-hidden="true"
          className="shrink-0 w-4 h-4 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 shadow-lg p-2">
          <input
            aria-label={`Search ${label}`}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 mb-2 text-sm bg-white dark:bg-gray-700 text-black dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            placeholder="Search…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />

          <ul role="listbox" aria-multiselectable="true" className="max-h-48 overflow-y-auto">
            {filteredGroups
              ? filteredGroups.map(group => (
                  <li key={group.label}>
                    <ul role="group" aria-label={group.label}>
                      <li
                        role="presentation"
                        className="px-2 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 select-none"
                      >
                        {group.label}
                      </li>
                      {group.options.map(option => (
                        <li
                          key={option}
                          role="option"
                          aria-selected={selected.includes(option)}
                          className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-gray-100"
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
                    </ul>
                  </li>
                ))
              : filteredFlat.map(option => (
                  <li
                    key={option}
                    role="option"
                    aria-selected={selected.includes(option)}
                    className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-gray-100"
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
                ))
            }

            {filteredFlat.length === 0 && (
              <li className="px-2 py-1 text-sm text-gray-500 dark:text-gray-400">
                No matches.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
