"use client";

import { useState } from "react";

const categories = ["All", "Phones", "Laptops", "Shoes"];

const products = [
  {
    id: 1,
    title: "iPhone 13",
    price: "45,000 ETB",
    category: "Phones",
    available: true,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800",
    description:
      "Powerful Apple smartphone with excellent camera quality.",
    specs: {
      storage: "128GB",
      ram: "4GB",
      battery: "3240mAh",
    },
  },

  {
    id: 2,
    title: "Gaming Laptop",
    price: "85,000 ETB",
    category: "Laptops",
    available: false,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800",
    description:
      "High performance laptop for gaming and editing.",
    specs: {
      cpu: "Intel i7",
      ram: "16GB",
      gpu: "RTX 3060",
    },
  },

  {
    id: 3,
    title: "Nike Air",
    price: "6,500 ETB",
    category: "Shoes",
    available: true,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800",
    description:
      "Comfortable and stylish everyday sneakers.",
    specs: {
      brand: "Nike",
      size: "42",
      color: "Black",
    },
  },

  {
    id: 4,
    title: "MacBook Pro",
    price: "120,000 ETB",
    category: "Laptops",
    available: true,
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=800",
    description:
      "Apple laptop for developers and creators.",
    specs: {
      chip: "M2",
      ram: "16GB",
      storage: "1TB SSD",
    },
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter(
          (p) => p.category === selectedCategory
        );

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* PHONE CONTAINER */}
      <div className="w-full max-w-md mx-auto px-3 pb-24">

        {/* HEADER */}
        <div className="flex items-center justify-between py-4 sticky top-0 bg-slate-950 z-20">

          <h1 className="text-xl font-black tracking-tight">
            <span className="text-blue-400">Miki</span>{" "}
            Market
          </h1>

          <button className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xl active:scale-95 transition">
            +
          </button>
        </div>

        {/* CATEGORY BAR */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-4 scrollbar-hide">

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setSelectedCategory(cat)
              }
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white"
                  : "bg-slate-800 text-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 gap-3">

          {filtered.map((product) => (
            <button
              key={product.id}
              onClick={() =>
                setSelectedProduct(product)
              }
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 text-left active:scale-[0.98] transition-all"
            >

              {/* IMAGE */}
              <div className="relative">

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-32 object-cover"
                />

                <div className="absolute top-2 right-2">

                  <div
                    className={`text-[10px] px-2 py-1 rounded-full backdrop-blur-md ${
                      product.available
                        ? "bg-emerald-500/90"
                        : "bg-red-500/90"
                    }`}
                  >
                    {product.available
                      ? "Available"
                      : "Sold"}
                  </div>

                </div>
              </div>

              {/* CONTENT */}
              <div className="p-3">

                <h2 className="font-semibold text-sm line-clamp-1">
                  {product.title}
                </h2>

                <p className="text-blue-400 font-bold text-sm mt-1">
                  {product.price}
                </p>

              </div>
            </button>
          ))}
        </div>

        {/* DETAIL PANEL */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end">

            {/* CLOSE AREA */}
            <div
              className="absolute inset-0"
              onClick={() =>
                setSelectedProduct(null)
              }
            />

            {/* BOTTOM SHEET */}
            <div className="relative w-full bg-slate-900 rounded-t-[30px] p-4 animate-slideup max-h-[90vh] overflow-y-auto border-t border-slate-800">

              {/* HANDLE */}
              <div className="w-12 h-1.5 rounded-full bg-slate-700 mx-auto mb-4" />

              {/* IMAGE */}
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-52 object-cover rounded-2xl"
              />

              {/* INFO */}
              <div className="mt-4">

                <div className="flex items-start justify-between gap-3">

                  <div>
                    <h2 className="text-xl font-bold">
                      {selectedProduct.title}
                    </h2>

                    <p className="text-blue-400 font-extrabold text-lg mt-1">
                      {selectedProduct.price}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setSelectedProduct(null)
                    }
                    className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center"
                  >
                    ✕
                  </button>

                </div>

                {/* DESCRIPTION */}
                <p className="text-sm text-slate-400 leading-relaxed mt-4">
                  {selectedProduct.description}
                </p>

                {/* SPECS */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 mt-4">

                  <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-3">
                    Specifications
                  </h3>

                  <div className="space-y-3">

                    {Object.entries(
                      selectedProduct.specs
                    ).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-slate-400 capitalize">
                          {key}
                        </span>

                        <span className="font-medium">
                          {value}
                        </span>
                      </div>
                    ))}

                  </div>
                </div>

                {/* BUTTONS */}
                <div className="grid grid-cols-2 gap-3 mt-5">

                  {/* YOUR BUTTON */}
                  <button
                    className={`py-3 rounded-2xl font-bold text-sm active:scale-95 transition ${
                      selectedProduct.available
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-700 text-slate-500"
                    }`}
                    disabled={
                      !selectedProduct.available
                    }
                  >
                    Is this available?
                  </button>

                  <button className="bg-blue-500 py-3 rounded-2xl font-bold text-sm active:scale-95 transition">
                    Contact Seller
                  </button>

                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ANIMATION */}
      <style jsx>{`
        @keyframes slideup {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-slideup {
          animation: slideup 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}