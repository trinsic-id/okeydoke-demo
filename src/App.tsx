import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { IssueAny } from "./layouts/IssueAny/IssueAny";
import LandingPage from "./layouts/LandingPage";
import Shop from "./layouts/Shop";
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="flex h-screen w-screen flex-col">
                    <Routes>
                        <Route path="/shop/*" element={<Shop />} />
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/issue-any" element={<IssueAny />} />
                    </Routes>
                </div>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
