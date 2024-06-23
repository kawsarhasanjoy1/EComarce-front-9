import { authKey } from "@/constanc/authKey";
import { deleteCookies } from "./deleteCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const logOutUser = async (router: AppRouterInstance) => {
  localStorage.removeItem(authKey);
  deleteCookies(authKey);
  router.push("/");
  router.refresh();
};

export default logOutUser;
