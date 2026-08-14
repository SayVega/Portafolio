import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "transition-colors duration-200 text-white font-sans"
    : "transition-colors duration-200 text-zinc-400 hover:text-white font-sans";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <NavLink to="/" className="text-xl font-bold tracking-tight text-white font-display">
          Santiago Vega
        </NavLink>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} className={navLinkClass}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950/95 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={navLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}