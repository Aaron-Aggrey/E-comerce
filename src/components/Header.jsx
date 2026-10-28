
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header({ cartCount = 0, wishlistCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
      isActive
        ? "bg-white/15 text-white"
        : "text-blue-100 hover:bg-white/10 hover:text-white"
    }`;

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-r from-slate-950 via-blue-950 to-blue-800 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-3"
          aria-label="Ronggrey Store home"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-black text-blue-700 shadow-md">
            R
          </span>

          <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
            Ronggrey <span className="text-sky-300">Store</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
        </nav>

        {/* Wishlist and cart */}
        <div className="flex items-center gap-2">
          <Link
            to="/#products"
            className="relative rounded-xl p-2.5 text-xl transition hover:bg-white/10"
            aria-label={`Wishlist, ${wishlistCount} items`}
            title="Wishlist"
          >
            <span aria-hidden="true">♡</span>

            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-bold text-white">
              {wishlistCount}
            </span>
          </Link>

          <Link
            to="/cart"
            onClick={closeMenu}
            className="relative rounded-xl p-2.5 text-xl transition hover:bg-white/10"
            aria-label={`Shopping cart, ${cartCount} items`}
            title="Shopping cart"
          >
            <span aria-hidden="true">🛒</span>

            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-400 px-1 text-xs font-extrabold text-slate-950">
              {cartCount}
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            className="ml-1 rounded-xl border border-white/20 px-3 py-2 text-xl transition hover:bg-white/10 md:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-white/10 bg-slate-950 px-4 py-3 md:hidden"
        >
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={navLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            onClick={closeMenu}
            className={navLinkClass}
          >
            Products
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMenu}
            className={navLinkClass}
          >
            About
          </NavLink>

          <NavLink
            to="/cart"
            onClick={closeMenu}
            className={navLinkClass}
          >
            Shopping Cart ({cartCount})
          </NavLink>
        </nav>
      )}
    </header>
  );
}

export default Header;
