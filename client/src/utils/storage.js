const storageKey = "list";

const setStorage = (textInput) => {
  localStorage.setItem(storageKey, textInput);
};

const retrieveStorage = () => {
  const storedData = localStorage.getItem(storageKey);
  console.log(storedData);
  return storedData;
};

const removeStorage = () => {
  localStorage.removeItem("attendeeList");
}

module.exports = {
  setStorage,
  retrieveStorage,
  removeStorage,
};