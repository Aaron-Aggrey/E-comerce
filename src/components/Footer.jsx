import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <Link to="/" className="inline-flex items-center gap-3 text-lg font-extrabold tracking-tight text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-black text-blue-800">R</span>
            Ronggrey <span className="text-sky-300">Store</span>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            Everyday essentials, thoughtfully selected. Find something useful for your everyday.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium">
          <Link to="/" className="transition hover:text-white">Home</Link>
          <Link to="/products" className="transition hover:text-white">Products</Link>
          <Link to="/about" className="transition hover:text-white">About</Link>
          <Link to="/cart" className="transition hover:text-white">Cart</Link>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-4 text-xs text-slate-500 sm:px-8">
          © {new Date().getFullYear()} Ronggrey Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
