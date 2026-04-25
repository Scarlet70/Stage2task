import { createContext } from "react";
import { useState, useEffect } from "react";

export const DataContext = createContext({});

const DataProvider = ({ children }) => {
    const [invoices, setInvoices] = useState(
        JSON.parse(localStorage.getItem("invoices")) || [],
    );

    useEffect(() => {
        localStorage.setItem("invoices", JSON.stringify(invoices));
    }, [invoices]);

    const [isOpenNewInvoice, setIsOpenNewInvoice] = useState(false);
    const [isOpenEditInvoice, setIsOpenEditInvoice] = useState(false);
    const [newInvoiceData, setNewInvoiceData] = useState({
        clientName: "",
        email: "",
        dueDate: "",
        status: "Pending",
        projectDescription: "",
        items: [
            {
                id: crypto.randomUUID(),
                name: "",
                quantity: 1,
                price: 0,
            },
        ],
        clientAddress: {
            street: "",
            city: "",
            postCode: "",
            country: "",
        },
        companyName: "",
        companyAddress: {
            street: "",
            city: "",
            postCode: "",
            country: "",
        },
        paymentTerms: "",
    });
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);

    const [filter, setFilter] = useState("none");
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    const filteredInvoices =
        filter === "none"
            ? invoices
            : invoices.filter((item) => item.status === filter);

    return (
        <DataContext.Provider
            value={{
                invoices,
                filteredInvoices,
                setInvoices,
                isOpenNewInvoice,
                setIsOpenNewInvoice,
                isOpenEditInvoice,
                setIsOpenEditInvoice,
                newInvoiceData,
                setNewInvoiceData,
                isOpenFilter,
                setIsOpenFilter,
                filter,
                setFilter,
                theme,
                setTheme,
                isOpenConfirmDelete,
                setIsOpenConfirmDelete,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
