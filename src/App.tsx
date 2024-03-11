import Router from "./Router";
import CartAndFavouritesContextProvider from "./contexts/CartAndFavouritesContextProvider";
import SortByContextProvider from "./contexts/SortByContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <CartAndFavouritesContextProvider>
      <SortByContextProvider>
        <Router />
        <ToastContainer />
      </SortByContextProvider>
    </CartAndFavouritesContextProvider>
  );
}

export default App;
