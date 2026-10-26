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
      <label className="text-xs font-medium uppercase tracking-wide text-white/55" htmlFor={id}>
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
        className="mt-2 flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/20 px-3 text-left text-sm text-white transition hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        onClick={() => setOpen(o => !o)}
      >
        <span className="truncate">
          {triggerLabel ?? (
            <span className="text-white/35">Select…</span>
          )}
        </span>
        <svg
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-white/45 transition-transform"
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
        <div className="absolute z-30 mt-2 w-full rounded-xl border border-white/10 bg-[#111722] p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <input
            aria-label={`Search ${label}`}
            className="mb-2 w-full rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            placeholder="Search…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />

          <ul role="listbox" aria-multiselectable="true" className="max-h-56 overflow-y-auto">
            {filteredGroups
              ? filteredGroups.map(group => (
                  <li key={group.label}>
                    <ul role="group" aria-label={group.label}>
                      <li
                        role="presentation"
                        className="select-none px-2 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35"
                      >
                        {group.label}
                      </li>
                      {group.options.map(option => (
                        <li
                          key={option}
                          role="option"
                          aria-selected={selected.includes(option)}
                          className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm text-white/75 transition hover:bg-white/[0.07] hover:text-white"
                          onClick={() => toggle(option)}
                        >
                          <input
                            type="checkbox"
                            checked={selected.includes(option)}
                            onChange={() => toggle(option)}
                            className="h-4 w-4 rounded border-white/20 bg-black/30 text-sky-300 focus:ring-sky-300"
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
              <li className="px-2 py-3 text-sm text-white/40">
                No matches.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
