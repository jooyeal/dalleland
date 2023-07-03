/**
 * debounce function
 * @param fn callback function
 * @param ms delay time
 * @returns
 */
export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

/**
 * Convert Date Format
 * @param date Date
 * @returns {string}
 */
export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return year + "/" + month + "/" + day;
};
