import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";

function ProductList({
  searchTerm = "",
  onAddToCart,
  wishlistIds = [],
  onToggleWishlist,
}) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://fakestoreapi.com/products"
        );

        if (!response.ok) {
          throw new Error("Failed to load products.");
        }

        const data = await response.json();

        if (!cancelled) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleViewDetails(product) {
    navigate(`/product/${product.id}`, {
      state: { product },
    });
  }

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const normalizedSearch = String(searchTerm ?? "")
    .trim()
    .toLowerCase();

  const filteredProducts = products.filter((product) => {
    const searchableText = [
      product.title,
      product.category,
      product.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(normalizedSearch);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <section id="api-products" className="px-6 py-12 text-center">
        <p className="text-lg font-semibold text-blue-600">
          Loading products...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="api-products" className="px-6 py-12 text-center">
        <p className="text-red-600">{error}</p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Try again
        </button>
      </section>
    );
  }

  return (
    <section
      id="api-products"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
          Explore our collection
        </p>

        <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Products from Our API
        </h2>

        <p className="mt-3 text-gray-500">
          Discover our products and view their details.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            aria-pressed={selectedCategory === category}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="mb-5 text-sm text-gray-500" aria-live="polite">
        Showing {filteredProducts.length} of {products.length} API products
        {normalizedSearch && (
          <> matching "{String(searchTerm).trim()}"</>
        )}
      </p>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.title}
              price={product.price}
              description={product.description}
              image={product.image}
              category={product.category}
              isWishlisted={wishlistIds.some(
                (id) => String(id) === String(product.id)
              )}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={() => onAddToCart?.(product)}
              onViewDetails={() => handleViewDetails(product)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-gray-50 px-4 py-12 text-center">
          <p className="text-lg font-semibold text-gray-700">
            No API products found.
          </p>

          <p className="mt-2 text-gray-500">
            Try a different search term or select another category.
          </p>

          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
            }}
            className="mt-4 rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Reset category
          </button>
        </div>
      )}
    </section>
  );
}

export default ProductList;