
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState(
    location.state?.product?.id === Number(id)
      ? location.state.product
      : null
  );

  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchProduct() {
      // Use the product passed from the product list when available.
      if (location.state?.product?.id === Number(id)) {
        setProduct(location.state.product);
        setLoading(false);
        setError("");
        return;
      }

      setLoading(true);
      setError("");
      setProduct(null);

      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("We couldn't find this product.");
        }

        const data = await response.json();

        if (!data || !data.id) {
          throw new Error("Product not found.");
        }

        if (!cancelled) {
          setProduct(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "Something went wrong while loading the product."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [id, location.state]);

  function handleQuantityChange(amount) {
    setQuantity((current) => Math.max(1, current + amount));
    setAdded(false);
  }

  function handleAddToCart() {
    if (!product || !onAddToCart) return;

    // existing cart handler adds one product per call.
    // Call it once for each unit selected.
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }

    setAdded(true);
  }

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
          <p className="text-lg font-semibold text-gray-700">
            Loading product details...
          </p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-8">
          <p className="text-lg font-bold text-red-700">
            {error || "Product not found."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  const rating = Number(product.rating?.rate) || 0;
  const reviewCount = Number(product.rating?.count) || 0;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <button
            onClick={() => navigate("/")}
            className="transition hover:text-blue-600"
          >
            Home
          </button>

          <span>/</span>

          <span className="capitalize">
            {product.category}
          </span>

          <span>/</span>

          <span className="max-w-xs truncate font-medium text-gray-800">
            {product.title}
          </span>
        </nav>

        {/* Product details card */}
        <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60">
          <div className="grid grid-cols-1 gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-12">
            {/* Product image */}
            <div className="flex min-h-[320px] items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 sm:min-h-[480px] sm:p-12">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-[420px] w-full object-contain drop-shadow-lg transition duration-500 hover:scale-105"
              />
            </div>

            {/* Product information */}
            <div className="flex flex-col justify-center py-2">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                  {product.category}
                </span>

                <span className="rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
                  In Stock
                </span>
              </div>

              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <div
                  className="flex items-center gap-0.5 text-xl text-amber-400"
                  aria-label={`Rated ${rating} out of 5`}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= Math.round(rating)
                          ? "text-amber-400"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                <span className="font-bold text-gray-800">
                  {rating.toFixed(1)}
                </span>

                <span className="text-sm text-gray-500">
                  ({reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-7 border-y border-gray-100 py-6">
                <p className="text-sm font-medium text-gray-500">
                  Our price
                </p>

                <div className="mt-1 flex flex-wrap items-baseline gap-3">
                  <span className="text-4xl font-extrabold tracking-tight text-gray-900">
                    ${Number(product.price).toFixed(2)}
                  </span>

                  <span className="text-sm text-gray-500">
                    USD
                  </span>
                </div>

                <p className="mt-2 text-sm text-green-700">
                  Great choice for your collection
                </p>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h2 className="text-lg font-bold text-gray-900">
                  Product Description
                </h2>

                <p className="mt-3 text-base leading-7 text-gray-600">
                  {product.description}
                </p>
              </div>

              {/* Quantity selector */}
              <div className="mt-8">
                <p className="mb-3 text-sm font-bold text-gray-800">
                  Quantity
                </p>

                <div className="inline-flex items-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="flex h-12 w-12 items-center justify-center text-xl font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    −
                  </button>

                  <span
                    className="flex h-12 min-w-14 items-center justify-center border-x border-gray-200 px-4 font-bold text-gray-900"
                    aria-live="polite"
                  >
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    aria-label="Increase quantity"
                    className="flex h-12 w-12 items-center justify-center text-xl font-semibold text-gray-700 transition hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <div className="mt-7">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!onAddToCart}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>

                  Add {quantity} to Cart — $
                  {(Number(product.price) * quantity).toFixed(2)}
                </button>

                {added && (
                  <p
                    role="status"
                    className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-center font-semibold text-green-700"
                  >
                    ✓ {quantity}{" "}
                    {quantity === 1 ? "item" : "items"} added to your cart!
                  </p>
                )}
              </div>

              {/* Benefits */}
              <div className="mt-7 grid grid-cols-1 gap-3 border-t border-gray-100 pt-6 sm:grid-cols-2">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-700">
                    ✓
                  </span>
                  Quality products
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                    ↻
                  </span>
                  Easy shopping
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <span aria-hidden="true">←</span>
            Back to Products
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
