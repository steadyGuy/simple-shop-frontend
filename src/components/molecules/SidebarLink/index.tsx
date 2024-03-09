import React from "react";

type SidebarLinkProps = {
  id: number;
  name: string;
};

const SidebarLink = ({ id, name, slug }: SidebarLinkProps) => {
  return (
    <button
      aria-current="true"
      type="button"
      className="w-full px-4 py-2 font-medium text-left rtl:text-right text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600"
    >
      {name}
    </button>
  );
};

export default SidebarLink;
