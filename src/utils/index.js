export const sortItemsByAlphabet = (arr, operation, sortName) =>
  operation === 'desc'
    ? [...arr].sort((a, b) => b[sortName].localeCompare(a[sortName]))
    : [...arr].sort((a, b) => a[sortName].localeCompare(b[sortName]));

export const sortItemsByWeight = (arr, operation, sortName) =>
  operation === 'desc'
    ? [...arr].sort((a, b) => +b[sortName] - +a[sortName])
    : [...arr].sort((a, b) => +a[sortName] - +b[sortName]);

export const searchItems = (arr, title) => arr.filter((item) => item.title.toLowerCase().includes(title.toLowerCase()));
