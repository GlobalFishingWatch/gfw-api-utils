const { createNamespace: newNamespace } = require('cls-hooked');

const createNamespace = (namespace) => {
    return newNamespace(namespace);
}

module.exports = {
    createNamespace,
}
