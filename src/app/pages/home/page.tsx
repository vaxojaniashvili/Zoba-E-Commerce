"use client";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import { products } from "../../data/products";
import { Filters, Product } from "@/app/common/types/common";
import Image from "next/image";
import ZobaImage from "../../assets/Zoba.jpeg";

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    category: "ყველა",
    price: "ყველა",
    brand: "ყველა",
  });
  const router = useRouter();

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

  // პროდუქტების ფილტრაცია და ძებნა
  const filteredProducts = useMemo(() => {
    // ობიექტიდან მასივად გადაკეთება
    const productsArray = Object.values(products) as unknown as Product[];

    return productsArray.filter((product) => {
      // ძებნის ფილტრი
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      // ფასის ფილტრი
      const productPrice = parseInt(product.price.replace(/[^\d]/g, ""));
      let matchesPrice = true;

      if (filters.price !== "ყველა") {
        switch (filters.price) {
          case "500₾ მდე":
            matchesPrice = productPrice < 500;
            break;
          case "500₾ - 1000₾":
            matchesPrice = productPrice >= 500 && productPrice <= 1000;
            break;
          case "1000₾ - 3000₾":
            matchesPrice = productPrice > 1000 && productPrice <= 3000;
            break;
          case "3000₾ ზე მეტი":
            matchesPrice = productPrice > 3000;
            break;
          default:
            matchesPrice = true;
        }
      }

      return matchesSearch && matchesPrice;
    });
  }, [searchTerm, filters.price]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-4 shadow-lg">
        <div className="max-w-6xl mx-auto px-8 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div onClick={handleHomeClick} className="flex gap-2 cursor-pointer">
            <div className="w-[40px] h-[40px]">
              <Image
                className="rounded-[5px]"
                width={100}
                height={100}
                src={ZobaImage}
                alt="Zoba Logo"
              />
            </div>
            <div className="text-3xl font-bold">Zoba</div>
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
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-800 mb-4">
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
                className="px-4 py-2 border-2 w-[200px] border-gray-300 rounded-xl bg-white cursor-pointer focus:border-indigo-500 focus:outline-none"
                value={filters.category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleFilterChange("category", e.target.value)
                }
              >
                <option>ყველა</option>
                <option>სამომხმარებლო ტექნიკა</option>
                <option>აუდიო ტექნიკა</option>
                <option>მიქსერები</option>
                <option>კონდიციონერები</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold text-gray-800">ფასი</label>
              <select
                className="px-4 py-2 w-[200px] border-2 border-gray-300 rounded-xl bg-white cursor-pointer focus:border-indigo-500 focus:outline-none"
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

        {/* შედეგები */}
        <div className="mb-6">
          <p className="text-gray-600">
            ნაპოვნია:{" "}
            <span className="font-bold text-indigo-600">
              {filteredProducts.length} ტექნიკა
            </span>
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                პროდუქტი ვერ მოიძებნა
              </h3>
              <p className="text-gray-600">
                სცადეთ სხვა საძებნო გასაღები ან შეცვალეთ ფილტრები
              </p>
            </div>
          ) : (
            filteredProducts.map((product: Product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer border-4 border-transparent hover:border-indigo-500"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                  <Image
                    width={100}
                    height={100}
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
