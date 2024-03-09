import ShopItem from "components/atoms/ShopItem";
import SidebarLink from "components/molecules/SidebarLink";

const ShopItemsContent = () => {
  return (
    <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
        Premium Sneakers
      </h2>
      <div className="grid grid-cols-12 min-h-screen">
        <div className="col-span-3 bg-white h-screen overflow-y-auto">
          <div className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <SidebarLink name="Test" id={1} />
            <button
              aria-current="true"
              type="button"
              className="w-full px-4 py-2 font-medium text-left rtl:text-right text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600"
            >
              Profile
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            >
              Settings
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            >
              Messages
            </button>
          </div>
        </div>
        <div className="col-span-9 bg-gray-100 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ShopItem />
            <ShopItem />
            <ShopItem />
            <ShopItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopItemsContent;
