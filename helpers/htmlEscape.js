/* eslint-disable arrow-body-style */
module.exports = (text) => {
  // eslint-disable-next-line prettier/prettier
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
};
