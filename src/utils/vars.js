module.exports = {
  __NODE_ENV__: process.env.NODE_ENV, // dev | prod | test
  __PORT__: process.env.PORT, // e.g. 8000
  __MONGO_SRV__: process.env.MONGO_SRV, // e.g. mongodb://localhost:27017/my_db

  // auth0-specific vars that MAY OR MAY NOT END WITH TRAILING SLASH
  __AUTH0_DOMAIN__: process.env.AUTH0_DOMAIN,
  __AUTH0_IDENTIFIER__: process.env.AUTH0_IDENTIFIER,
};
