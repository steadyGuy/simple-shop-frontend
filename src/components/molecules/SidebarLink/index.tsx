import clsx from "clsx";
import { Link } from "react-router-dom";

type SidebarLinkProps = {
  id: number;
  name: string;
  activeShopId?: number;
};

const SidebarLink = ({ id, name, activeShopId }: SidebarLinkProps) => {
  const isActive = activeShopId === id;
  return (
    <Link
      aria-current="true"
      to={`/shop/${id}`}
      type="button"
      className={clsx(
        "w-full px-4 py-2 font-medium text-left rtl:text-right rounded-none",
        isActive &&
          "text-white bg-blue-700 border-b border-gray-200 cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600",
        !isActive &&
          "w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
      )}
    >
      {name}
    </Link>
  );
};

export default SidebarLink;
