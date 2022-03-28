const NodeCache = require('node-cache');

const tokenCache = new NodeCache({ stdTTL: 3600 });
tokenCache.on('expired', (key, value) => {
  console.log(`The Key : ${key}, with value : + ${value} has expired + ${Date.now()}`);
});

module.exports.cache = tokenCache;
