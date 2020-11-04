const { createNamespace } = require('../namespace');
const { TRANSACTION_ID: { NAMESPACE, HEADER, PROPERTY } } = require('../constant');

const koaTransactionIdMiddleware = () => {
    console.log("=======================");
    console.log("Namespace: " + NAMESPACE);
    console.log("=======================");
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
    console.log("=======================");
    console.log("Namespace: " + NAMESPACE);
    console.log("=======================");
    const personalizedRequest = createNamespace(NAMESPACE);
    return async (req, res, next) => {
        await new Promise((resolve, reject) => {
            personalizedRequest.run(async () => {
                try {
                    if (req.headers[HEADER]) {
                        personalizedRequest.set(PROPERTY, req.headers[HEADER]);
                    }
                    await next();
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        });
    };
};

module.exports = {
    expressTransactionIdMiddleware,
    koaTransactionIdMiddleware,
}
