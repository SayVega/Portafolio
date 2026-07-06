import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
        ? "transition-colors duration-200 text-white"
        : "transition-colors duration-200 text-zinc-400 hover:text-white";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <NavLink to="/" className="text-xl font-bold tracking-tight text-white">
          Santiago Vega
        </NavLink>

        <ul className="flex items-center gap-8">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} className={navLinkClass}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}