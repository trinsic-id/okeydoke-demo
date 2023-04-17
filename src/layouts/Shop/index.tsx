import React from "react";

import {Route, Routes} from "react-router-dom";

import Header from "../../components/Shop/Header";
import Catalog from "./Catalog";
import Cart from "./Cart";
import {Redirect} from "./Redirect";
import {LoadEcosystem} from "./LoadEcosystem";
import {ResetEcosystem} from "./ResetEcosystem";

const Shop = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Catalog/>}/>
                <Route path="catalog" element={<Catalog/>}/>
                <Route path="cart" element={<Cart/>}/>
                <Route path="redirect" element={<Redirect/>}/>
                <Route
                    path="load-ecosystem"
                    element={<LoadEcosystem/>}
                />
                <Route
                    path="reset-ecosystem"
                    element={<ResetEcosystem/>}
                />
                <Route path="silent_renew" element={<Catalog/>}/>
            </Routes>
        </>
    );
}

export default Shop;
