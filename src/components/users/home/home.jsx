import CategoryList from "./category-list";
import Faq from "./faq";
import HeroSection from "./hero-section";
import OrderPlatforms from "./order-platfrom";
import Testimoni from "./testimoni";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CategoryList />
      <Testimoni />
      <Faq />
      <OrderPlatforms />
    </div>
  );
};

export default Home;
