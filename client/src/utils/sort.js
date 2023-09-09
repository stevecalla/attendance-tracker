const sortHandlerScreenName = (items) => {
  return [...items].sort((a, b) => a.screenName.localeCompare(b.screenName));
};

const sortHandlerNames = (items) => {
  return [...items].sort((a, b) => a.localeCompare(b));
};

const sortHandlerNamesNumbers = (items) => {
  // Separate numbers and strings
  const numbers = items.filter(item => !isNaN(item));
  const strings = items.filter(item => isNaN(item));
  
  // Sort the numbers in ascending order
  const sortedNumbers = numbers.map(Number).sort((a, b) => a - b);
  
  // Sort the strings in alphabetical order
  const sortedStrings = strings.sort();
  
  // Combine the sorted arrays
  const resultArray = [...sortedNumbers, ...sortedStrings];
  
  return resultArray;
};

module.exports = {
  sortHandlerNamesNumbers,
  sortHandlerScreenName,
  sortHandlerNames,
};