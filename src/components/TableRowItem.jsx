import React from "react";

const TableRowItem = ({ item }) => {
    return (
        <tr>
            <td
                colSpan={2}
                className="text-[#0C0E16]"
            >
                {item.name}
            </td>
            <td>{item.quantity}</td>
            <td>£ {item.price}</td>
            <td className="text-[#0C0E16]">£ {item.total}</td>
        </tr>
    );
};

export default TableRowItem;
