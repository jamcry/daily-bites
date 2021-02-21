function generateRandomString(length = 6) {
  return Math.random().toString(20).substr(2, length);
}

function getDateStringInYYYYMMDD() {
  return new Date().toISOString().slice(0, 10).replace(/-/g, "");
}

export { generateRandomString, getDateStringInYYYYMMDD };
