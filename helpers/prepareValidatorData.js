module.exports = (errors) => {
  const preparedErrors = {};

  errors.forEach((e) => {
    preparedErrors[e.param] = e.msg;
  });

  return preparedErrors;
};
