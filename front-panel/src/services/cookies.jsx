import Cookies from 'js-cookie';

// Set a cookie with a given name, value, and optional options
export const setCookie = (name, value, options = {}) => {
    Cookies.set(name, value, options);
};

// Get the value of a cookie by its name
export const getCookie = (name) => {
    return Cookies.get(name);
};

// Remove a cookie by its name
export const removeCookie = (name) => {
    Cookies.remove(name);
};
