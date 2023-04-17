import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Shop from "./layouts/Shop";
import LandingPage from "./layouts/LandingPage";
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="w-screen h-screen flex flex-col">
                    <Routes>
                        <Route path="/shop/*" element={<Shop/>} />
                        <Route path="/" element={<LandingPage/>} />
                    </Routes>
                </div>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
