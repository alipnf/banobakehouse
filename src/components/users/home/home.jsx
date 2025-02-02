import CategoryList from "./category-list";
import HeroSection from "./hero-section";

const Home = () => {
  return (
    <div className="pt-4 md:pt-6 lg:pt-10">
      <HeroSection />
      <CategoryList />
    </div>
  );
};

export default Home;
