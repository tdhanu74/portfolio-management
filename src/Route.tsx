import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import Portfolio from "./pages/Portfolio/Portfolio";
import Navbar from "@/components/Navbar/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <div style={{ marginLeft: "14rem" }}>
        <Outlet />
      </div>
    </>
  );
}

function Route() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "portfolio",
          element: <Portfolio />,
        },
      ],
    },
  ]);
  return router;
}

export default Route;
