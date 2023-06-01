import { Route, Routes } from "react-router-dom";

import Header from "../../components/Shop/Header";
import Cart from "./Cart";
import Catalog from "./Catalog";
import { LoadEcosystem } from "./LoadEcosystem";
import { Redirect } from "./Redirect";
import { ResetEcosystem } from "./ResetEcosystem";

const Shop = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Catalog />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="cart" element={<Cart />} />
                <Route path="redirect" element={<Redirect />} />
                <Route path="load-ecosystem" element={<LoadEcosystem />} />
                <Route path="reset-ecosystem" element={<ResetEcosystem />} />
                <Route path="silent_renew" element={<Catalog />} />
            </Routes>
        </>
    );
};

export default Shop;
