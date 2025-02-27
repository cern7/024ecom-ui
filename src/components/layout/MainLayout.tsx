import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
// import {fetchCart} from "@/features/cart/cartSlice"

const MainLayout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
