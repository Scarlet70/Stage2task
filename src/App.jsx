import InvoiceList from "./pages/InvoiceList";
import useDataContext from "./hooks/useDataContext";
import PageOverlay from "./components/PageOverlay";
import { Routes, Route } from "react-router-dom";
import InvoiceDetails from "./pages/InvoiceDetails";
import useTheme from "./hooks/useTheme";

const App = () => {
    const { theme } = useTheme();

    const { isOpenNewInvoice, isOpenEditInvoice } = useDataContext();

    return (
        <main className="min-h-screen sm:p-8 bg-slate-100 dark:bg-[#141625]">
            {(isOpenNewInvoice || isOpenEditInvoice) && <PageOverlay />}
            <Routes>
                <Route
                    path="/"
                    element={<InvoiceList />}
                />

                <Route
                    path="/invoice/:id"
                    element={<InvoiceDetails />}
                />
            </Routes>
            <p className="text-white text-center">{theme}</p>
        </main>
    );
};

export default App;
