import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import useDataContext from "../hooks/useDataContext";
import hasEmptyValues from "../utils/utility";
import NewItemForm from "./NewItemForm";
import {
    isValidEmail,
    isValidName,
    isValidField,
    isValidNumber,
    evalTotal,
    hasUndefinedProp,
} from "../utils/utility";

const EditInvoiceForm = ({ invoice }) => {
    const { invoices, setInvoices, setIsOpenEditInvoice } = useDataContext();

    //Form Validation State
    const [isFormError, setisFormError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isItemNameError, setIsItemNameError] = useState(false);
    const [itemNameErrorMsg, setItemNameErrorMsg] = useState("");
    const [isItemQtyError, setIsItemQtyError] = useState(false);
    const [itemQtyErrorMsg, setItemQtyErrorMsg] = useState("");
    const [isItemPriceError, setIsItemPriceError] = useState(false);
    const [itemPriceErrorMsg, setItemPriceErrorMsg] = useState("");
    const [invoiceItemErrorMsg, setInvoiceItemErrorMsg] = useState("");
    const [isPaymentTermsError, setIsPaymentTermsError] = useState(false);
    const [paymentTermsErrorMsg, setPaymentTermsErrorMsg] = useState("");

    //Company Side Validation State
    const [isNameError, setisNameError] = useState(false);
    const [nameErrorMsg, setNameErrorMsg] = useState("");
    const [isEmailError, setisEmailError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [isStreetError, setIsStreetError] = useState(false);
    const [streetErrorMsg, setStreetErrorMsg] = useState("");
    const [isCityError, setIsCityError] = useState(false);
    const [cityErrorMsg, setCityErrorMsg] = useState("");
    const [isCountryError, setIsCountryError] = useState(false);
    const [countryErrorMsg, setCountryErrorMsg] = useState("");
    const [isDescError, setIsDescError] = useState(false);
    const [descErrorMsg, setDescErrorMsg] = useState("");

    //Client Side Validation State
    const [isClientNameError, setisClientNameError] = useState(false);
    const [clientNameErrorMsg, setClientNameErrorMsg] = useState("");
    const [isClientStreetError, setIsClientStreetError] = useState(false);
    const [clientStreetErrorMsg, setClientStreetErrorMsg] = useState("");
    const [isClientCityError, setIsClientCityError] = useState(false);
    const [clientCityErrorMsg, setClientCityErrorMsg] = useState("");
    const [isClientCountryError, setIsClientCountryError] = useState(false);
    const [clientCountryErrorMsg, setClientCountryErrorMsg] = useState("");
    const [isDateError, setIsDateError] = useState(false);
    const [dateErrorMsg, setDateErrorMsg] = useState("");

    const [editInvoiceData, setEditInvoiceData] = useState({
        id: invoice.id,
        displayId: invoice.displayId,
        createdAt: invoice.createdAt,
        clientName: invoice.clientName,
        email: invoice.email,
        dueDate: invoice.dueDate,
        status: invoice.status,
        projectDescription: invoice.projectDescription,
        items: invoice.items.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
        })),
        clientAddress: {
            street: invoice.clientAddress.street,
            city: invoice.clientAddress.city,
            postCode: invoice.clientAddress.postCode,
            country: invoice.clientAddress.country,
        },
        companyName: invoice.companyName,
        companyAddress: {
            street: invoice.companyAddress.street,
            city: invoice.companyAddress.city,
            postCode: invoice.companyAddress.postCode,
            country: invoice.companyAddress.country,
        },
        paymentTerms: invoice.paymentTerms,
    });

    const createEditInvoice = () => {
        const currentDate = new Date().toISOString().split("T")[0];

        const items = editInvoiceData.items.map((item) => ({
            id: item.id ?? crypto.randomUUID(),
            name: item.name,
            quantity: Number(item.quantity) || 0,
            price: Number(item.price) || 0,
        }));

        const editedInvoice = {
            id: editInvoiceData.id,
            displayId: editInvoiceData.displayId,
            createdAt: currentDate,
            clientName: editInvoiceData.clientName,
            email: editInvoiceData.email,
            dueDate: editInvoiceData.dueDate,
            status: "Pending",
            projectDescription: editInvoiceData.projectDescription,
            items,
            clientAddress: {
                street: editInvoiceData.clientAddress.street,
                city: editInvoiceData.clientAddress.city,
                postCode: editInvoiceData.clientAddress.postCode,
                country: editInvoiceData.clientAddress.country,
            },
            companyName: editInvoiceData.companyName,
            companyAddress: {
                street: editInvoiceData.companyAddress.street,
                city: editInvoiceData.companyAddress.city,
                postCode: editInvoiceData.companyAddress.postCode,
                country: editInvoiceData.companyAddress.country,
            },
            paymentTerms: editInvoiceData.paymentTerms,
            total: evalTotal(items),
        };

        const newInvoices = [...invoices, editedInvoice];

        setInvoices(newInvoices);
        setEditInvoiceData({
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
    };

    const handleItemChange = (id, field, value) => {
        setEditInvoiceData((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          [field]:
                              value === undefined || value === ""
                                  ? field === "name"
                                      ? ""
                                      : 0
                                  : value,
                      }
                    : item,
            ),
        }));
    };

    const addNewItem = () => {
        let canAddItem;

        if (
            !isValidField(
                editInvoiceData.items[editInvoiceData.items.length - 1].name,
            )
        ) {
            setIsItemNameError(true);
            setItemNameErrorMsg("Enter the Item Name!");
            canAddItem = false;
            return;
        } else {
            setIsItemNameError(false);
            setItemNameErrorMsg("");
            canAddItem = true;
        }

        if (
            !isValidNumber(
                editInvoiceData.items[editInvoiceData.items.length - 1]
                    .quantity,
            )
        ) {
            setIsItemQtyError(true);
            setItemQtyErrorMsg("Value must be > 1");
            canAddItem = false;
            return;
        } else {
            setIsItemQtyError(false);
            setItemQtyErrorMsg("");
            canAddItem = true;
        }

        if (
            !isValidNumber(
                editInvoiceData.items[editInvoiceData.items.length - 1].price,
            )
        ) {
            setIsItemPriceError(true);
            setItemPriceErrorMsg("Value must be > 1");
            canAddItem = false;
            return;
        } else {
            setIsItemPriceError(false);
            setItemPriceErrorMsg("");
            canAddItem = true;
        }

        if (canAddItem) {
            const newItem = {
                id: crypto.randomUUID(),
                name: "",
                quantity: 1,
                price: 0,
            };

            setEditInvoiceData((prev) => ({
                ...prev,
                items: [...prev.items, newItem],
            }));
        }

        return;
    };

    const deleteItem = (id) => {
        setEditInvoiceData((prev) => {
            if (prev.items.length === 1) return prev;

            return {
                ...prev,
                items: prev.items.filter((item) => item.id !== id),
            };
        });
    };

    /* const cancelEdit = () => {
        const unChangedInvoice = {
            id: invoice.id,
            displayId: invoice.displayId,
            createdAt: invoice.createdAt,
            clientName: invoice.clientName,
            email: invoice.email,
            dueDate: invoice.dueDate,
            status: invoice.status,
            projectDescription: invoice.projectDescription,
            items: invoice.items.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
            clientAddress: {
                street: invoice.clientAddress.street,
                city: invoice.clientAddress.city,
                postCode: invoice.clientAddress.postCode,
                country: invoice.clientAddress.country,
            },
            companyName: invoice.companyName,
            companyAddress: {
                street: invoice.companyAddress.street,
                city: invoice.companyAddress.city,
                postCode: invoice.companyAddress.postCode,
                country: invoice.companyAddress.country,
            },
            paymentTerms: invoice.paymentTerms,
            total: invoice.total,
        };

        setInvoices((prev) => [
            ...prev.filter((inv) => inv.id !== unChangedInvoice),
            unChangedInvoice,
        ]);
        setIsOpenEditInvoice(false);
    }; */

    const handleSubmit = () => {
        const areEmptyFields = hasEmptyValues(editInvoiceData);

        //Company Validation
        if (!isValidName(editInvoiceData.companyName)) {
            setisNameError(true);
            setNameErrorMsg(
                "must be at least 3 Characters long and contain letters only",
            );
        } else {
            setisNameError(false);
            setNameErrorMsg("");
        }

        if (!isValidField(editInvoiceData.companyAddress.street)) {
            setIsStreetError(true);
            setStreetErrorMsg("This field is required!");
        } else {
            setIsStreetError(false);
            setStreetErrorMsg("");
        }

        if (!isValidField(editInvoiceData.companyAddress.city)) {
            setIsCityError(true);
            setCityErrorMsg("City is required!");
        } else {
            setIsCityError(false);
            setCityErrorMsg("");
        }

        if (!isValidField(editInvoiceData.companyAddress.country)) {
            setIsCountryError(true);
            setCountryErrorMsg("Country is required!");
        } else {
            setIsCountryError(false);
            setCountryErrorMsg("");
        }

        //Client Validation
        if (!isValidName(editInvoiceData.clientName)) {
            setisClientNameError(true);
            setClientNameErrorMsg(
                "must be at least 3 Characters long and contain letters only",
            );
        } else {
            setisClientNameError(false);
            setClientNameErrorMsg("");
        }

        if (!isValidField(editInvoiceData.clientAddress.street)) {
            setIsClientStreetError(true);
            setClientStreetErrorMsg("This field is required!");
        } else {
            setIsClientStreetError(false);
            setClientStreetErrorMsg("");
        }

        if (!isValidField(editInvoiceData.clientAddress.city)) {
            setIsClientCityError(true);
            setClientCityErrorMsg("City is required!");
        } else {
            setIsClientCityError(false);
            setClientCityErrorMsg("");
        }

        if (!isValidField(editInvoiceData.clientAddress.country)) {
            setIsClientCountryError(true);
            setClientCountryErrorMsg("Country is required!");
        } else {
            setIsClientCountryError(false);
            setClientCountryErrorMsg("");
        }

        if (!isValidEmail(editInvoiceData.email)) {
            setisEmailError(true);
            setEmailErrorMsg("Please enter a valid email!");
        } else {
            setisEmailError(false);
            setEmailErrorMsg("");
        }

        if (!isValidField(editInvoiceData.dueDate)) {
            setIsDateError(true);
            setDateErrorMsg("Choose a Due date");
        } else {
            setIsDateError(false);
            setDateErrorMsg("");
        }

        if (!isValidField(editInvoiceData.paymentTerms)) {
            setIsPaymentTermsError(true);
            setPaymentTermsErrorMsg("Provide payment terms");
        } else {
            setIsPaymentTermsError(false);
            setPaymentTermsErrorMsg("");
        }

        //General Form Validation
        if (!isValidField(editInvoiceData.projectDescription)) {
            setIsDescError(true);
            setDescErrorMsg("This field is required!");
        } else {
            setIsDescError(false);
            setDescErrorMsg("");
        }

        if (areEmptyFields) {
            setisFormError(true);
            setErrorMsg("Please fill all the required fields!");
            return;
        } else {
            setisFormError(false);
            setErrorMsg("");
        }

        if (hasUndefinedProp(editInvoiceData.items)) {
            setInvoiceItemErrorMsg("Save a New Item to the invoice!");
            return;
        } else {
            setInvoiceItemErrorMsg("");
        }

        createEditInvoice();
        setIsOpenEditInvoice(false);
    };

    return (
        <article
            className="sm:min-h-full bg-white sm:rounded-tr-2xl sm:rounded-br-2xl p-8 fixed sm:top-0 sm:left-16 md:w-[65%] lg:w-[45%] w-full h-[calc(100%-56px)] left-0 top-15 overflow-auto z-1000 dark:bg-[#141625]  [&::-webkit-scrollbar]:w-2
                                            [&::-webkit-scrollbar-track]:bg-gray-200
                                            [&::-webkit-scrollbar-thumb]:bg-gray-400
                                            [&::-webkit-scrollbar-thumb]:rounded-full

                                            dark:[&::-webkit-scrollbar-track]:bg-gray-800
                                            dark:[&::-webkit-scrollbar-thumb]:bg-gray-600"
        >
            <h2 className="font-bold text-2xl dark:text-white">
                Edit <span className="dark:text-slate-500">#</span>
                {editInvoiceData.displayId}
            </h2>
            <p className="text-xs text-[#7E88C3] text-center">
                Note: all inputs with the '<span className="text-3xl">*</span>'
                symbol are required for submission
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
                <section className="p-4">
                    <h3 className="font-semibold text-md mb-4 text-[#7C5DFA]">
                        Bill From
                    </h3>
                    <div className="input-field">
                        <div className="input-group w-[calc(50%-1rem)]">
                            <label
                                className="flex gap-2"
                                htmlFor="company-name"
                            >
                                Company Name{" "}
                                <span className="text-red-700 text-sm">*</span>
                            </label>
                            <input
                                type="text"
                                id="company-name"
                                value={editInvoiceData.companyName}
                                onChange={(e) =>
                                    setEditInvoiceData({
                                        ...editInvoiceData,
                                        companyName: e.target.value,
                                    })
                                }
                            />
                            {isNameError && (
                                <p className="text-xs text-red-500 text-center">
                                    {nameErrorMsg}
                                </p>
                            )}
                        </div>
                        <div className="input-group w-[calc(50%-1rem)]">
                            <label
                                className="flex gap-2"
                                htmlFor="company-address"
                            >
                                Address{" "}
                                <span className="text-red-700 text-sm">*</span>
                            </label>
                            <input
                                type="text"
                                id="company-address"
                                value={editInvoiceData.companyAddress.street}
                                onChange={(e) =>
                                    setEditInvoiceData((prev) => ({
                                        ...prev,
                                        companyAddress: {
                                            ...prev.companyAddress,
                                            street: e.target.value,
                                        },
                                    }))
                                }
                            />
                            {isStreetError && (
                                <p className="text-xs text-red-500 text-center">
                                    {streetErrorMsg}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input-group w-[calc(33%-0.7rem)]">
                            <label
                                className="flex gap-2"
                                htmlFor="sender-city"
                            >
                                City{" "}
                                <span className="text-red-700 text-sm">*</span>
                            </label>
                            <input
                                type="text"
                                id="sender-city"
                                value={editInvoiceData.companyAddress.city}
                                onChange={(e) =>
                                    setEditInvoiceData((prev) => ({
                                        ...prev,
                                        companyAddress: {
                                            ...prev.companyAddress,
                                            city: e.target.value,
                                        },
                                    }))
                                }
                            />
                            {isCityError && (
                                <p className="text-xs text-red-500 text-center">
                                    {cityErrorMsg}
                                </p>
                            )}
                        </div>
                        <div className="input-group w-[calc(33%-0.7rem)]">
                            <label
                                className="flex gap-2"
                                htmlFor="sender-post-code"
                            >
                                Post Code
                            </label>
                            <input
                                type="text"
                                id="sender-post-code"
                                value={editInvoiceData.companyAddress.postCode}
                                onChange={(e) =>
                                    setEditInvoiceData((prev) => ({
                                        ...prev,
                                        companyAddress: {
                                            ...prev.companyAddress,
                                            postCode: e.target.value,
                                        },
                                    }))
                                }
                            />
                        </div>
                        <div className="input-group w-[calc(33%-0.7rem)]">
                            <label
                                className="flex gap-2"
                                htmlFor="sender-country"
                            >
                                Country{" "}
                                <span className="text-red-700 text-sm">*</span>
                            </label>
                            <input
                                type="text"
                                id="sender-country"
                                value={editInvoiceData.companyAddress.country}
                                onChange={(e) =>
                                    setEditInvoiceData((prev) => ({
                                        ...prev,
                                        companyAddress: {
                                            ...prev.companyAddress,
                                            country: e.target.value,
                                        },
                                    }))
                                }
                            />
                            {isCountryError && (
                                <p className="text-xs text-red-500 text-center">
                                    {countryErrorMsg}
                                </p>
                            )}
                        </div>
                    </div>
                </section>
                <section className="p-4 flex flex-col gap-4">
                    <h3 className="font-semibold text-md mb-4 text-[#7C5DFA]">
                        Bill To
                    </h3>
                    <div className="input-group">
                        <label
                            className="flex gap-2"
                            htmlFor="client-name"
                        >
                            Client's Name{" "}
                            <span className="text-red-700 text-sm">*</span>
                        </label>
                        <input
                            type="text"
                            id="client-name"
                            value={editInvoiceData.clientName}
                            onChange={(e) =>
                                setEditInvoiceData({
                                    ...editInvoiceData,
                                    clientName: e.target.value,
                                })
                            }
                        />
                        {isClientNameError && (
                            <p className="text-xs text-red-500 text-center">
                                {clientNameErrorMsg}
                            </p>
                        )}
                    </div>
                    <div className="input-group">
                        <label
                            className="flex gap-2"
                            htmlFor="client-email"
                        >
                            Client's Email{" "}
                            <span className="text-red-700 text-sm">*</span>
                        </label>
                        <input
                            type="text"
                            id="client-email"
                            placeholder="e.g chetadev@gmail.com"
                            value={editInvoiceData.email}
                            onChange={(e) =>
                                setEditInvoiceData((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                        />
                        {isEmailError && (
                            <p className="text-sm text-red-500 text-center">
                                {emailErrorMsg}
                            </p>
                        )}
                    </div>
                    <div className="input-group">
                        <label
                            className="flex gap-2"
                            htmlFor="client-address"
                        >
                            Street Address{" "}
                            <span className="text-red-700 text-sm">*</span>
                        </label>
                        <input
                            type="text"
                            id="client-address"
                            value={editInvoiceData.clientAddress.street}
                            onChange={(e) =>
                                setEditInvoiceData((prev) => ({
                                    ...prev,
                                    clientAddress: {
                                        ...prev.clientAddress,
                                        street: e.target.value,
                                    },
                                }))
                            }
                        />
                        {isClientStreetError && (
                            <p className="text-xs text-red-500 text-center">
                                {clientStreetErrorMsg}
                            </p>
                        )}
                    </div>
                    <div className="input-field">
                        <div className="input-group w-[calc(33%-0.7rem)]">
                            <label
                                className="flex gap-2"
                                htmlFor="client-city"
                            >
                                City{" "}
                                <span className="text-red-700 text-sm">*</span>
                            </label>
                            <input
                                type="text"
                                id="client-city"
                                value={editInvoiceData.clientAddress.city}
                                onChange={(e) =>
                                    setEditInvoiceData((prev) => ({
                                        ...prev,
                                        clientAddress: {
                                            ...prev.clientAddress,
                                            city: e.target.value,
                                        },
                                    }))
                                }
                            />
                            {isClientCityError && (
                                <p className="text-xs text-red-500 text-center">
                                    {clientCityErrorMsg}
                                </p>
                            )}
                        </div>
                        <div className="input-group w-[calc(33%-0.7rem)]">
                            <label
                                className="flex gap-2"
                                htmlFor="client-post-code"
                            >
                                Post Code
                            </label>
                            <input
                                type="text"
                                id="client-post-code"
                                value={editInvoiceData.clientAddress.postCode}
                                onChange={(e) =>
                                    setEditInvoiceData((prev) => ({
                                        ...prev,
                                        clientAddress: {
                                            ...prev.clientAddress,
                                            postCode: e.target.value,
                                        },
                                    }))
                                }
                            />
                        </div>
                        <div className="input-group w-[calc(33%-0.7rem)]">
                            <label
                                className="flex gap-2"
                                htmlFor="client-country"
                            >
                                Country{" "}
                                <span className="text-red-700 text-sm">*</span>
                            </label>
                            <input
                                type="text"
                                id="client-country"
                                value={editInvoiceData.clientAddress.country}
                                onChange={(e) =>
                                    setEditInvoiceData((prev) => ({
                                        ...prev,
                                        clientAddress: {
                                            ...prev.clientAddress,
                                            country: e.target.value,
                                        },
                                    }))
                                }
                            />
                            {isClientCountryError && (
                                <p className="text-xs text-red-500 text-center">
                                    {clientCountryErrorMsg}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input-group w-[calc(50%-1rem)]">
                            <label
                                className="flex gap-2"
                                htmlFor="invoice-date"
                            >
                                Invoice Due Date{" "}
                                <span className="text-red-700 text-sm">*</span>
                            </label>
                            <input
                                type="date"
                                id="invoice-date"
                                value={editInvoiceData.dueDate}
                                onChange={(e) =>
                                    setEditInvoiceData({
                                        ...editInvoiceData,
                                        dueDate: e.target.value,
                                    })
                                }
                            />
                            {isDateError && (
                                <p className="text-xs text-red-500 text-center">
                                    {dateErrorMsg}
                                </p>
                            )}
                        </div>
                        <div className="input-group w-[calc(50%-1rem)]">
                            <label
                                className="flex gap-2"
                                htmlFor="payment-terms"
                            >
                                Payment Terms
                            </label>
                            <div className="select-wrapper">
                                <select
                                    id="payment-terms"
                                    value={editInvoiceData.paymentTerms}
                                    onChange={(e) =>
                                        setEditInvoiceData({
                                            ...editInvoiceData,
                                            paymentTerms: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Choose Terms</option>
                                    <option value="1 day">Next 1 day</option>
                                    <option value="7 days">Next 7 days</option>
                                    <option value="14 days">
                                        Next 14 days
                                    </option>
                                    <option value="30 days">
                                        Next 30 days
                                    </option>
                                </select>
                                <ChevronDown className="icon text-[#7C5DFA]" />
                                {isPaymentTermsError && (
                                    <p className="text-xs text-red-500 text-center">
                                        {paymentTermsErrorMsg}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="input-group">
                        <label
                            className="flex gap-2"
                            htmlFor="project-description"
                        >
                            Project Description{" "}
                            <span className="text-red-700 text-sm">*</span>
                        </label>
                        <input
                            type="text"
                            id="project-description"
                            placeholder="e.g: Graphics Design Service"
                            value={editInvoiceData.projectDescription}
                            onChange={(e) =>
                                setEditInvoiceData({
                                    ...editInvoiceData,
                                    projectDescription: e.target.value,
                                })
                            }
                        />
                        {isDescError && (
                            <p className="text-xs text-red-500 text-center">
                                {descErrorMsg}
                            </p>
                        )}
                    </div>
                </section>
                <section className="p-4 flex flex-col gap-4 mb-20">
                    <h3 className="font-semibold text-md mb-4 text-[#777F98]">
                        Item List
                    </h3>
                    <section className="flex flex-col gap-2">
                        {editInvoiceData.items.map((item, i) => (
                            <NewItemForm
                                key={item.id || i}
                                item={item}
                                isItemNameError={isItemNameError}
                                isItemQtyError={isItemQtyError}
                                isItemPriceError={isItemPriceError}
                                itemNameErrorMsg={itemNameErrorMsg}
                                itemPriceErrorMsg={itemPriceErrorMsg}
                                itemQtyErrorMsg={itemQtyErrorMsg}
                                handleItemChange={handleItemChange}
                                deleteItem={deleteItem}
                            />
                        ))}
                        {invoiceItemErrorMsg !== "" && (
                            <p className="text-md text-center text-red-500">
                                {invoiceItemErrorMsg}
                            </p>
                        )}
                    </section>
                    <button
                        className="flex items-center justify-center gap-1 px-8 py-3 rounded-4xl font-semibold text-[#777F98] bg-[#F9FAFE] hover:bg-[#7C5DFA] hover:text-white transition-all duration-300 dark:bg-[#252945] dark:text-[#DFE3FA]"
                        onClick={addNewItem}
                    >
                        <Plus className="pb-1.5" />
                        Add New Item
                    </button>
                    {isFormError && (
                        <p className="text-md text-center text-red-500">
                            {errorMsg}
                        </p>
                    )}
                </section>
            </form>
            <div className="w-[calc(100%-15px)] flex flex-nowrap justify-end gap-2 p-4 fixed bottom-0 sm:left-16 md:w-[65%] lg:w-[calc(45%-15px)] left-0 bg-white dark:bg-[#141625]">
                <button
                    className="md:px-8 px-4 py-3 rounded-4xl font-semibold text-[#7E88C3] bg-[#F9FAFE] text-sm hover:bg-[#252945] hover:text-slate-300 transition-all duration-200 dark:bg-[#252945]"
                    onClick={() => setIsOpenEditInvoice(false)}
                >
                    Cancel
                </button>
                <button
                    className="md:px-8 px-4 py-3 rounded-4xl font-semibold text-[#FFFFFF] bg-[#7C5DFA] text-sm hover:bg-[#9277FF] transition-all duration-200"
                    onClick={handleSubmit}
                >
                    Save Changes
                </button>
            </div>
        </article>
    );
};

export default EditInvoiceForm;
