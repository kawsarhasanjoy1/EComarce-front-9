import Container from "@/component/Container/Container";
import Footer from "@/component/Shared/Footer";
import Header from "@/component/Shared/Header";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className="pt-[57px]">
       {children}
      </div>
      <Footer />
    </>
  );
};

export default layout;
