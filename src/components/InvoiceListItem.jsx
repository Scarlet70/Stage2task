import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const InvoiceListItem = ({ item }) => {
    return (
        <Link to={`/invoice/${item.id}`}>
            <article className="flex flex-nowrap justify-around bg-white p-4 rounded-xl shadow-md hover:bg-slate-100 transition-all duration-300 dark:bg-[#1E2139] dark:text-white dark:hover:bg-[#1E2139]/40">
                <div className="text-[0.8rem] flex sm:flex-row sm:items-center flex-col flex-nowrap justify-between w-[calc(55%-2rem)]">
                    <span className="font-semibold">{item.displayId}</span>
                    <span>{`Due ${item.dueDate}`}</span>
                    <span>{item.clientName}</span>
                </div>
                <div className="flex flex-nowrap sm:flex-row flex-col justify-between items-center text-[0.8rem] w-[calc(35%-0.5rem)]">
                    <span>£{item.total}</span>
                    <span
                        className="flex  items-center gap-1 bg-amber-100/50 text-amber-600 px-3 py-1.5 rounded-lg"
                        style={{
                            color:
                                item.status === "Pending"
                                    ? "#FF8F00"
                                    : item.status === "Draft"
                                      ? "#DFE3FA"
                                      : "limegreen",

                            background:
                                item.status === "Pending"
                                    ? "#daa52023"
                                    : item.status === "Draft"
                                      ? "#33333323"
                                      : "#32cd3228",
                        }}
                    >
                        <div
                            className="w-2 h-2 rounded-[50%] bg-amber-600"
                            style={{
                                background:
                                    item.status === "Pending"
                                        ? "#FF8F00"
                                        : item.status === "Draft"
                                          ? "#DFE3FA"
                                          : "limegreen",
                            }}
                        ></div>
                        {item.status}
                    </span>
                    <span className="sm:block hidden text-slate-400">
                        <ChevronRight />
                    </span>
                </div>
            </article>
        </Link>
    );
};

export default InvoiceListItem;
