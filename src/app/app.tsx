import Navigation from "components/Navigation";
import ShopItemsContent from "components/organisms/ShopItemsContent";

function App() {
  return (
    <>
      <Navigation />
      <main>
        <div className="bg-gray-100">
          <ShopItemsContent />
        </div>
      </main>
    </>
  );
}

export default App;
