"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordApiCall = recordApiCall;
exports.getMetrics = getMetrics;
const metrics = {
    totalQueries: 0,
    apis: {
        fawaz: { totalRequests: 0, totalResponses: 0 },
        frankfurter: { totalRequests: 0, totalResponses: 0 }
    }
};
function recordApiCall(api, type) {
    metrics.apis[api][`total${capitalize(type)}s`]++;
    if (type === 'response')
        metrics.totalQueries++;
}
function getMetrics() {
    return metrics;
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
