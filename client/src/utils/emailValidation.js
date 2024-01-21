function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log(regex.test(email));
  return regex.test(email);
}

console.log(validateEmail('test@example.com'));      // true
console.log(validateEmail('invalid-email'));         // false
console.log(validateEmail('another.email@test.com')); // true
console.log(validateEmail('noatsign.com'));           // false
console.log(validateEmail(''));                       // false

module.exports = {
  validateEmail,
};
