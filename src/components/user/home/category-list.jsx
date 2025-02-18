import { getCategories } from "@/services/supabase/categories-service";
import { useEffect, useState } from "react";

import CardCategory from "./card-category";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const categoriesData = await getCategories();
        const { categories } = categoriesData;
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchFAQs();
  }, []);

  return (
    <section className="py-12 bg-gray-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-primary sm:text-4xl">
            Kategori
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-light">
            Beragam Kue Spesial untuk Semua Acara
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((category) => (
            <CardCategory key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
