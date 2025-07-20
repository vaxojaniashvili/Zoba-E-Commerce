"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { products } from "../../data/products";
import { Filters, Product } from "@/app/common/types/common";

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    category: "ყველა",
    price: "ყველა",
    brand: "ყველა",
  });
  const router = useRouter();

  const handleSearch = (): void => {
    console.log("ძებნა:", searchTerm);
  };

  const handleFilterChange = (
    filterType: keyof Filters,
    value: string
  ): void => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleProductClick = (productId: number): void => {
    router.push(`/pages/home/${productId}`);
  };

  const handleHomeClick = (): void => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-4 shadow-lg">
        <div className="max-w-6xl mx-auto px-8 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div
            onClick={handleHomeClick}
            className="text-3xl font-bold cursor-pointer"
          >
            Zoba
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
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            ტექნიკის კატალოგი
          </h1>
          <p className="text-xl text-gray-600">
            ყველა სახის ტექნიკა და მისი სრული დეტალები
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex flex-col gap-2">
              <label className="font-bold text-gray-800">კატეგორია</label>
              <select
                className="px-4 py-2 border-2 border-gray-300 rounded-xl bg-white cursor-pointer focus:border-indigo-500 focus:outline-none"
                value={filters.category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleFilterChange("category", e.target.value)
                }
              >
                <option>ყველა</option>
                <option>სმარტფონები</option>
                <option>ლეპტოპები</option>
                <option>სამომხმარებლო ტექნიკა</option>
                <option>აუდიო ტექნიკა</option>
                <option>ტელევიზორები</option>
                <option>მიქსერები</option>
                <option>კონდიციონერები</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold text-gray-800">ფასი</label>
              <select
                className="px-4 py-2 border-2 border-gray-300 rounded-xl bg-white cursor-pointer focus:border-indigo-500 focus:outline-none"
                value={filters.price}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleFilterChange("price", e.target.value)
                }
              >
                <option>ყველა</option>
                <option>500₾ მდე</option>
                <option>500₾ - 1000₾</option>
                <option>1000₾ - 3000₾</option>
                <option>3000₾ ზე მეტი</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {(products as Product[]).map((product: Product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer border-4 border-transparent hover:border-indigo-500"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                {/* <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                /> */}
                <div>{product.image}</div>
                <div className="absolute top-3 right-3 bg-indigo-500 text-white px-2 py-1 rounded-lg text-sm">
                  {product.category}
                </div>
              </div>
              <div className="p-6">
                <div className="text-xl font-bold mb-2 text-gray-800">
                  {product.title}
                </div>
                <div className="text-3xl font-bold text-green-600 mb-4">
                  {product.price}
                </div>
                <div className="text-gray-600 mb-4 leading-relaxed">
                  {product.description}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <span>📞</span>
                  <span>გამყიდველი: {product.seller}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
