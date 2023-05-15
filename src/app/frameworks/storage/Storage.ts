const Storage = window.localStorage;

const setItem = (key: string, value: any) => {
  Storage.setItem(key, JSON.stringify(value));
};

const getItem = (key: string): any => {
  const item = Storage.getItem(key);
  if (item === null) {
    return {};
  }
  return JSON.parse(item);
};

const deleteItem = (key: string) => {
  Storage.removeItem(key);
};

const clearItems = () => {
  Storage.clear();
};

export { setItem, getItem, deleteItem, clearItems };
