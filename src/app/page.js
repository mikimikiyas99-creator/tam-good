"use client";

import { useState, useEffect } from "react";

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
      display: "6.1 inch OLED",
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
      storage: "512GB SSD",
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
    description: "Comfortable and stylish everyday sneakers.",
    specs: {
      brand: "Nike",
      size: "42",
      color: "Black",
      material: "Mesh",
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
    description: "Apple laptop for developers and creators.",
    specs: {
      cpu: "M2 Chip",
      ram: "16GB",
      storage: "1TB SSD",
      display: "14 inch Retina",
    },
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=800",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openId, setOpenId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const tg = window?.Telegram?.WebApp;

    if (tg) {
      tg.expand?.();
    }
  }, []);

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const toggleProduct = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 text-white">

      {/* MAIN */}
      <main className="w-full px-3 pb-24">

        {/* HEADER */}
        <div className="flex justify-between items-center py-4">
          <h1 className="text-xl font-bold text-blue-400">
            🛒 Miki Market
          </h1>

          <button
            onClick={() => setShowAddForm(true)}
            className="w-10 h-10 bg-blue-500 rounded-full text-xl flex items-center justify-center active:scale-95"
          >
            +
          </button>
        </div>

        {/* CATEGORIES */}
        <div className="flex gap-2 overflow-x-auto mb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white"
                  : "bg-slate-800 text-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCTS FLEX LAYOUT */}
        <div className="flex flex-wrap gap-[4%]">

          {filtered.map((product) => {
            const isOpen = openId === product.id;

            return (
              <div
                key={product.id}
                className={`w-[48%] mb-4 bg-slate-800 rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isOpen
                    ? "border-blue-500"
                    : "border-slate-700"
                }`}
              >

                {/* CARD */}
                <div
                  onClick={() => toggleProduct(product.id)}
                  className="cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-28 object-cover"
                  />

                  <div className="p-2.5">

                    <h2 className="font-semibold text-sm truncate">
                      {product.title}
                    </h2>

                    <p className="text-sky-400 font-bold text-sm mt-1">
                      {product.price}
                    </p>

                    <p className="text-[11px] opacity-60 mt-1">
                      {product.available
                        ? "● Available"
                        : "● Out of stock"}
                    </p>

                  </div>
                </div>

                {/* DETAILS */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "max-h-[500px] opacity-100 p-2.5 pt-0"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {isOpen && (
                    <div className="border-t border-slate-700 pt-3">

                      {/* DESCRIPTION */}
                      <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                        {product.description}
                      </p>

                      {/* SPECS */}
                      <div className="bg-slate-900 p-2 rounded-xl mb-3">

                        <h3 className="text-[10px] uppercase text-slate-500 mb-2">
                          Specs
                        </h3>

                        <div className="space-y-1">
                          {Object.entries(product.specs).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex justify-between gap-2 text-[10px]"
                              >
                                <span className="text-slate-400 capitalize">
                                  {key}
                                </span>

                                <span className="text-right">
                                  {value}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* BUTTONS */}
                      <div className="grid grid-cols-1 gap-2">

                        {/* KEEPING YOUR BUTTON */}
                        <button
                          className={`w-full py-2 rounded-xl font-bold text-[11px] transition-all active:scale-95 ${
                            product.available
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-700 text-slate-500"
                          }`}
                          disabled={!product.available}
                        >
                          Is this available?
                        </button>

                        <button className="w-full bg-blue-500 py-2 rounded-xl font-bold text-[11px] transition-all active:scale-95">
                          Contact Seller
                        </button>

                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <p className="text-center text-slate-400 mt-10 text-sm">
            No products found
          </p>
        )}

      </main>

      {/* MODAL */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">

          <div
            className="absolute inset-0"
            onClick={() => setShowAddForm(false)}
          />

          <div className="relative bg-slate-800 w-full max-w-sm p-5 rounded-2xl border border-slate-700 z-10">

            <h2 className="font-bold text-lg mb-4">
              Add Product
            </h2>

            <div className="bg-slate-900 p-4 rounded-xl text-xs text-slate-400 mb-4">
              Product form coming soon...
            </div>

            <button
              onClick={() => setShowAddForm(false)}
              className="w-full bg-slate-700 py-3 rounded-xl font-medium active:scale-95"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}