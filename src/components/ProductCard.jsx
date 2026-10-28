function ProductCard({
  id,
  name,
  price,
  image,
  category,
  isWishlisted = false,
  onToggleWishlist,
  onViewDetails,
  onAddToCart,
}) {
  return (
    <article className="product-card group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_18px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]">
      <div className="relative flex h-60 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="product-image h-full w-full object-contain"
          />
        ) : (
          <span className="text-sm text-slate-400">Image unavailable</span>
        )}

        {category && (
          <span className="absolute left-3 top-3 max-w-[70%] truncate rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow-sm backdrop-blur">
            {category}
          </span>
        )}

        <button
          type="button"
          onClick={() => onToggleWishlist?.(id)}
          aria-label={isWishlisted ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          aria-pressed={isWishlisted}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/95 text-2xl shadow-sm transition hover:scale-105 hover:border-rose-200 hover:text-rose-600 ${
            isWishlisted ? "text-rose-600" : "text-slate-400"
          }`}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-12 text-base font-bold leading-6 text-slate-900 transition-colors group-hover:text-blue-700">
          {name}
        </h3>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xl font-extrabold tracking-tight text-slate-950">
            €{Number(price).toFixed(2)}
          </p>
          <span className="text-xs font-medium text-emerald-700">Available</span>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
          <button
            type="button"
            onClick={onAddToCart}
            className="rounded-xl bg-slate-900 px-3 py-3 text-sm font-bold text-white transition hover:bg-blue-700 focus-visible:outline-offset-2"
          >
            <span aria-hidden="true" className="mr-1">＋</span> Add to cart
          </button>
          {onViewDetails && (
            <button
              type="button"
              onClick={onViewDetails}
              aria-label={`View details for ${name}`}
              title="View details"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              View
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
