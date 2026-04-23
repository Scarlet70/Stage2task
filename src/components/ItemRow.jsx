import { Trash } from "lucide-react";

const ItemRow = () => {
    return (
        <section className="item-row">
            <input placeholder="Item Name" />
            <input type="number" />
            <input type="number" />
            <span></span>
            <button>
                <Trash />
            </button>
        </section>
    );
};

export default ItemRow;
