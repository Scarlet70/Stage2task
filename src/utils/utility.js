export const isValidName = (name) => {
    /* const NAME_REGEX = /^[A-Z][a-z]/ */
    return name.trim().length >= 3;
};

export const isValidEmail = (email) => {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return EMAIL_REGEX.test(email);
};

export const isValidField = (data) => {
    return data.trim().length > 0;
};

export const isValidNumber = (value) => {
    if (value === "" || value === null || value === undefined) {
        return false;
    }

    const num = Number(value);
    return Number.isFinite(num) && num > 0;
};

export const evalTotal = (itemsArr) => {
    itemsArr.map((item) => {
        if (!isValidNumber(item.quantity) && !isValidNumber(item.price)) return;
    });

    return itemsArr.reduce((sum, item) => {
        return sum + Number(item.quantity) * Number(item.price);
    }, 0);
};

export const hasUndefinedProp = (itemsArr) => {
    return Object.values(itemsArr[0]).some((val) => val === "");
};

const hasEmptyValues = (data) => {
    if (data === null || data === undefined) return true;

    if (typeof data === "string" && data.trim() === "") return true;

    if (Array.isArray(data)) {
        return data.length === 0 || data.some((item) => hasEmptyValues(item));
    }

    if (typeof data === "object") {
        return Object.entries(data).some(([key, value]) => {
            if (
                key === "postCode" ||
                key === "total" ||
                key === "name" ||
                key === "quantity" ||
                key === "price"
            )
                return false;
            return hasEmptyValues(value);
        });
    }

    return false;
};

export default hasEmptyValues;
