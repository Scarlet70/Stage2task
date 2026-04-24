import { createContext } from "react";
import { useState } from "react";

export const DataContext = createContext({});

const DataProvider = ({ children }) => {
    const [invoices, setInvoices] = useState([
        {
            id: 1,
            displayId: "INV-001",
            clientName: "Verlin Precious",
            email: "verlinprincess@gmail.com",
            status: "Pending", //draft | pending | paid
            projectDescription: "Graphic Design",
            items: [
                {
                    name: "Brand Design",
                    quantity: 2,
                    price: 500,
                },
                { name: "Logo Design", quantity: 2, price: 500 },
            ],
            total: 2000,
            createdAt: "2026-04-20",
            dueDate: "2026-04-25",
            clientAddress: {
                street: "19 Union Terrace",
                city: "London",
                postCode: "E1 3EZ",
                country: "UK",
            },
            companyName: "cheta.Dev",
            companyAddress: {
                street: "Egbeda",
                city: "Lagos",
                postCode: "102023",
                country: "USA",
            },
            paymentTerms: "3 Days",
        },
        {
            id: 2,
            displayId: "INV-002",
            clientName: "Scarlet Edge",
            email: "chetachi464@gmail.com",
            status: "Paid", //draft | pending | paid
            projectDescription: "Graphic Design",
            items: [
                { name: "Web Design", quantity: 1, price: 500 },
                { name: "Flier Design", quantity: 1, price: 500 },
            ],
            total: 1000,
            createdAt: "2026-04-16",
            dueDate: "2026-04-28",
            clientAddress: {
                street: "19 Union Terrace",
                city: "London",
                postCode: "E1 3EZ",
                country: "Dubai",
            },
            companyName: "Phoenix.Dev",
            companyAddress: {
                street: "Egbeda",
                city: "Lagos",
                postCode: "502323",
                country: "USA",
            },
            paymentTerms: "5 Days",
        },
        {
            id: 3,
            displayId: "INV-003",
            clientName: "Chiamaka Vivian",
            email: "chiamaka123@gmail.com",
            status: "Draft", //draft | pending | paid
            projectDescription: "Graphic Design",
            items: [
                { name: "Web Design", quantity: 1, price: 500 },
                { name: "App Design", quantity: 1, price: 15000 },
            ],
            total: 15500,
            createdAt: "2026-04-16",
            dueDate: "2026-04-28",
            clientAddress: {
                street: "19 New Hampshire",
                city: "New York",
                postCode: "E1 3EZ",
                country: "USA",
            },
            companyName: "zubiLaunch corp",
            companyAddress: {
                street: "manhattan",
                city: "New york",
                postCode: "102023",
                country: "USA",
            },
            paymentTerms: "9 Days",
        },
    ]);
    const [isOpenNewInvoice, setIsOpenNewInvoice] = useState(true);
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
