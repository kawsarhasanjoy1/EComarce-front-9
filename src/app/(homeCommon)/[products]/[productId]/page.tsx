import { TProduct } from "@/Types/Global";
import BrandHeader from "@/component/BrandHeader";
import DetailsCard from "@/component/DetailsCard";

// export const generateStaticParams = async () => {
//   const res = await fetch(`https://eatsie-backend.vercel.app/products`);
//   const data = await res.json();
//   return data?.data?.slice(0, 10)?.map((product: TProduct) => ({
//     productId: product._id.toString(),
//   }));
// };

const page = async ({ params }: { params: { productId: string } }) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}product/${params?.productId}`
  );
  const data = await res.json();
  return (
    <div>
      <BrandHeader
        category={data?.data?.category}
        name="Product"
        image={data?.data?.image}
      />
      <div>
        <DetailsCard product={data?.data} key={data?.data?._id} />
      </div>
    </div>
  );
};

export default page;
