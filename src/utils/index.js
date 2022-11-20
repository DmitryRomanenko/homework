export const transformDate = (timestamp) => {
  const time = new Date(timestamp * 1000);
  const year = time.getFullYear();
  const date = time.getDate();
  const hour = time.getHours();
  const month = time.toLocaleDateString(undefined, { month: 'short' });
  const min = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  return `${date} ${month} ${year} ${hour}:${min}`;
};

export const sortItems = (arr, operation, sortName) =>
  operation === 'desc'
    ? [...arr].sort((a, b) => b[sortName] - a[sortName])
    : [...arr].sort((a, b) => a[sortName] - b[sortName]);
