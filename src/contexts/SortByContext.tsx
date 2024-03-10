import { SORTING_FEATURES } from "@/constants/global.constant";
import { SortBy } from "@/types";

import { createContext, useState } from "react";

interface ISortByContextProviderProps {
  children: JSX.Element[] | JSX.Element;
}

export const SortByContext = createContext<{
  sortBy: SortBy | undefined;
  handleSortChange: (_: SortBy) => void;
}>({
  sortBy: SORTING_FEATURES[0],
  handleSortChange: () => {},
});

const SortByContextProvider = ({ children }: ISortByContextProviderProps) => {
  const [sortBy, setSortBy] = useState<SortBy>();

  const handleSortChange = (newSortBy: { title: string; value: string }) => {
    setSortBy(newSortBy);
  };

  return (
    <SortByContext.Provider
      value={{ sortBy, handleSortChange: handleSortChange }}
    >
      {children}
    </SortByContext.Provider>
  );
};

export default SortByContextProvider;
