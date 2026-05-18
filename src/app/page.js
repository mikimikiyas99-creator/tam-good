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
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openId, setOpenId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const tg = window?.Telegram?.WebApp;
    if (tg) tg.expand?.();
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
      <main className="max-w-md mx-auto p-4 pb-24">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-bold text-blue-400">
            🛒 Miki Market
          </h1>

          <button
            onClick={() => setShowAddForm(true)}
            className="w-10 h-10 bg-blue-500 rounded-full text-xl"
          >
            +
          </button>
        </div>

        {/* CATEGORIES */}
        <div className="flex gap-2 overflow-x-auto mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm ${
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
        <div className="space-y-4">
          {filtered.map((product) => {
            const isOpen = openId === product.id;

            return (
              <div
                key={product.id}
                className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700"
              >
                {/* CARD */}
                <div
                  onClick={() => toggleProduct(product.id)}
                  className="cursor-pointer"
                >
                  <img
                    src={product.image}
                    className="w-full h-32 object-cover"
                  />

                  <div className="p-3">
                    <h2 className="font-semibold">{product.title}</h2>
                    <p className="text-sky-400 font-bold">
                      {product.price}
                    </p>
                    <p className="text-xs opacity-60">
                      {product.available
                        ? "● Available"
                        : "● Out of stock"}
                    </p>
                  </div>
                </div>

                {/* INLINE DETAILS */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "max-h-[600px] opacity-100 p-3 pt-0"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {isOpen && (
                    <div className="border-t border-slate-700 pt-3">

                      <p className="text-xs text-slate-400 mb-3">
                        {product.description}
                      </p>

                      {/* SPECS */}
                      <div className="bg-slate-900 p-3 rounded-xl mb-3">
                        <h3 className="text-xs text-slate-400 mb-2">
                          Specs
                        </h3>

                        {Object.entries(product.specs).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between text-xs"
                            >
                              <span className="text-slate-400 capitalize">
                                {key}
                              </span>
                              <span>{value}</span>
                            </div>
                          )
                        )}
                      </div>

                      {/* BUTTONS (UNCHANGED "IS IT AVAILABLE" BUTTON) */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          className={`w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 text-center ${
                            product.available
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-700 text-slate-500"
                          }`}
                          disabled={!product.available}
                        >
                          Is this available?
                        </button>

                        <button className="w-full bg-blue-500 py-3 rounded-xl font-bold text-sm transition-all active:scale-95">
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
          <p className="text-center text-slate-400 mt-10">
            No products found
          </p>
        )}
      </main>

      {/* ADD MODAL */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div
            className="absolute inset-0"
            onClick={() => setShowAddForm(false)}
          />

          <div className="relative bg-slate-800 p-5 rounded-2xl w-full max-w-sm border border-slate-700">
            <h2 className="font-bold mb-3">Add Product</h2>

            <div className="bg-slate-900 p-4 rounded-xl text-xs text-slate-400 mb-4">
              Form coming soon...
            </div>

            <button
              onClick={() => setShowAddForm(false)}
              className="w-full bg-slate-700 py-3 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}