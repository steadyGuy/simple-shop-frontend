import Router from "./Router";
import CartAndFavouritesContextProvider from "./contexts/CartAndFavouritesContextProvider";
import SortByContextProvider from "./contexts/SortByContext";

function App() {
  return (
    <CartAndFavouritesContextProvider>
      <SortByContextProvider>
        <Router />
      </SortByContextProvider>
    </CartAndFavouritesContextProvider>
  );
}

export default App;
