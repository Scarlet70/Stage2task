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
                    className="flex flex-nowrap gap-2 sm:gap-4 items-center px-2 sm:px-4 py-1 text-sm text-black dark:text-white"
                    onClick={() => setIsOpenFilter((prev) => !prev)}
                >
                    <span>
                        Filter{" "}
                        <span className="hidden lg:inline">by Status</span>
                    </span>
                    <ChevronDown />
                </button>
                {isOpenFilter && (
                    <div className="flex flex-col justify-around absolute -bottom-45 bg-white w-47.5 h-40.5 p-4 rounded-md shadow-2xl dark:bg-[#252945]">
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
