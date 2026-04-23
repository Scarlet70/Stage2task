import useDataContext from "../hooks/useDataContext";
import { ChevronDown } from "lucide-react";

const StatusFilter = () => {
    const { isOpenFilter, setIsOpenFilter, filter, setFilter } =
        useDataContext();

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        setFilter(checked ? name : "none");
        setIsOpenFilter(false);
    };

    return (
        <>
            <div className="relative">
                <button
                    className="flex flex-nowrap gap-4 border-2 border-slate-300 items-center px-4 py-1 text-sm text-slate-500"
                    onClick={() => setIsOpenFilter((prev) => !prev)}
                >
                    <span>Filter by Status</span>
                    <ChevronDown />
                </button>
                {isOpenFilter && (
                    <div className="flex flex-col justify-around absolute -bottom-45 bg-white w-47.5 h-40.5 p-4 rounded-md shadow-2xl">
                        <label className="flex gap-4 items-center font-semibold h-[calc(33.33%)]">
                            <input
                                className="w-5 h-5"
                                type="checkbox"
                                name="Draft"
                                checked={filter === "Draft"}
                                onChange={handleCheckboxChange}
                            />
                            Draft
                        </label>

                        <label className="flex gap-4 items-center font-semibold h-[calc(33.33%)]">
                            <input
                                className="w-5 h-5"
                                type="checkbox"
                                name="Pending"
                                checked={filter === "Pending"}
                                onChange={handleCheckboxChange}
                            />
                            Pending
                        </label>

                        <label className="flex gap-4 items-center font-semibold h-[calc(33.33%-0.1rem)]">
                            <input
                                className="w-5 h-5"
                                type="checkbox"
                                name="Paid"
                                checked={filter === "Paid"}
                                onChange={handleCheckboxChange}
                            />
                            Paid
                        </label>
                    </div>
                )}
            </div>
        </>
    );
};

export default StatusFilter;
