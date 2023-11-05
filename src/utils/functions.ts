export const getUserIdFromStorage = () => {
  return localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))?.id
    : '1';
};
export const formatNumber = (value: any) => {
  return new Intl.NumberFormat().format(+value);
};
