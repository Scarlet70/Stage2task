import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import useDataContext from "../hooks/useDataContext";
import hasEmptyValues from "../utils/utility";
import {
    isValidEmail,
    isValidName,
    isValidField,
    isValidNumber,
    evalTotal,
    hasUndefinedProp,
} from "../utils/utility";

const EditInvoiceForm = ({ invoice }) => {
    const {
        invoices,
        setInvoices,
        setIsOpenEditInvoice,
        newInvoiceData,
        setNewInvoiceData,
    } = useDataContext();

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

    const [EditInvoiceData, setEditInvoiceData] = useState({
        clientName: invoice.clientName,
        email: invoice.email,
        dueDate: invoice.dueDate,
        status: invoice.status,
        projectDescription: invoice.projectDescription,
        items: [
            {
                name:
                    invoice.items[Math.max(0, invoice.items.length - 2)]
                        ?.name || "",
                quantity:
                    invoice.items[Math.max(0, invoice.items.length - 2)]
                        ?.quantity || "",
                price:
                    invoice.items[Math.max(0, invoice.items.length - 2)]
                        ?.price || "",
            },
        ],
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

    const EditInvoice = () => {
        const newId = invoices.length
            ? invoices[invoices.length - 1].id + 1
            : 1;

        const newDisplayId = `INV-00${newId}`;
        const currentDate = new Date().toISOString().split("T")[0];

        const updatedInvoice = {
            id: newId,
            displayId: newDisplayId,
            createdAt: currentDate,
            clientName: newInvoiceData.clientName,
            email: newInvoiceData.email,
            dueDate: newInvoiceData.dueDate,
            status: "Pending",
            projectDescription: newInvoiceData.projectDescription,
            items: [
                {
                    name:
                        newInvoiceData.items[
                            Math.max(0, newInvoiceData.items.length - 2)
                        ]?.name || "",
                    quantity:
                        newInvoiceData.items[
                            Math.max(0, newInvoiceData.items.length - 2)
                        ]?.quantity || "",
                    price:
                        newInvoiceData.items[
                            Math.max(0, newInvoiceData.items.length - 2)
                        ]?.price || "",
                },
            ],
            clientAddress: {
                street: newInvoiceData.clientAddress.street,
                city: newInvoiceData.clientAddress.city,
                postCode: newInvoiceData.clientAddress.postCode,
                country: newInvoiceData.clientAddress.country,
            },
            companyName: newInvoiceData.companyName,
            companyAddress: {
                street: newInvoiceData.companyAddress.street,
                city: newInvoiceData.companyAddress.city,
                postCode: newInvoiceData.companyAddress.postCode,
                country: newInvoiceData.companyAddress.country,
            },
            paymentTerms: newInvoiceData.paymentTerms,
        };

        updatedInvoice.total = evalTotal([...newInvoiceData.items]);

        const newInvoices = [...invoices, updatedInvoice];

        setInvoices(newInvoices);

        console.log(updatedInvoice);
    };

    const addNewItem = () => {
        let canAddItem;

        if (
            !isValidField(
                newInvoiceData.items[newInvoiceData.items.length - 1].name,
            )
        ) {
            setIsItemNameError(true);
            setItemNameErrorMsg("Enter the Item Name!");
            canAddItem = false;
        } else {
            setIsItemNameError(false);
            setItemNameErrorMsg("");
            canAddItem = true;
        }

        if (
            !isValidNumber(
                newInvoiceData.items[newInvoiceData.items.length - 1].quantity,
            )
        ) {
            setIsItemQtyError(true);
            setItemQtyErrorMsg("Value must be > 1");
            canAddItem = false;
        } else {
            setIsItemQtyError(false);
            setItemQtyErrorMsg("");
            canAddItem = true;
        }

        if (
            !isValidNumber(
                newInvoiceData.items[newInvoiceData.items.length - 1].price,
            )
        ) {
            setIsItemPriceError(true);
            setItemPriceErrorMsg("Value must be > 1");
            canAddItem = false;
        } else {
            setIsItemPriceError(false);
            setItemPriceErrorMsg("");
            canAddItem = true;
        }

        if (canAddItem) {
            const newItem = { name: "", quantity: "", price: "", total: "" };

            setNewInvoiceData((prev) => ({
                ...prev,
                items: [...prev.items, newItem],
            }));
        }

        return;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const areEmptyFields = hasEmptyValues(newInvoiceData);

        //Company Validation
        if (!isValidName(newInvoiceData.companyName)) {
            setisNameError(true);
            setNameErrorMsg(
                "must be at least 3 Characters long and contain letters only",
            );
        } else {
            setisNameError(false);
            setNameErrorMsg("");
        }

        if (!isValidField(newInvoiceData.companyAddress.street)) {
            setIsStreetError(true);
            setStreetErrorMsg("This field is required!");
        } else {
            setIsStreetError(false);
            setStreetErrorMsg("");
        }

        if (!isValidField(newInvoiceData.companyAddress.city)) {
            setIsCityError(true);
            setCityErrorMsg("City is required!");
        } else {
            setIsCityError(false);
            setCityErrorMsg("");
        }

        if (!isValidField(newInvoiceData.companyAddress.country)) {
            setIsCountryError(true);
            setCountryErrorMsg("Country is required!");
        } else {
            setIsCountryError(false);
            setCountryErrorMsg("");
        }

        //Client Validation
        if (!isValidName(newInvoiceData.clientName)) {
            setisClientNameError(true);
            setClientNameErrorMsg(
                "must be at least 3 Characters long and contain letters only",
            );
        } else {
            setisClientNameError(false);
            setClientNameErrorMsg("");
        }

        if (!isValidField(newInvoiceData.clientAddress.street)) {
            setIsClientStreetError(true);
            setClientStreetErrorMsg("This field is required!");
        } else {
            setIsClientStreetError(false);
            setClientStreetErrorMsg("");
        }

        if (!isValidField(newInvoiceData.clientAddress.city)) {
            setIsClientCityError(true);
            setClientCityErrorMsg("City is required!");
        } else {
            setIsClientCityError(false);
            setClientCityErrorMsg("");
        }

        if (!isValidField(newInvoiceData.clientAddress.country)) {
            setIsClientCountryError(true);
            setClientCountryErrorMsg("Country is required!");
        } else {
            setIsClientCountryError(false);
            setClientCountryErrorMsg("");
        }

        if (!isValidEmail(newInvoiceData.email)) {
            setisEmailError(true);
            setEmailErrorMsg("Please enter a valid email!");
        } else {
            setisEmailError(false);
            setEmailErrorMsg("");
        }

        if (!isValidField(newInvoiceData.dueDate)) {
            setIsDateError(true);
            setDateErrorMsg("Choose a Due date");
        } else {
            setIsDateError(false);
            setDateErrorMsg("");
        }

        if (!isValidField(newInvoiceData.paymentTerms)) {
            setIsPaymentTermsError(true);
            setPaymentTermsErrorMsg("Provide payment terms");
        } else {
            setIsPaymentTermsError(false);
            setPaymentTermsErrorMsg("");
        }

        //General Form Validation
        if (!isValidField(newInvoiceData.projectDescription)) {
            setIsDescError(true);
            setDescErrorMsg("This field is required!");
        } else {
            setIsDescError(false);
            setDescErrorMsg("");
        }

        if (areEmptyFields) {
            setisFormError(true);
            setErrorMsg("Please fill all the required fields!");
            console.log(newInvoiceData);
            return;
        } else {
            setisFormError(false);
            setErrorMsg("");
        }

        if (hasUndefinedProp(newInvoiceData.items)) {
            setInvoiceItemErrorMsg("Save a New Item to the invoice!");
            return;
        } else {
            setInvoiceItemErrorMsg("");
        }

        EditInvoice();
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
                {invoice.displayId}
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
                                value={newInvoiceData.companyName}
                                onChange={(e) =>
                                    setNewInvoiceData({
                                        ...newInvoiceData,
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
                                value={newInvoiceData.companyAddress.street}
                                onChange={(e) =>
                                    setNewInvoiceData((prev) => ({
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
                                value={newInvoiceData.companyAddress.city}
                                onChange={(e) =>
                                    setNewInvoiceData((prev) => ({
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
                                value={newInvoiceData.companyAddress.postCode}
                                onChange={(e) =>
                                    setNewInvoiceData((prev) => ({
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
                                value={newInvoiceData.companyAddress.country}
                                onChange={(e) =>
                                    setNewInvoiceData((prev) => ({
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
                            value={newInvoiceData.clientName}
                            onChange={(e) =>
                                setNewInvoiceData({
                                    ...newInvoiceData,
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
                            value={newInvoiceData.email}
                            onChange={(e) =>
                                setNewInvoiceData((prev) => ({
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
                            value={newInvoiceData.clientAddress.street}
                            onChange={(e) =>
                                setNewInvoiceData((prev) => ({
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
                                value={newInvoiceData.clientAddress.city}
                                onChange={(e) =>
                                    setNewInvoiceData((prev) => ({
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
                                value={newInvoiceData.clientAddress.postCode}
                                onChange={(e) =>
                                    setNewInvoiceData((prev) => ({
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
                                value={newInvoiceData.clientAddress.country}
                                onChange={(e) =>
                                    setNewInvoiceData((prev) => ({
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
                                value={newInvoiceData.dueDate}
                                onChange={(e) =>
                                    setNewInvoiceData({
                                        ...newInvoiceData,
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
                                    value={newInvoiceData.paymentTerms}
                                    onChange={(e) =>
                                        setNewInvoiceData({
                                            ...newInvoiceData,
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
                            value={newInvoiceData.projectDescription}
                            onChange={(e) =>
                                setNewInvoiceData({
                                    ...newInvoiceData,
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
                        <article className="flex flex-nowrap gap-2 text-[#777F98] text-sm">
                            <div className="input-group w-[45%]">
                                <label
                                    className="flex gap-2"
                                    htmlFor="item-name"
                                >
                                    Item Name{" "}
                                    <span className="text-red-700 text-sm">
                                        *
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    id="item-name"
                                    value={
                                        newInvoiceData.items[
                                            newInvoiceData.items.length - 1
                                        ].name
                                    }
                                    onChange={(e) =>
                                        setNewInvoiceData((prev) => {
                                            const updatedItems = [
                                                ...prev.items,
                                            ];

                                            const lastIndex =
                                                updatedItems.length - 1;

                                            updatedItems[lastIndex] = {
                                                ...updatedItems[lastIndex],
                                                name: e.target.value,
                                            };

                                            return {
                                                ...prev,
                                                items: updatedItems,
                                            };
                                        })
                                    }
                                />
                                {isItemNameError && (
                                    <p className="text-xs text-red-500 text-center">
                                        {itemNameErrorMsg}
                                    </p>
                                )}
                            </div>
                            <div className="input-group w-[15%]">
                                <label
                                    className="flex gap-2"
                                    htmlFor="item-qty"
                                >
                                    Qty.{" "}
                                    <span className="text-red-700 text-sm">
                                        *
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    id="item-qty"
                                    min={1}
                                    value={
                                        newInvoiceData.items[
                                            newInvoiceData.items.length - 1
                                        ].quantity
                                    }
                                    onChange={(e) =>
                                        setNewInvoiceData((prev) => {
                                            const updatedItems = [
                                                ...prev.items,
                                            ];

                                            const lastIndex =
                                                updatedItems.length - 1;

                                            updatedItems[lastIndex] = {
                                                ...updatedItems[lastIndex],
                                                quantity: e.target.value,
                                            };

                                            return {
                                                ...prev,
                                                items: updatedItems,
                                            };
                                        })
                                    }
                                />
                                {isItemQtyError && (
                                    <p className="text-xs text-red-500 text-center">
                                        {itemQtyErrorMsg}
                                    </p>
                                )}
                            </div>
                            <div className="input-group w-[20%]">
                                <label
                                    className="flex gap-2"
                                    htmlFor="item-price"
                                >
                                    Price{" "}
                                    <span className="text-red-700 text-sm">
                                        *
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    id="item-price"
                                    min={1}
                                    value={
                                        newInvoiceData.items[
                                            newInvoiceData.items.length - 1
                                        ].price
                                    }
                                    onChange={(e) =>
                                        setNewInvoiceData((prev) => {
                                            const updatedItems = [
                                                ...prev.items,
                                            ];

                                            const lastIndex =
                                                updatedItems.length - 1;

                                            updatedItems[lastIndex] = {
                                                ...updatedItems[lastIndex],
                                                price: e.target.value,
                                            };

                                            return {
                                                ...prev,
                                                items: updatedItems,
                                            };
                                        })
                                    }
                                />
                                {isItemPriceError && (
                                    <p className="text-xs text-red-500 text-center">
                                        {itemPriceErrorMsg}
                                    </p>
                                )}
                            </div>
                            <div className="input-group w-[20%]">
                                <label htmlFor="item-total">Total</label>
                                <input
                                    type="text"
                                    id="item-total"
                                    value={evalTotal(newInvoiceData.items) || 0}
                                    readOnly
                                />
                            </div>
                        </article>
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
                        Save New Item
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
