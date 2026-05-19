"use client";

import { useState } from "react";

const categories = ["All", "Phones", "Laptops", "Shoes"];

const products = [
  {
    id: 1,
    title: "iPhone 13",
    price: "45000 ETB",
    category: "Phones",
    available: true,
    description: "Powerful Apple smartphone with excellent camera quality.",
    specs: {
      storage: "128GB",
      ram: "4GB",
      battery: "3240 mAh",
    },
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800",
  },

  {
    id: 2,
    title: "Gaming Laptop",
    price: "85000 ETB",
    category: "Laptops",
    available: false,
    description: "High performance laptop for gaming and editing.",
    specs: {
      cpu: "Intel i7",
      ram: "16GB",
      gpu: "RTX 3060",
    },
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800",
  },

  {
    id: 3,
    title: "Nike Air",
    price: "6500 ETB",
    category: "Shoes",
    available: true,
    description: "Comfortable and stylish sneakers.",
    specs: {
      size: "42",
      color: "Black",
    },
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800",
  },

  {
    id: 4,
    title: "MacBook Pro",
    price: "120000 ETB",
    category: "Laptops",
    available: true,
    description: "Apple laptop for creators and developers.",
    specs: {
      chip: "M2",
      ram: "16GB",
    },
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=800",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-3">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-blue-400">
          🛒 Miki Market
        </h1>

        <button className="w-10 h-10 rounded-full bg-blue-500 text-xl">
          +
        </button>
      </div>

      {/* CATEGORIES */}
      <div className="flex gap-2 overflow-x-auto mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-blue-500"
                : "bg-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 gap-3">

        {filtered.map((product) => (
          <div
            key={product.id}
            onClick={() =>
              setSelectedProduct(
                selectedProduct?.id === product.id
                  ? null
                  : product
              )
            }
            className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 cursor-pointer active:scale-[0.98] transition-all"
          >
            <img
              src={product.image}
              className="w-full h-28 object-cover"
            />

            <div className="p-2">
              <h2 className="text-sm font-semibold truncate">
                {product.title}
              </h2>

              <p className="text-sky-400 text-sm font-bold">
                {product.price}
              </p>

              <p className="text-[11px] opacity-60">
                {product.available
                  ? "● Available"
                  : "● Out of stock"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL PANEL */}
      {selectedProduct && (
        <div className="mt-4 bg-slate-800 rounded-2xl p-4 border border-slate-700">

          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="text-lg font-bold">
                {selectedProduct.title}
              </h2>

              <p className="text-sky-400 font-bold">
                {selectedProduct.price}
              </p>
            </div>

            <button
              onClick={() => setSelectedProduct(null)}
              className="w-7 h-7 rounded-full bg-slate-700 text-xs"
            >
              ✕
            </button>
          </div>

          <p className="text-sm text-slate-400 mb-4">
            {selectedProduct.description}
          </p>

          {/* SPECS */}
          <div className="bg-slate-900 rounded-xl p-3 mb-4">
            <div className="space-y-2">
              {Object.entries(selectedProduct.specs).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between text-xs"
                  >
                    <span className="capitalize text-slate-400">
                      {key}
                    </span>

                    <span>{value}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-2 gap-2">

            <button
              className={`py-3 rounded-xl font-bold text-sm ${
                selectedProduct.available
                  ? "bg-emerald-500"
                  : "bg-slate-700 text-slate-500"
              }`}
              disabled={!selectedProduct.available}
            >
              Is this available?
            </button>

            <button className="bg-blue-500 py-3 rounded-xl font-bold text-sm">
              Contact Seller
            </button>

          </div>
        </div>
      )}
    </div>
  );
}