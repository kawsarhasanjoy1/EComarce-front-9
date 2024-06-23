"use client";
import Image from "next/image";

const AdminTable = ({
  users,
  HandleToAdmin,
  HandleToCancel,
}: {
  users: any;
  HandleToAdmin?: any;
  HandleToCancel?: any;
}) => {
  return (
    <>
      <tr className="hover:bg-gray-50 border-b transition duration-300 text-black">
        <td className="py-4 px-6 border-b  font-semibold">
          <Image
            className=" size-10 rounded-full object-cover"
            width={20}
            height={20}
            src={
              users?.image
                ? users?.image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzfHCCdZf-Tu-MsUOkruCAexj1pwkHXdaMVA&s"
            }
            alt="Profile image"
          />
        </td>
        <td className="py-4 px-6 border-b  font-semibold">{users?.name}</td>
        <td className="py-4 px-6 border-b  font-medium border">
          {users?.email}
        </td>
        <td className="py-4 px-6 border-b  font-bold border">
          <p className="bg-green-100  rounded-full px-4 flex justify-center items-center">
            {users?.role}
          </p>
        </td>
      </tr>
    </>
  );
};

export default AdminTable;
