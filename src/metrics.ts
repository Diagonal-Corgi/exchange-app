const metrics = {
    totalQueries: 0,
    apis: {
      fawaz: { totalRequests: 0, totalResponses: 0 },
      frankfurter: { totalRequests: 0, totalResponses: 0 }
    }
  };
  
  export function recordApiCall(api: 'fawaz' | 'frankfurter', type: 'request' | 'response') {
    metrics.apis[api][`total${capitalize(type)}s` as 'totalRequests' | 'totalResponses']++;
    if (type === 'response') metrics.totalQueries++;
  }
  
  export function getMetrics() {
    return metrics;
  }
  
  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  