import CategoryList from "./category-list";
import HeroSection from "./hero-section";
import OrderPlatforms from "./order-platfrom";
import Testimoni from "./testimoni";

const Home = () => {
  return (
    <div className="pt-4 md:pt-6 lg:pt-10">
      <HeroSection />
      <CategoryList />
      <Testimoni />
      <OrderPlatforms />
    </div>
  );
};

export default Home;
