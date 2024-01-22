function validateEmail(email) {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regex.test(email);
}

//VALIDATION EXAMPLES
// console.log(validateEmail('test@example.com'));      // true
// console.log(validateEmail('invalid-email'));         // false
// console.log(validateEmail('another.email@test.com')); // true
// console.log(validateEmail('noatsign.com'));           // false
// console.log(validateEmail(''));                       // false

module.exports = {
  validateEmail,
};
