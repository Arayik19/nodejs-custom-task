sendErrorMessage = (res, err) => {
  const errResponse = {
    success: false,
    error: {
      errorMessage: err.message,
    },
  };
  res.send(errResponse);
};

module.exports = sendErrorMessage;
