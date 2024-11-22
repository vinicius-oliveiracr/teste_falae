import React from "react";
import { Outlet } from "react-router-dom"
import Header from "../components/header"
import CartTab from "../components/cartTab"
import ProductForm from "../components/add_product";
const Layout: React.FC = () => {
    return (
        <div className='bg-zinc-200'>
            <main className={`w-[1200px] max-w-full m-auto p-5 align-left`}>
                <Header />
                <Outlet />
                <ProductForm />
            </main>
            <CartTab/>
        </div>
    )
}

export default Layout