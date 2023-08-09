
export const setToken = (token = {}) => {
    localStorage.setItem('token', JSON.stringify(token));
}
export const getToken = () => {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
}
export const getTokenOnly = () => {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token).token : null;
}

export const getItem = (name: string) => {
    return  localStorage.getItem(name);
}
export const setItem = (key: string, value: string) => {
    return  localStorage.setItem(key, value);
}
