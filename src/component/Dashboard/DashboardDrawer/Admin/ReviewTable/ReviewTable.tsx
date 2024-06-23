"use client";
import Image from "next/image";

const ReviewTable = ({
  review,
  HandleToAdmin,
  HandleToCancel,
}: {
  review: any;
  HandleToAdmin?: any;
  HandleToCancel?: any;
}) => {
  console.log(review);
  return (
    <>
      <tr className="hover:bg-gray-50 border-b transition duration-300 text-black">
        <td className="py-4 px-6 border-b  font-semibold">
          <Image
            className=" size-10 rounded-full object-cover"
            width={20}
            height={20}
            src={
              review?.userId?.image
                ? review?.userId?.image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzfHCCdZf-Tu-MsUOkruCAexj1pwkHXdaMVA&s"
            }
            alt="Profile image"
          />
        </td>
        <td className="py-4 px-6 border-b  font-semibold">
          {review?.userId?.name}
        </td>
        <td className="py-4 px-6 border-b  font-medium border">
          {review?.productId?.name}
        </td>
        <td className="py-4 px-6 border-b  font-bold border">
          <Image
            className=" size-12 rounded-full"
            src={review?.productId?.image}
            width={20}
            height={20}
            alt="product image"
          />
        </td>
        <td className="py-4 px-6 border-b  font-bold border">
          {review?.userId?.email}
        </td>
      </tr>
    </>
  );
};

export default ReviewTable;
