import Container from "@/component/Container/Container";
import Contact from "@/component/ui/Contact/Contact";
import AboutUs from "@/component/ui/Home/AboutUs";
import Brand from "@/component/ui/Home/Brand";
import Carousel from "@/component/ui/Home/Carousel";
import FlashSale from "@/component/ui/Home/FlashSale";
import Gallery from "@/component/ui/Home/Gallery";
import OurService from "@/component/ui/Home/OurService";
import TrendingProduct from "@/component/ui/Home/TrendingProduct";
import Testimonials from "@/component/ui/Testimonials/Testimonials";

const page = () => {
  return (
   <div>
  <Carousel />
<Container>
<div className=" space-y-32 md:px-0 px-3">
      <FlashSale />
      <AboutUs />
      <Brand />
      <Gallery />
      <OurService />
      <TrendingProduct />
      <Testimonials />
      <Contact />
    </div>
</Container>
   </div>
  );
};

export default page;
