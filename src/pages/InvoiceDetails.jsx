import { useParams, useNavigate } from "react-router-dom";
import useDataContext from "../hooks/useDataContext";
import { ArrowLeft } from "lucide-react";
import SideBar from "../components/SideBar";
import EditInvoiceForm from "../components/EditInvoiceForm";
import TableRowItem from "../components/TableRowItem";
import ConfirmDelete from "../components/ConfirmDelete";

const InvoiceDetails = () => {
    const {
        invoices,
        setInvoices,
        isOpenEditInvoice,
        isOpenConfirmDelete,
        setIsOpenEditInvoice,
        theme,
        setIsOpenConfirmDelete,
    } = useDataContext();
    const { id } = useParams();
    const navigate = useNavigate();

    const invoice = invoices?.find((inv) => inv.id === Number(id));

    if (!invoice) return;

    const handleMarkAsPaid = (id) => {
        setInvoices((prev) =>
            prev.map((invoice) =>
                invoice.id === id ? { ...invoice, status: "Paid" } : invoice,
            ),
        );
    };

    return (
        <article className="flex flex-col gap-8 mx-auto xl:w-3/5 w-[90%] sm:p-8 p-4">
            <SideBar />
            <nav className="flex gap-2 mt-16 sm:mt-0">
                <span
                    className="flex gap-2 items-center font-semibold text-[#7E88C3]"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="text-[#7C5DFA] pb-1" />
                    Go back
                </span>
            </nav>
            <section className="w-full flex flex-col gap-4">
                <nav className="flex flex-nowrap justify-between bg-white p-4 rounded-md shadow-md dark:bg-[#1E2139]">
                    <div className="flex sm:justify-start gap-6 items-center sm:w-[40%] w-full justify-between">
                        <span className="text-slate-400 text-sm dark:text-[#DFE3FA]">
                            Status
                        </span>
                        <span
                            className="flex items-center gap-2 bg-amber-100/50 text-amber-600 px-3 py-1.5 font-semibold rounded-lg"
                            style={{
                                color:
                                    theme === "light" &&
                                    invoice.status === "Draft"
                                        ? "#373B53"
                                        : invoice.status === "Pending"
                                          ? "#FF8F00"
                                          : invoice.status === "Draft"
                                            ? "#DFE3FA"
                                            : "limegreen",

                                background:
                                    theme === "light" &&
                                    invoice.status === "Draft"
                                        ? "#373b531f"
                                        : invoice.status === "Pending"
                                          ? "#daa52023"
                                          : invoice.status === "Draft"
                                            ? "#dfe3fa1a"
                                            : theme === "light" &&
                                                invoice.status === "Draft"
                                              ? "#373b531f"
                                              : "#32cd3228",
                            }}
                        >
                            <div
                                className="w-2 h-2 rounded-[50%] bg-amber-600"
                                style={{
                                    background:
                                        theme === "light" &&
                                        invoice.status === "Draft"
                                            ? "#373B53"
                                            : invoice.status === "Pending"
                                              ? "#FF8F00"
                                              : invoice.status === "Draft"
                                                ? "#DFE3FA"
                                                : "limegreen",
                                }}
                            ></div>
                            <span className="mt-1">{invoice.status}</span>
                        </span>
                    </div>
                    <div className="hidden justify-end gap-2 md:flex">
                        <button
                            className="md:px-8 px-6 py-3 rounded-4xl font-semibold text-[#7E88C3] bg-[#F9FAFE] text-sm hover:bg-[#DFE3FA] hover:text-[#7E88C3] dark:bg-[#252945] dark:hover:bg-[#FFFFFF] dark;hover:text-[#DFE3FA] transition-all duration-200"
                            onClick={() => setIsOpenEditInvoice(true)}
                        >
                            Edit
                        </button>
                        <button
                            className="md:px-8 px-4 py-3 rounded-4xl font-semibold text-[#FFFFFF] bg-[#EC5757] text-sm hover:bg-[#FF9797] transition-all duration-200"
                            onClick={() => setIsOpenConfirmDelete(true)}
                        >
                            Delete
                        </button>
                        <button
                            className="md:px-8 px-4 py-3 rounded-4xl font-semibold text-[#FFFFFF] bg-[#7C5DFA] text-sm"
                            onClick={() => handleMarkAsPaid(invoice.id)}
                        >
                            Mark as Paid
                        </button>
                    </div>
                </nav>
                <article className="flex flex-col gap-2 bg-white p-8 md:p-14 rounded-md shadow-md dark:bg-[#1E2139]">
                    <section className="flex justify-between text-[13px] text-[#7E88C3] dark:text-[#DFE3FA]">
                        <div className="flex flex-col">
                            <p className="font-semibold text-[#0C0E16] dark:text-white">
                                #{invoice.displayId}
                            </p>
                            <span>{invoice.projectDescription}</span>
                        </div>
                        <span className="">
                            Bill From: {""}
                            <span className="font-semibold text-slate-900 dark:text-white">
                                {invoice.companyName}
                            </span>
                        </span>
                        <div className="flex flex-col text-right">
                            <span>{invoice.companyAddress.street}</span>
                            <span>{invoice.companyAddress.city}</span>
                            <span>{invoice.companyAddress.postCode}</span>
                            <span>{invoice.companyAddress.country}</span>
                        </div>
                    </section>
                    <section className="flex flex-wrap lg:flex-nowrap justify-between sm:justify-start sm:gap-8 text-[13px] text-[#7E88C3] gap-4 pb-16 dark:text-[#DFE3FA]">
                        <div className="flex flex-col justify-between w-[calc(50%-2rem)] sm:w-[calc(30%-2rem)]">
                            <div>
                                <span>Invoice Date</span>
                                <p className="text-[0.9rem] font-bold text-[#0C0E16] dark:text-white">
                                    {invoice.createdAt}
                                </p>
                            </div>
                            <div>
                                <span>Payment Date</span>
                                <p className="text-[0.9rem] font-semibold text-[#0C0E16] dark:text-white">
                                    {invoice.dueDate}
                                </p>
                            </div>
                        </div>
                        <div className=" flex flex-col gap-2 w-[calc(50%-2rem)] sm:w-[calc(30%-2rem)]">
                            <span>Bill To</span>
                            <p className="text-[0.9rem] font-bold text-[#0C0E16] dark:text-white">
                                {invoice.clientName}
                            </p>
                            <ul>
                                <li>{invoice.clientAddress.street}</li>
                                <li>{invoice.clientAddress.city}</li>
                                <li>{invoice.clientAddress.postCode}</li>
                                <li>{invoice.clientAddress.country}</li>
                            </ul>
                        </div>
                        <div>
                            <span>Sent to</span>
                            <p className="text-[0.9rem] font-bold text-[#0C0E16] dark:text-white">
                                {invoice.email}
                            </p>
                        </div>
                    </section>
                    <table className="sm:text-[13px] text-[11px] text-[#7E88C3] bg-[#F9FAFE] rounded-md dark:bg-[#252945] dark:text-white">
                        <colgroup>
                            <col
                                span="3"
                                style={{ width: "70%" }}
                            />
                            <col style={{ width: "6%" }} />
                            <col style={{ width: "9%" }} />
                            <col style={{ width: "15%" }} />
                        </colgroup>
                        <thead className="dark:text-[#DFE3FA] sm:table-header-group hidden">
                            <tr>
                                <th>Item Name</th>
                                <th>QTY</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.items?.map((item, i) => (
                                <TableRowItem
                                    key={i}
                                    item={item}
                                />
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-[#373B53] text-[#FFFFFF] dark:bg-[#0C0E16]">
                                <td
                                    colSpan={3}
                                    className="row-left rounded-bl-md"
                                >
                                    Amount Due
                                </td>
                                <td className="sm:text-xl text-lg text-nowrap rounded-br-md">
                                    £{invoice.total}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </article>
            </section>
            <div className="md:hidden justify-center gap-4 flex bg-white p-4 rounded-xl shadow-md dark:bg-[#1E2139]">
                <button
                    className="md:px-8 px-6 py-3 rounded-4xl font-semibold text-[#7E88C3] bg-[#F9FAFE] text-sm hover:bg-[#DFE3FA] hover:text-[#7E88C3] dark:bg-[#252945] dark:hover:bg-[#FFFFFF] dark;hover:text-[#DFE3FA] transition-all duration-200"
                    onClick={() => setIsOpenEditInvoice(true)}
                >
                    Edit
                </button>
                <button
                    className="md:px-8 px-6 py-3 rounded-4xl font-semibold text-[#FFFFFF] bg-[#EC5757] text-sm hover:bg-[#FF9797] transition-all duration-200"
                    onClick={() => setIsOpenConfirmDelete(true)}
                >
                    Delete
                </button>
                <button
                    className="md:px-8 px-6 py-3 rounded-4xl font-semibold text-[#FFFFFF] bg-[#7C5DFA] text-sm"
                    onClick={() => handleMarkAsPaid(invoice.id)}
                >
                    Mark as Paid
                </button>
            </div>
            {isOpenEditInvoice && <EditInvoiceForm invoice={invoice} />}
            {isOpenConfirmDelete && <ConfirmDelete invoice={invoice} />}
        </article>
    );
};

export default InvoiceDetails;
