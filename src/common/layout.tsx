import Navigation from "@/components/atoms/Navigation";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navigation />
      <main className="pt-10 md:pt-14">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
