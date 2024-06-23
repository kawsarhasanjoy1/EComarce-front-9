"use client";
import Image from "next/image";

const UserTable = ({
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

        <td className="py-4 px-6 border-b border">
          <button
            onClick={
              users?.role === "admin"
                ? () => HandleToCancel(users?._id, "user")
                : () => HandleToAdmin(users?._id, "admin")
            }
            disabled={users?.role === "superAdmin"}
            className={`rounded-full ${
              users?.role === "admin"
                ? '" flex gap-1 items-center bg-red-200 px-3 rounded-full"'
                : '" flex gap-1 items-center bg-green-200 px-3 rounded-full"'
            }`}
          >
            {users?.role === "admin" ? "Cancel" : "Admin"}
          </button>
        </td>
      </tr>
    </>
  );
};

export default UserTable;
