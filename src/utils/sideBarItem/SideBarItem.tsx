import { UserRole } from "@/Types/Global";
import { USER_ROLE } from "@/constanc/constant";
import {
  MdReviews,
  MdLibraryAdd,
  MdOutlineAdminPanelSettings,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";

export const SideBarItem = (role: UserRole) => {
  const roleMenu = [];
  switch (role) {
    case USER_ROLE.superAdmin:
      roleMenu.push(
        {
          title: "Dashboard",
          path: `/${role}`,
          icon: RxDashboard,
        },
        {
          title: "Add-Products",
          path: `${role}/products/add-product`,
          icon: MdLibraryAdd,
        },
        {
          title: "Products",
          path: `${role}/products`,
          icon: MdOutlineShoppingCart,
        },
        {
          title: "Orders",
          path: `${role}/orders`,
          icon: MdOutlineShoppingCart,
        },
        {
          title: "Reviews",
          path: `${role}/reviews`,
          icon: MdOutlineShoppingCart,
        },
        {
          title: "Users",
          path: `${role}/all-user`,
          icon: FaUsersGear,
        },
        {
          title: "Admins",
          path: `${role}/all-admin`,
          icon: MdOutlineAdminPanelSettings,
        }
      );

      break;

    case USER_ROLE.admin:
      roleMenu.push(
        {
          title: "Dashboard",
          path: `/${role}`,
          icon: RxDashboard,
        },
        {
          title: "Add-Products",
          path: `${role}/products/add-product`,
          icon: MdLibraryAdd,
        },
        {
          title: "Products",
          path: `${role}/products`,
          icon: MdOutlineShoppingCart,
        },
        {
          title: "Orders",
          path: `${role}/orders`,
          icon: MdOutlineShoppingCart,
        }
      );

      break;

    case USER_ROLE.user:
      roleMenu.push(
        {
          title: "Dashboard",
          path: `/${role}`,
          icon: RxDashboard,
        },
        {
          title: "My-Orders",
          path: `${role}/my-orders`,
          icon: MdOutlineShoppingCart,
        },
        {
          title: "Reviews",
          path: `${role}/reviews`,
          icon: MdReviews,
        }
      );

    default:
      break;
  }
  return [...roleMenu];
};
