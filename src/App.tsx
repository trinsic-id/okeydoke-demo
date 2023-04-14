import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Shop/Header";
import Catalog from "./layouts/Shop/Catalog";
import Cart from "./layouts/Shop/Cart";
import { Redirect } from "./layouts/Shop/Redirect";
import { LoadEcosystem } from "./layouts/Shop/LoadEcosystem";
import { ResetEcosystem } from "./layouts/Shop/ResetEcosystem";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="w-screen h-screen flex flex-col">
                    <Routes>
                        <Route path="/shop" element={<Header/>}>
                            <Route path="/shop/" element={<Catalog />} />
                            <Route path="/shop/catalog" element={<Catalog />} />
                            <Route path="/shop/cart" element={<Cart />} />
                            <Route path="/shop/redirect" element={<Redirect />} />
                            <Route
                                path="/shop/load-ecosystem"
                                element={<LoadEcosystem />}
                            />
                            <Route
                                path="/shop/reset-ecosystem"
                                element={<ResetEcosystem />}
                            />
                            <Route path="/shop/silent_renew" element={<Catalog />} />
                        </Route>
                    </Routes>
                </div>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
