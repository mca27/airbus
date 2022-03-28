const statusFailure = 'Unauthorized';
const genericMessageFunction = (status, code, message) => ({
  status,
  code,
  message,
});

module.exports = {
  GENERIC_FAILURE_OBJ: (code, error) => genericMessageFunction(statusFailure, code, error),
};
