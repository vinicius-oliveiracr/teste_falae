import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import CartTab from "../components/cartTab";

const Layout: React.FC = () => {
    return (
        <div className="bg-zinc-200">
            <main className="w-[1200px] max-w-full m-auto p-5">
                <Header />
                <Outlet />
            </main>
            <CartTab />
        </div>
    );
};

export default Layout;
