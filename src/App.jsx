import InvoiceList from "./pages/InvoiceList";
import useDataContext from "./hooks/useDataContext";
import PageOverlay from "./components/PageOverlay";
import { Routes, Route } from "react-router-dom";
import InvoiceDetails from "./pages/InvoiceDetails";

const App = () => {
    const { isOpenNewInvoice, isOpenEditInvoice, isOpenConfirmDelete } =
        useDataContext();

    return (
        <main className="min-h-screen sm:p-8 bg-slate-100 dark:bg-[#141625]">
            {(isOpenNewInvoice || isOpenEditInvoice || isOpenConfirmDelete) && (
                <PageOverlay />
            )}
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
        </main>
    );
};

export default App;
