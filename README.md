# GFW API UTILS (node.js lib)

Set of tools and utils available to use in GFW APIs,

Utils available:
* Logger
* Namespaces
* Transaction-id

## Logger

Usage:
```
const {
  log,
} = require('gfw-api-utils').logger
```


### Namespaces
usage:
```
const {
  createNamespace,
  getPropertyFromNamespace,
} = require('gfw-api-utils').namespaces
```

### Transaction-id
usage:
```
const {
  expressTransactionIdMiddleware,
  koaTransactionIdMiddleware,
} = require('gfw-api-utils').transactionId
```
