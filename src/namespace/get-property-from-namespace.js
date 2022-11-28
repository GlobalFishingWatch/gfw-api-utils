const { getNamespace } = require('cls-hooked');
const {
  TRANSACTION_ID: { NAMESPACE, PROPERTY },
} = require('../constant');

const getPropertyFromNamespace = (namespace, property) => {
  const myRequest = getNamespace(namespace);
  return myRequest && myRequest.get(property)
    ? myRequest.get(property)
    : undefined;
};

const getTransactionId = () => {
  return getPropertyFromNamespace(NAMESPACE, PROPERTY);
};

module.exports = {
  getPropertyFromNamespace,
  getTransactionId,
};
