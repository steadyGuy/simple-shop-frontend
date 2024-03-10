import SidebarLink from "@/components/molecules/SidebarLink";
import { useGetShops } from "@/queries/product-shop.query";

type SidebarProps = {
  activeShopId?: number;
};

const Sidebar = ({ activeShopId }: SidebarProps) => {
  const { data: shops } = useGetShops();
  return (
    <div className="col-span-3 bg-white h-fit overflow-y-auto">
      <div className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {shops?.map((shop) => (
          <SidebarLink
            name={shop.title}
            id={shop.id}
            key={shop.id}
            activeShopId={activeShopId}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
