const { createNamespace } = require('../namespace');
const { TRANSACTION_ID: { NAMESPACE, HEADER, PROPERTY } } = require('../constant');

const koaTransactionIdMiddleware = () => {
    const personalizedRequest = createNamespace(NAMESPACE);
    const middleware = async (ctx, next) => {
        await new Promise((resolve, reject) => {
            personalizedRequest.run(async () => {
                try {
                    if (ctx.request.headers[HEADER]) {
                        personalizedRequest.set(PROPERTY, ctx.request.headers[HEADER]);
                    }
                    await next();
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        });
    };
    return middleware;
};

const expressTransactionIdMiddleware = () => {
    const personalizedRequest = createNamespace(NAMESPACE);
    return (req, res, next) => {
        personalizedRequest.run(() => {
            if (req.headers[HEADER]) {
                personalizedRequest.set(
                  PROPERTY,
                  req.headers[HEADER]
                );
            }
            next();
        });
    };
};

module.exports = {
    expressTransactionIdMiddleware,
    koaTransactionIdMiddleware,
}
