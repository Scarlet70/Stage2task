import { Trash2 } from "lucide-react";

const NewItemForm = ({
    item,
    isItemNameError,
    isItemPriceError,
    isItemQtyError,
    itemNameErrorMsg,
    itemQtyErrorMsg,
    itemPriceErrorMsg,
    handleItemChange,
    deleteItem,
}) => {
    return (
        <article className="flex flex-nowrap gap-2 text-[#777F98] text-sm">
            <div className="input-group w-[45%]">
                <label
                    className="flex gap-2"
                    htmlFor="item-name"
                >
                    Item Name <span className="text-red-700 text-sm">*</span>
                </label>
                <input
                    type="text"
                    id="item-name"
                    value={item.name}
                    onChange={(e) =>
                        handleItemChange(item.id, "name", e.target.value)
                    }
                />
                {isItemNameError && (
                    <p className="text-xs text-red-500 text-center">
                        {itemNameErrorMsg}
                    </p>
                )}
            </div>
            <div className="input-group w-[10%]">
                <label
                    className="flex gap-2"
                    htmlFor="item-qty"
                >
                    Qty. <span className="text-red-700 text-sm">*</span>
                </label>
                <input
                    type="number"
                    id="item-qty"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                        handleItemChange(
                            item.id,
                            "quantity",
                            Number(e.target.value),
                        )
                    }
                />
                {isItemQtyError && (
                    <p className="text-xs text-red-500 text-center">
                        {itemQtyErrorMsg}
                    </p>
                )}
            </div>
            <div className="input-group w-[15%]">
                <label
                    className="flex gap-2"
                    htmlFor="item-price"
                >
                    Price <span className="text-red-700 text-sm">*</span>
                </label>
                <input
                    type="number"
                    id="item-price"
                    min={1}
                    value={item.price}
                    onChange={(e) =>
                        handleItemChange(
                            item.id,
                            "price",
                            Number(e.target.value),
                        )
                    }
                />
                {isItemPriceError && (
                    <p className="text-xs text-red-500 text-center">
                        {itemPriceErrorMsg}
                    </p>
                )}
            </div>
            <div className="input-group w-[20%]">
                <span className="text-[#7e88c3] dark:text-[#dfe3fa]">
                    Total
                </span>
                <div className="h-8.75 flex items-center text-black dark:text-white">
                    {item.quantity * item.price || 0}
                </div>
            </div>
            <div className="input-group w-[10%] flex flex-col justify-between max-h-13.75">
                <span className="w-full h-4 block "></span>
                <button
                    className="flex items-center"
                    onClick={() => deleteItem(item.id)}
                >
                    <Trash2 className="text-[#7E88C3] dark:text-[#888EB0] hover:text-[#EC5757] transition-all duration-200" />
                </button>
            </div>
        </article>
    );
};

export default NewItemForm;
