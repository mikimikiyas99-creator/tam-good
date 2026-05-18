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
    <div className="w-full min-h-screen bg-slate-900 text-white relative">
      
      {/* MAIN CONTENT WRAPPER */}
      <main className="max-w-md mx-auto p-4 pb-24">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">
            🛒 Muki Market
          </h1>

          <div className="flex gap-2">
            <button
              onClick={() => setShowAddForm(true)}
              className="w-10 h-10 rounded-full bg-blue-500 text-2xl flex items-center justify-center font-bold active:scale-95 transition-transform"
            >
              +
            </button>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              👤
            </div>
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="flex gap-2 overflow-x-auto mb-5 pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white"
                  : "bg-slate-800 text-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 gap-4">
          {filtered.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/50 active:scale-[0.98] transition-transform cursor-pointer"
            >
              <img src={product.image} className="w-full h-32 object-cover" alt="" />
              <div className="p-3">
                <h2 className="font-semibold text-sm line-clamp-1">{product.title}</h2>
                <p className="text-sky-400 font-bold text-sm mt-0.5">{product.price}</p>
                <p className="text-[11px] opacity-60 mt-1">
                  {product.available ? "● Available" : "● Out of Stock"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ================= FIXED CENTERED PRODUCT DETAIL MODAL ================= */}
      {selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-[9999]">
          {/* Clicking the blurred background closes the detail screen */}
          <div className="absolute inset-0 w-full h-full" onClick={() => setSelectedProduct(null)} />
          
          {/* Main Popup White/Slate Box Container */}
          <div className="bg-slate-800 w-full max-w-sm rounded-2xl p-5 relative z-10 max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-700">
            
            <img src={selectedProduct.image} className="w-full h-44 object-cover rounded-xl mb-4" alt="" />

            <h2 className="text-xl font-bold mb-1">{selectedProduct.title}</h2>
            <p className="text-xl font-extrabold text-sky-400 mb-2">{selectedProduct.price}</p>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">{selectedProduct.description}</p>

            {/* SPECS BLOCK */}
            <div className="bg-slate-900/80 p-3 rounded-xl mb-4 border border-slate-700/40">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Specifications</h3>
              <div className="space-y-1.5">
                {Object.entries(selectedProduct.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-xs">
                    <span className="capitalize text-slate-400">{key}</span>
                    <span className="font-medium text-slate-200">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs mb-4">
              Status: <span className={selectedProduct.available ? "text-green-400" : "text-red-400"}>
                {selectedProduct.available ? "Available" : "Not Available"}
              </span>
            </p>

            {/* INTERACTION BUTTONS */}
            <div className="space-y-2">
              <button 
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${selectedProduct.available ? "bg-emerald-500" : "bg-slate-700 text-slate-500"}`}
                disabled={!selectedProduct.available}
              >
                Is this available?
              </button>
              <button className="w-full bg-blue-500 py-3 rounded-xl font-bold text-sm transition-all active:scale-95">
                Contact Seller
              </button>
              <button onClick={() => setSelectedProduct(null)} className="w-full bg-slate-700 py-3 rounded-xl text-sm font-medium transition-colors">
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= ADD PRODUCT PLACEHOLDER MODAL ================= */}
      {showAddForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-[9999]">
          <div className="absolute inset-0 w-full h-full" onClick={() => setShowAddForm(false)} />
          
          <div className="bg-slate-800 w-full max-w-sm p-5 rounded-2xl relative z-10 border border-slate-700 text-center shadow-2xl">
            <h2 className="text-lg font-bold mb-2">Add Product</h2>
            <div className="bg-slate-900 p-4 rounded-xl text-xs text-slate-400 italic mb-4">
              (Form layout features step)
            </div>
            <button onClick={() => setShowAddForm(false)} className="w-full bg-slate-700 py-3 rounded-xl text-sm font-bold">
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}