import React from "react";

const TableRowItem = ({ item, invoice }) => {
    return (
        <tr>
            <td
                colSpan={3}
                className="text-[#0C0E16] dark:text-white"
            >
                {item.name}
            </td>
            <td>{item.quantity}</td>
            <td>£ {item.price}</td>
            <td className="text-[#0C0E16] dark:text-white">
                £ {invoice.total}
            </td>
        </tr>
    );
};

export default TableRowItem;
