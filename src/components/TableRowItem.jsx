import React from "react";

const TableRowItem = ({ item }) => {
    return (
        <tr>
            <td className="text-[#0C0E16] dark:text-white">{item.name}</td>
            <td>{item.quantity}</td>
            <td>£ {item.price}</td>
            <td className="text-[#0C0E16] dark:text-white">
                £ {item.quantity * item.price}
            </td>
        </tr>
    );
};

export default TableRowItem;
