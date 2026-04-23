import { useParams, useNavigate } from "react-router-dom";
import useDataContext from "../hooks/useDataContext";
import { ArrowLeft } from "lucide-react";
import SideBar from "../components/SideBar";
import EditInvoiceForm from "../components/EditInvoiceForm";
import TableRowItem from "../components/TableRowItem";

const InvoiceDetails = () => {
    const { invoices, isOpenEditInvoice, setIsOpenEditInvoice, setInvoices } =
        useDataContext();
    const { id } = useParams();
    const navigate = useNavigate();

    const invoice = invoices?.find((inv) => inv.id === Number(id));

    if (!invoice) return;

    const handleDelete = (id) => {
        setInvoices((prev) => prev.filter((inv) => inv.id !== id));
        navigate("/");
    };

    return (
        <article className="flex flex-col gap-8 mx-auto sm:w-3/5 w-[90%] sm:p-8 p-4">
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
                <nav className="flex flex-nowrap justify-between bg-white p-4 rounded-md shadow-md">
                    <div className="flex sm:justify-start gap-6 items-center sm:w-[40%] w-full justify-between">
                        <span className="text-slate-400 text-sm">Status</span>
                        <span
                            className="flex items-center gap-1 bg-amber-100/50 text-amber-600 px-3 py-1.5 font-semibold rounded-lg"
                            style={{
                                color:
                                    invoice.status === "Pending"
                                        ? "#FF8F00"
                                        : invoice.status === "Draft"
                                          ? "#333"
                                          : "limegreen",

                                background:
                                    invoice.status === "Pending"
                                        ? "#daa52023"
                                        : invoice.status === "Draft"
                                          ? "#33333323"
                                          : "#32cd3228",
                            }}
                        >
                            <div
                                className="w-2 h-2 rounded-[50%] bg-amber-600"
                                style={{
                                    background:
                                        invoice.status === "Pending"
                                            ? "#FF8F00"
                                            : invoice.status === "Draft"
                                              ? "#333"
                                              : "limegreen",
                                }}
                            ></div>
                            {invoice.status}
                        </span>
                    </div>
                    <div className="hidden justify-end gap-2 sm:flex">
                        <button
                            className="md:px-8 px-4 py-3 rounded-4xl font-semibold text-[#7E88C3] bg-[#F9FAFE] text-sm hover:bg-[#252945] hover:text-slate-300 transition-all duration-200"
                            onClick={() => setIsOpenEditInvoice(true)}
                        >
                            Edit
                        </button>
                        <button
                            className="md:px-8 px-4 py-3 rounded-4xl font-semibold text-[#FFFFFF] bg-[#EC5757] text-sm hover:bg-[#FF9797] transition-all duration-200"
                            onClick={() => handleDelete(invoice.id)}
                        >
                            Delete
                        </button>
                        <button className="md:px-8 px-4 py-3 rounded-4xl font-semibold text-[#FFFFFF] bg-[#7C5DFA] text-sm">
                            Mark as Paid
                        </button>
                    </div>
                </nav>
                <article className="flex flex-col gap-2 bg-white p-8 sm:p-14 rounded-md shadow-md">
                    <section className="flex justify-between text-[13px] text-[#7E88C3]">
                        <div className="flex flex-col">
                            <p className="font-semibold text-[#0C0E16]">
                                #{invoice.displayId}
                            </p>
                            <span>{invoice.projectDescription}</span>
                        </div>
                        <span className="font-semibold text-slate-900">
                            {invoice.companyName}
                        </span>
                        <div className="flex flex-col text-right">
                            <span>{invoice.companyAddress.street}</span>
                            <span>{invoice.companyAddress.city}</span>
                            <span>{invoice.companyAddress.postCode}</span>
                            <span>{invoice.companyAddress.country}</span>
                        </div>
                    </section>
                    <section className="flex flex-wrap sm:flex-nowrap justify-between sm:justify-start sm:gap-8 text-[13px] text-[#7E88C3] gap-4 pb-16">
                        <div className="flex flex-col justify-between w-[calc(50%-2rem)] sm:w-[calc(30%-2rem)]">
                            <div>
                                <span>Invoice Date</span>
                                <p className="text-[0.9rem] font-bold text-[#0C0E16]">
                                    {invoice.createdAt}
                                </p>
                            </div>
                            <div>
                                <span>Payment Date</span>
                                <p className="text-[0.9rem] font-semibold text-[#0C0E16]">
                                    {invoice.dueDate}
                                </p>
                            </div>
                        </div>
                        <div className=" flex flex-col gap-2 w-[calc(50%-2rem)] sm:w-[calc(30%-2rem)]">
                            <span>Bill To</span>
                            <p className="text-[0.9rem] font-bold text-[#0C0E16]">
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
                            <p className="text-[0.9rem] font-bold text-[#0C0E16]">
                                {invoice.email}
                            </p>
                        </div>
                    </section>
                    <table className="sm:text-[13px] text-[11px] text-[#7E88C3] bg-[#F9FAFE] rounded-xl">
                        <thead>
                            <tr>
                                <th colSpan={2}>Item Name</th>
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
                            <tr className="bg-[#373B53] text-[#FFFFFF]">
                                <td
                                    colSpan={4}
                                    className="row-left rounded-bl-xl"
                                >
                                    Amount Due
                                </td>
                                <td className="sm:text-xl text-lg text-nowrap rounded-br-xl">
                                    £{invoice.total}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </article>
            </section>
            <div className="sm:hidden justify-center gap-4 flex bg-white p-4 rounded-xl shadow-md">
                <button
                    className="md:px-8 px-6 py-3 rounded-4xl font-semibold text-[#7E88C3] bg-[#F9FAFE] text-sm hover:bg-[#252945] hover:text-slate-300 transition-all duration-200"
                    onClick={() => setIsOpenEditInvoice(true)}
                >
                    Edit
                </button>
                <button
                    className="md:px-8 px-6 py-3 rounded-4xl font-semibold text-[#FFFFFF] bg-[#EC5757] text-sm hover:bg-[#FF9797] transition-all duration-200"
                    onClick={() => handleDelete(invoice.id)}
                >
                    Delete
                </button>
                <button className="md:px-8 px-6 py-3 rounded-4xl font-semibold text-[#FFFFFF] bg-[#7C5DFA] text-sm">
                    Mark as Paid
                </button>
            </div>
            {isOpenEditInvoice && <EditInvoiceForm invoice={invoice} />}
        </article>
    );
};

export default InvoiceDetails;
