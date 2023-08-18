export const getUserIdFromStorage = () => {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.id : '1';
}