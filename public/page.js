"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = ["All", "Phones", "Laptops", "Shoes"];

  const products = [
    {
      id: 1,
      title: "iPhone 13",
      price: "45000 ETB",
      status: "Used",
      category: "Phones",
      available: true,
      seller: "Ali Store",
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
      status: "New",
      category: "Laptops",
      available: false,
      seller: "Tech Hub",
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

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }
    
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">🛒 Muki Market</h1>

        <div className="flex gap-2">

          {/* ADD BUTTON */}
          <button
            onClick={() => setShowAddForm(true)}
            className="w-10 h-10 rounded-full bg-blue-500 text-2xl"
          >
            +
          </button>

          {/* PROFILE */}
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
            👤
          </div>

        </div>
      </div>

      {/* CATEGORIES */}
      <div className="flex gap-2 overflow-x-auto mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full ${
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
      <div className="grid grid-cols-2 gap-4">

        {filtered.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="bg-slate-800 rounded-2xl overflow-hidden"
          >

            <img
              src={product.image}
              className="w-full h-36 object-cover"
            />

            <div className="p-3">
              <h2 className="font-bold">{product.title}</h2>
              <p className="text-sky-400">{product.price}</p>
              <p className="text-sm opacity-70">{product.status}</p>
            </div>

          </div>
        ))}

      </div>

      {/* ================= DETAIL PAGE ================= */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 flex items-end justify-center">

          <div className="bg-slate-800 w-full max-w-md rounded-t-3xl p-4">

            <img
              src={selectedProduct.image}
              className="w-full rounded-2xl mb-4"
            />

            <h2 className="text-2xl font-bold">
              {selectedProduct.title}
            </h2>

            <p className="text-sky-400 text-lg mb-2">
              {selectedProduct.price}
            </p>

            <p className="text-sm opacity-70 mb-3">
              {selectedProduct.description}
            </p>

            {/* SPECS SECTION (NEW IMPORTANT PART) */}
            <div className="bg-slate-900 p-3 rounded-xl mb-3">
              <h3 className="font-bold mb-2">Specifications</h3>

              {Object.entries(selectedProduct.specs).map(
                ([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="opacity-70">{key}</span>
                    <span>{value}</span>
                  </div>
                )
              )}
            </div>

            {/* STATUS */}
            <p className="mb-3">
              Status:{" "}
              <span
                className={
                  selectedProduct.available
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {selectedProduct.available ? "Available" : "Not Available"}
              </span>
            </p>

            {/* ACTIONS */}
            <button
              className={`w-full py-3 rounded-xl mb-2 ${
                selectedProduct.available
                  ? "bg-green-500"
                  : "bg-gray-600"
              }`}
              disabled={!selectedProduct.available}
            >
              Is this available?
            </button>

            <button className="w-full bg-blue-500 py-3 rounded-xl mb-2">
              Contact Seller
            </button>

            <button
              onClick={() => setSelectedProduct(null)}
              className="w-full bg-slate-700 py-3 rounded-xl"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* ================= ADD PRODUCT PLACEHOLDER ================= */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">

          <div className="bg-slate-800 w-full max-w-md p-4 rounded-2xl">

            <h2 className="text-xl font-bold mb-3">
              Add Product
            </h2>

            <p className="opacity-70 mb-3">
              (We will build full form next step)
            </p>

            <button
              onClick={() => setShowAddForm(false)}
              className="w-full bg-slate-700 py-3 rounded-xl"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </main>
  );
}