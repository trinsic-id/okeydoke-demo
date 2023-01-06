import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Home } from "./layouts/Home";
import { Sidebar } from "./components/Sidebar";
const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="w-screen h-screen flex flex-row">
                    <div className="hidden md:block w-12 lg:w-[60px] h-full">
                        <Sidebar />
                    </div>
                    <div className="flex-1 h-full">
                        <Routes>
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </div>
                    <div className="hidden md:block lg:hidden bg-gray-200 w-12 h-full"></div>
                </div>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
