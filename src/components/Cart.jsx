
import { Link } from "react-router-dom";

function Cart({
  cart = [],
  cartCount = 0,
  cartTotal = 0,
  updateQuantity,
  removeFromCart,
  clearCart,
}) {
  if (cart.length === 0) {
    return (
      <main className="min-h-[65vh] bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="text-6xl">🛒</div>

          <h1 className="mt-5 text-3xl font-extrabold text-slate-900">
            Your cart is empty
          </h1>

          <p className="mt-3 text-slate-500">
            Discover something you love and add it to your cart.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-block rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[65vh] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Ronggrey Store
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Your Shopping Cart
          </h1>

          <p className="mt-2 text-slate-500">
            Review your items before checking out.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* Cart items */}
          <section className="space-y-4 lg:col-span-2">
            {cart.map((item) => {
              const name = item.name || item.title || "Product";
              const price = Number(item.price) || 0;
              const quantity = item.quantity || 1;

              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                >
                  <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-12">
                    <div className="flex items-center gap-4 sm:col-span-6">
                      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-2">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={name}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <span className="text-3xl">📦</span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h2 className="font-bold text-slate-900">
                          {name}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          €{price.toFixed(2)} each
                        </p>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="mt-3 text-sm font-semibold text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between sm:col-span-3 sm:justify-center">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={quantity <= 1}
                        aria-label={`Decrease quantity of ${name}`}
                        className="rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        −
                      </button>

                      <span className="px-3 font-semibold">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label={`Increase quantity of ${name}`}
                        className="rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right font-bold text-slate-900 sm:col-span-3">
                      €{(price * quantity).toFixed(2)}
                    </div>
                  </div>
                </article>
              );
            })}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <Link
                to="/products"
                className="font-semibold text-blue-700 hover:text-blue-900"
              >
                ← Continue Shopping
              </Link>

              <button
                type="button"
                onClick={clearCart}
                className="rounded-xl border border-red-200 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-50"
              >
                Clear Cart
              </button>
            </div>
          </section>

          {/* Order summary */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Order Summary
            </h2>

            <div className="mt-6 flex justify-between gap-4 text-slate-600">
              <span>Items ({cartCount})</span>
              <span>€{cartTotal.toFixed(2)}</span>
            </div>

            <div className="mt-6 flex justify-between gap-4 border-t border-slate-200 pt-5">
              <span className="text-lg font-bold text-slate-900">
                Total
              </span>

              <span className="text-2xl font-extrabold text-blue-700">
                €{cartTotal.toFixed(2)}
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Shipping and applicable taxes are not included.
            </p>

            <button
              type="button"
              onClick={() =>
                alert("Online checkout has not been set up yet.")
              }
              className="mt-6 w-full rounded-xl bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-800"
            >
              Proceed to Checkout →
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;
