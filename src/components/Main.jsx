import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";

const localProducts = [
  {
    id: "local-running-shoes",
    name: "Running Shoes",
    price: 89.99,
    description: "Lightweight and fast.",
    category: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    source: "featured",
  },
  {
    id: "local-yoga-mat",
    name: "Yoga Mat",
    price: 24.99,
    description: "Non-slip, 6mm thick.",
    category: "Fitness",
    image: "/yoga-mat.jpg",
    source: "featured",
  },
  {
    id: "local-water-bottle",
    name: "Water Bottle",
    price: 14.99,
    description: "Insulated, 750ml.",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    source: "featured",
  },
];

function Main({
  searchTerm = "",
  setSearchTerm = () => {},
  onAddToCart,
  wishlistIds = [],
  onToggleWishlist = () => {},
}) {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`Product request failed (${response.status}).`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("The product service returned an unexpected response.");
        }

        const formatted = data.map((product) => ({
          ...product,
          name: product.title,
          source: "api",
        }));

        if (!cancelled) setApiProducts(formatted);
      } catch (err) {
        console.error("Ronggrey Store product loading error:", err);
        if (!cancelled) {
          setError("We couldn't load the online collection. Check your connection and try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const allProducts = [...localProducts, ...apiProducts];
  const categories = ["All", ...new Set(allProducts.map((item) => item.category))];
  const query = String(searchTerm).trim().toLowerCase();

  const filteredProducts = allProducts.filter((product) => {
    const searchable = [
      product.name,
      product.title,
      product.category,
      product.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return (
      searchable.includes(query) &&
      (selectedCategory === "All" || product.category === selectedCategory)
    );
  });

  function viewDetails(product) {
    if (product.source === "featured") {
      setSelectedProduct(product);
    } else {
      navigate(`/product/${product.id}`, { state: { product } });
    }
  }

  function resetFilters() {
    setSelectedCategory("All");
    setSearchTerm("");
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] pb-16 text-slate-900">
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.38),_transparent_48%),radial-gradient(ellipse_at_bottom_left,_rgba(14,165,233,0.18),_transparent_42%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:py-24">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-sky-200">
              <span className="h-2 w-2 rounded-full bg-sky-300" />
              Everyday essentials, elevated
            </span>
            <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Find your next
              <span className="block text-sky-300">favourite wear.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Thoughtfully picked essentials for your everyday life. Discover
              something useful, beautiful, and made to fit your routine.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#collection"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 font-bold text-slate-950 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-sky-100"
              >
                Explore our collection <span className="ml-2" aria-hidden="true">→</span>
              </a>
              <span className="inline-flex items-center rounded-xl border border-white/15 px-5 py-3.5 text-sm font-medium text-slate-200">
               Carefully curated for everyday life
              </span>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm text-slate-300">
              <span><strong className="mr-2 text-white">20+</strong> online finds</span>
              <span><strong className="mr-2 text-white">3</strong> Top picks</span>
              <span><strong className="mr-2 text-white">Easy</strong> browsing</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md animate-fade-in-up">
            <div className="absolute -inset-5 rounded-[2rem] bg-blue-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.07] p-4 shadow-2xl backdrop-blur">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=85"
                alt="Modern retail store interior"
                className="h-[300px] w-full rounded-[1.5rem] object-cover sm:h-[360px]"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
              <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/20 bg-slate-950/75 p-4 backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-sky-300">The Ronggrey edit</p>
                <p className="mt-1 text-lg font-bold text-white">Good finds. Everyday value.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-12 sm:px-8 sm:pt-16" id="collection">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-blue-700">The collection</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Shop all products</h2>
            <p className="mt-3 max-w-xl text-slate-500">
              Browse our featured essentials alongside products from our online catalogue.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Products available</p>
            <p className="mt-1 text-2xl font-extrabold">{allProducts.length}</p>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <label htmlFor="product-search" className="sr-only">Search products</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400" aria-hidden="true">⌕</span>
              <input
                id="product-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search shoes, clothing, electronics..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
            {query && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-500" aria-live="polite">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> of {allProducts.length} products
          </p>
          {(query || selectedCategory !== "All") && (
            <button type="button" onClick={resetFilters} className="text-sm font-semibold text-blue-700 hover:text-blue-900">
              Reset filters
            </button>
          )}
        </div>

        {loading && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm font-medium text-blue-800">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-700" />
            Loading the online collection…
          </div>
        )}

        {error && (
          <div role="alert" className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            {error}
            <button type="button" onClick={() => window.location.reload()} className="ml-2 font-bold underline">
              Try again
            </button>
          </div>
        )}

        {filteredProducts.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="animate-card-entrance" style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}>
                <ProductCard
                  {...product}
                  isWishlisted={wishlistIds.some((id) => String(id) === String(product.id))}
                  onToggleWishlist={() => onToggleWishlist(product.id)}
                  onViewDetails={() => viewDetails(product)}
                  onAddToCart={() => onAddToCart?.(product)}
                />
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="text-4xl" aria-hidden="true">⌕</div>
              <h3 className="mt-4 text-xl font-bold">No matching products</h3>
              <p className="mt-2 text-slate-500">Try another search or clear your filters.</p>
              <button type="button" onClick={resetFilters} className="mt-5 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
                Show all products
              </button>
            </div>
          )
        )}
      </section>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedProduct.name}
            className="animate-modal-entrance w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-64 items-center justify-center bg-slate-50 p-8">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="h-full w-full object-contain" />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-700">{selectedProduct.category}</p>
              <h2 className="mt-2 text-2xl font-extrabold">{selectedProduct.name}</h2>
              <p className="mt-3 leading-7 text-slate-600">{selectedProduct.description}</p>
              <p className="mt-5 text-2xl font-black text-slate-950">€{Number(selectedProduct.price).toFixed(2)}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => onAddToCart?.(selectedProduct)} className="flex-1 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-800">
                  Add to cart
                </button>
                <button type="button" onClick={() => setSelectedProduct(null)} className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
                  Continue browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Main;
