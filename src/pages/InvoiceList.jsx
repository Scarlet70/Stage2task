import { Plus } from "lucide-react";
import StatusFilter from "../components/StatusFilter";
import InvoiceListItem from "../components/InvoiceListItem";
import HeroSection from "../components/HeroSection";
import SideBar from "../components/SideBar";
import NewInvoiceForm from "../components/NewInvoiceForm";
import useDataContext from "../hooks/useDataContext";

const InvoiceList = () => {
    const {
        invoices,
        isOpenNewInvoice,
        setIsOpenNewInvoice,
        filteredInvoices,
        theme,
    } = useDataContext();

    let content = invoices.length ? (
        filteredInvoices.map((item) => (
            <InvoiceListItem
                key={item.id}
                item={item}
            />
        ))
    ) : (
        <HeroSection />
    );

    return (
        <section className="flex flex-col gap-8 mx-auto sm:w-3/5 w-[90%] sm:p-8 p-4 mt-15">
            <SideBar />
            <header className="flex flex-nowrap justify-between p-2">
                <div className="dark:text-white">
                    <h1 className="lg:text-3xl text-[1.3rem] font-bold">
                        Invoices
                    </h1>
                    <p className="sm:text-sm text-[0.7rem]">
                        {invoices.length
                            ? `There are ${invoices.length} invoices`
                            : "No Invoices here"}
                    </p>
                </div>
                <div className="flex flex-nowrap justify-end items-center gap-2 w-[60%]">
                    <StatusFilter />
                    <button
                        className="flex flex-nowrap items-center gap-2 bg-[#7C5DFA] text-slate-200 px-2 rounded-4xl text-[1rem] font-semibold h-10 hover:bg-[#9277FF] transition-all duration-200"
                        onClick={() => {
                            setIsOpenNewInvoice(true);
                        }}
                    >
                        <Plus className="bg-white rounded-[50%] text-[#7C5DFA] w-6 h-6 p-1.5" />
                        <span className="block mt-1">
                            New{" "}
                            <span className="hidden sm:inline">Invoice</span>
                        </span>
                    </button>
                </div>
            </header>
            <section className="flex flex-col gap-3">{content}</section>
            <div id="x"></div>

            {isOpenNewInvoice && <NewInvoiceForm />}
        </section>
    );
};

export default InvoiceList;
