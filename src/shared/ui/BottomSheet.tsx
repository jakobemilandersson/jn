import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export function BottomSheet({ isOpen, onClose, title, children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Two-phase mount with double-rAF:
  // 1. isMounted true  → element renders in off-screen position (translate-y-full)
  // 2. Two rAFs later  → isVisible true → CSS transition animates it into view
  // A single rAF is not always enough on Android — the browser may batch the
  // style recalc and skip the intermediate paint, losing the transition.
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // Both rAF handles are captured so the cleanup can cancel either,
      // regardless of which frame boundary the effect teardown fires on.
      let raf2: number;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setIsVisible(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    } else {
      setIsVisible(false);
      const id = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(id);
    }
  }, [isOpen]);

  // Focus the close button when the sheet opens
  useEffect(() => {
    if (isOpen) {
      closeBtnRef.current?.focus();
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Trap focus inside panel
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
    // panelRef is a stable ref object; including it satisfies exhaustive-deps without causing re-runs
  }, [isOpen, panelRef]);

  if (!isMounted) return null;

  return createPortal(
    <>
      {/* Panel — slides in from the right on md+, slides up from bottom on mobile.
          Rendered via createPortal into document.body so z-50 is evaluated in the
          root stacking context and always paints above the navbar (z-20).
          On desktop the top edge is offset to md:top-20 (80px) so the sheet sits
          just below the navbar with a small gap rather than running behind it. */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`
          fixed z-50 flex flex-col
          bg-gray-900 text-white shadow-xl
          transition-transform duration-300 ease-in-out
          bottom-14 left-0 right-0 max-h-[calc(85dvh-56px)] rounded-t-2xl
          md:top-20 md:bottom-0 md:right-0 md:left-auto md:w-[480px] md:max-h-none md:rounded-2xl
          ${
            isVisible
              ? "translate-y-0 md:translate-x-0"
              : "translate-y-full md:translate-y-0 md:translate-x-full"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-sm font-semibold text-white/90 leading-snug">{title}</h2>
          <button
            ref={closeBtnRef}
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded p-1 text-white/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable body — overscroll-contain prevents scroll chaining to the page */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          {children}
        </div>
      </div>
    </>,
    document.body
  );
}
