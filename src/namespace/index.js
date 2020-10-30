const createNamespace = require('./create-namepace');
const getPropertyFromNamespace = require('./get-property-from-namespace');

module.exports = {
    ...createNamespace,
    ...getPropertyFromNamespace,
}
