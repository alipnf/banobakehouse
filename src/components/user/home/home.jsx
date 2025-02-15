import CategoryList from "./category-list";
import Faq from "./faq";
import HeroSection from "./hero-section";
import OrderPlatforms from "./order-platfrom";
import Testimoni from "./testimoni";

const Home = () => {
  return (
    <div className="mt-10 md:mt-14">
      <HeroSection />
      <CategoryList />
      <Testimoni />
      <Faq />
      <OrderPlatforms />
    </div>
  );
};

export default Home;
