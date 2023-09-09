const copyUtility = (string) => {
  const dataTextarea = document.createElement("textarea");
  dataTextarea.value = string;

  document.body.appendChild(dataTextarea);
  dataTextarea.select();

  try {
    document.execCommand("copy");
  } catch(error) {
    console.error("Failed to copy:", error);
  }

  document.body.removeChild(dataTextarea);
};

module.exports = {
  copyUtility,
};