import useDataContext from "../hooks/useDataContext";
import { useNavigate } from "react-router-dom";

const ConfirmDelete = ({ invoice }) => {
    const { setInvoices, setIsOpenConfirmDelete } = useDataContext();

    const navigate = useNavigate();

    const handleDelete = (id) => {
        setInvoices((prev) => prev.filter((inv) => inv.id !== id));
        setIsOpenConfirmDelete(false);
        navigate("/");
    };

    return (
        <article
            className="bg-white flex flex-col gap-6 p-10 rounded-md fixed top-2/5 lg:left-[33%] md:left-[29%] sm:left-[20%] left-9 max-w-112.5 w-[85%] shadow-2xl z-100 dark:bg-[#1E2139]"
            id="confirm-delete"
        >
            <section className="flex flex-col gap-4">
                <h2 className="text-3xl dark:text-white font-bold">
                    Confirm Deletion
                </h2>
                <p className="text-[#888EB0]">
                    Are you sure you want to delete invoice{" "}
                    <span className="font-semibold">#{invoice.displayId}?</span>{" "}
                    This action cannot be undone!
                </p>
            </section>
            <div className="flex justify-end gap-4">
                <button
                    className="md:px-8 px-6 py-4 rounded-4xl font-semibold text-[#7E88C3] bg-[#F9FAFE] text-sm hover:bg-[#DFE3FA] hover:text-[#7E88C3] dark:bg-[#252945] dark:hover:bg-[#FFFFFF] dark;hover:text-[#DFE3FA] transition-all duration-200"
                    onClick={() => setIsOpenConfirmDelete(false)}
                >
                    Cancel
                </button>

                <button
                    className="md:px-8 px-6 py-4 rounded-4xl font-semibold text-[#FFFFFF] bg-[#EC5757] text-sm hover:bg-[#FF9797] transition-all duration-200"
                    onClick={() => handleDelete(invoice.id)}
                >
                    Delete
                </button>
            </div>
        </article>
    );
};

export default ConfirmDelete;
