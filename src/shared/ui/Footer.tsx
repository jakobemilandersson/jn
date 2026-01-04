export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 py-6">
      <nav
        aria-label="External profiles"
        className="flex justify-center gap-6 text-sm text-neutral-500"
      >
        <a
          href="https://www.linkedin.com/in/jakob-emil-andersson"
          target="_blank"
          rel="me noopener"
          className="hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          LinkedIn
        </a>

        <a
          href="https://github.com/jakobemilandersson"
          target="_blank"
          rel="me noopener"
          className="hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          GitHub
        </a>
      </nav>
    </footer>
  );
}
