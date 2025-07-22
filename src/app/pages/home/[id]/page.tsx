"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "../../../data/productsInner";
import { PageContext } from "@/app/common/types/common";
import Image from "next/image";

const InnerPage: React.FC<PageContext> = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (): void => {
    console.log("ძებნა:", searchTerm);
  };

  const goBack = (): void => {
    router.back();
  };

  const handleHomeClick = (): void => {
    router.push("/");
  };

  const typedProducts = products;
  const product = typedProducts[
    id as unknown as keyof typeof typedProducts
  ] as (typeof typedProducts)[keyof typeof typedProducts];

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            პროდუქტი ვერ მოიძებნა
          </h1>
          <button
            onClick={() => router.push("/")}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full transition-all duration-300"
          >
            მთავარ გვერდზე დაბრუნება
          </button>
        </div>
      </div>
    );
  }

  const callSeller = (): void => {
    window.open(`tel:${product.phone}`);
  };

  const openWhatsApp = (): void => {
    const cleanPhone = product.phone.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${cleanPhone}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-4 shadow-lg">
        <div className="max-w-6xl mx-auto px-8 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div
            className="text-3xl font-bold cursor-pointer"
            onClick={handleHomeClick}
          >
            TechCatalog
          </div>
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <input
              type="text"
              className="px-4 py-2 rounded-full w-full lg:w-80 text-gray-800 text-lg"
              placeholder="ძებნა ტექნიკის სახელით..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
            <button
              onClick={handleSearch}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-2xl transition-all duration-300"
            >
              ძებნა
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-8">
        {/* Back Button */}
        <button
          onClick={goBack}
          className="bg-gray-600 hover:bg-gray-800 text-white px-6 py-3 rounded-full mb-8 transition-all duration-300 hover:-translate-y-1 text-lg"
        >
          ← ყველა ტექნიკისკენ
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Product Detail Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
            {/* <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-8xl text-gray-500">
              
            </div> */}
            <Image
              width={100}
              height={100}
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover rounded-[10px]"
            />
            <div>
              <h1 className="text-4xl font-bold mb-4 text-gray-800">
                {product.title}
              </h1>
              <div className="text-4xl font-bold text-green-600 mb-6">
                {product.price}
              </div>
              <div className="text-gray-600 mb-8 text-[16px] leading-relaxed">
                {product.fullDescription}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gray-50 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              კონტაქტი გამყიდველთან
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
              <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
                <div className="text-3xl text-indigo-500">👤</div>
                <div>
                  <h3 className="font-bold text-gray-800">გამყიდველი</h3>
                  <p className="text-gray-600">{product.seller}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
                <div className="text-3xl text-indigo-500">📞</div>
                <div>
                  <h3 className="font-bold text-gray-800">ტელეფონი</h3>
                  <p className="text-gray-600">{product.phone}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
                <div className="text-3xl text-indigo-500">📍</div>
                <div>
                  <h3 className="font-bold text-gray-800">ადგილმდებარეობა</h3>
                  <p className="text-gray-600">{product.location}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
                <div className="text-3xl text-indigo-500">💬</div>
                <div>
                  <h3 className="font-bold text-gray-800">WhatsApp</h3>
                  <p className="text-gray-600">{product.phone}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={callSeller}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-full text-lg font-bold transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                📞 ზარი გამყიდველთან
              </button>
              <button
                onClick={openWhatsApp}
                className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white py-4 rounded-full text-lg font-bold transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                💬 WhatsApp-ით დაწერა
              </button>
            </div>
          </div>

          {/* Specifications */}
          {"specs" in product && product.specs && (
            <div className="p-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                ტექნიკური მახასიათებლები
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <span className="font-bold text-gray-800">{key}</span>
                    <span className="text-gray-600">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InnerPage;
