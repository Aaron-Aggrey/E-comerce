
import { Link } from "react-router-dom";

function About() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="rounded-3xl bg-white p-8 shadow-lg sm:p-12">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
          About Us
        </p>

        <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
          Welcome to Ronggrey Store, Your One-Stop Shop for Quality Goods
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          At Ronggrey Store, we believe shopping should be simple,
          enjoyable, and reliable. We bring together quality products
          to make everyday life better.
        </p>

        <p className="mt-4 leading-7 text-slate-600">
          Explore our collection, discover your favourites, and enjoy
          a smooth shopping experience.
        </p>

        <Link
          to="/products"
          className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Explore Products
        </Link>
      </div>
    </main>
  );
}

export default About;
