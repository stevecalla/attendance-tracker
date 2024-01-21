function validatePhoneOrBlank(phoneInput) {
  // Validates '111-111-1111' or an empty string
  const regex = /^(?:[0-9]{3}-[0-9]{3}-[0-9]{4}|)$/;

  let testPhone = regex.test(phoneInput);
  console.log("test phone", testPhone);
  return testPhone;
}

function validatePhone(phoneInput) {
  // Validate only '123-345-3456'
  const regex = /^([0-9]{3})-([0-9]{3})-([0-9]{4})$/;

  let testPhone = regex.test(phoneInput);
  console.log("test phone", testPhone);
  return testPhone;
}

function validatePhoneVariousFormats(phoneInput) {
  // Validate '123-345-3456', '1234567890', '1234567890', '(078)789-8908'
  const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  let testPhone = regex.test(phoneInput);
  console.log("test phone", testPhone);
  return testPhone;
}

module.exports = {
  validatePhoneOrBlank,
  validatePhone,
  validatePhoneVariousFormats
};
