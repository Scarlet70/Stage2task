import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataProvider from "./context/DataContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <DataProvider>
            <Router>
                <Routes>
                    <Route
                        path="/*"
                        element={<App />}
                    />
                </Routes>
            </Router>
        </DataProvider>
    </StrictMode>,
);
