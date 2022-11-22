import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Catalog from "./layouts/Catalog";
import Cart from "./layouts/Cart";
import { Redirect } from "./layouts/Redirect";
import { LoadEcosystem } from "./layouts/LoadEcosystem";
import { ResetEcosystem } from "./layouts/ResetEcosystem";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="w-screen h-screen flex flex-col">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Catalog />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/redirect" element={<Redirect />} />
                        <Route
                            path="/load-ecosystem"
                            element={<LoadEcosystem />}
                        />
                        <Route
                            path="/reset-ecosystem"
                            element={<ResetEcosystem />}
                        />
                        <Route path="/silent_renew" element={<Catalog />} />
                    </Routes>
                </div>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
