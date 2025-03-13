'use client';

import { Outlet } from "react-router-dom";
import { useCartEffect } from "@/useCartEffect";


const MainLayout = () => {
  useCartEffect();

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer /> */}
    </div>
  );
};
export default MainLayout;
