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
    <main className="min-h-screen bg-slate-900 text-white p-4 max-w-md mx-auto relative select-none">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">
          🛒 Miki Market
        </h1>

        <div className="flex gap-2">
          {/* ADD BUTTON */}
          <button
            onClick={() => setShowAddForm(true)}
            className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-2xl flex items-center justify-center font-bold shadow-lg shadow-blue-500/20 active:scale-95 transform dynamic-touch"
          >
            +
          </button>

          {/* PROFILE */}
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shadow-md">
            👤
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="flex gap-2 overflow-x-auto mb-5 no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all active:scale-95 ${
              selectedCategory === cat
                ? "bg-blue-500 text-white shadow-md shadow-blue-500/10"
                : "bg-slate-800 text-slate-300 border border-slate-700/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-2 gap-3.5">
        {filtered.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/40 active:scale-[0.98] transition-transform duration-100 flex flex-col justify-between shadow-lg"
          >
            <div className="relative">
              <img
                src={product.image}
                className="w-full h-32 object-cover"
                alt={product.title}
              />
              <span className={`absolute top-2 right-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                product.status === "New" ? "bg-green-500/90 text-white" : "bg-amber-500/90 text-slate-900"
              }`}>
                {product.status}
              </span>
            </div>

            <div className="p-3">
              <h2 className="font-semibold text-sm line-clamp-1 text-slate-100">{product.title}</h2>
              <p className="text-sky-400 font-bold text-sm mt-0.5">{product.price}</p>
              <p className={`text-[11px] font-medium mt-1 ${product.available ? "text-green-400/90" : "text-rose-400/90"}`}>
                {product.available ? "● Available" : "● Out of Stock"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DETAIL BOTTOM SHEET ================= */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-end justify-center z-50 transition-opacity duration-300 animate-fade-in">
          {/* Backdrop Click Closer */}
          <div className="absolute inset-0" onClick={() => setSelectedProduct(null)} />
          
          {/* Bottom Sheet Box */}
          <div className="bg-slate-800 w-full max-w-md rounded-t-3xl p-5 relative z-10 shadow-2xl max-h-[92vh] overflow-y-auto no-scrollbar border-t border-slate-700/50 transform animate-slide-up">
            
            {/* Handle Drag bar representation for mobile look */}
            <div className="w-12 h-1 bg-slate-600 rounded-full mx-auto mb-4 opacity-60" onClick={() => setSelectedProduct(null)}/>

            <img
              src={selectedProduct.image}
              className="w-full h-52 object-cover rounded-2xl mb-4 shadow-inner"
              alt={selectedProduct.title}
            />

            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold text-white leading-tight">
                {selectedProduct.title}
              </h2>
              <span className="text-xs bg-slate-700 px-2.5 py-1 rounded-md text-slate-300 font-medium border border-slate-600/50">
                {selectedProduct.category}
              </span>
            </div>

            <p className="text-xl font-extrabold text-sky-400 mb-2">
              {selectedProduct.price}
            </p>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {selectedProduct.description}
            </p>

            {/* SPECS SECTION */}
            <div className="bg-slate-900/60 border border-slate-700/40 p-3 rounded-xl mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Specifications
              </h3>

              <div className="space-y-1.5">
                {Object.entries(selectedProduct.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-xs py-0.5 border-b border-slate-800/50 last:border-0">
                    <span className="capitalize text-slate-400">{key}</span>
                    <span className="font-medium text-slate-200">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SELLER DETAILS */}
            <div className="flex items-center gap-2 mb-5 px-1">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
              <p className="text-xs text-slate-400">
                Listed by: <span className="font-semibold text-slate-200">{selectedProduct.seller}</span>
              </p>
            </div>

            {/* ACTIONS FOOTER */}
            <div className="space-y-2">
              <button
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                  selectedProduct.available
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-950/20 hover:bg-emerald-600"
                    : "bg-slate-700 text-slate-500 cursor-not-allowed"
                }`}
                disabled={!selectedProduct.available}
              >
                {selectedProduct.available ? "Is this available?" : "Item Sold"}
              </button>

              <button className="w-full bg-blue-500 hover:bg-blue-600 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-blue-950/20">
                Contact Seller via Telegram
              </button>

              <button
                onClick={() => setSelectedProduct(null)}
                className="w-full bg-slate-700/60 hover:bg-slate-700 text-slate-300 py-3 rounded-xl text-sm font-medium border border-slate-700/40 transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= ADD PRODUCT MODAL ================= */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="absolute inset-0" onClick={() => setShowAddForm(false)} />
          
          <div className="bg-slate-800 w-full max-w-sm p-5 rounded-2xl relative z-10 border border-slate-700/50 shadow-2xl transform scale-100 transition-transform">
            <h2 className="text-lg font-bold mb-1 text-white">Add Product</h2>
            <p className="text-xs text-slate-400 mb-4">
              Fill out the product information details.
            </p>

            <div className="bg-slate-900 p-4 rounded-xl text-center border border-slate-800 mb-4">
              <p className="text-xs text-slate-400 italic">
                (Form entry components go here next step)
              </p>
            </div>

            <button
              onClick={() => setShowAddForm(false)}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl text-sm font-bold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </main>
  );
}