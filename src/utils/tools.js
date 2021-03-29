export const saveInfo = (key,val) => {
    localStorage.setItem(key, val);
};


export const getInfo = val => {
    return localStorage.getItem(val);
};

export const removeInfo = key => {
    return localStorage.removeItem(key);
};

export const clearInfo = () => {
    localStorage.clear();
};