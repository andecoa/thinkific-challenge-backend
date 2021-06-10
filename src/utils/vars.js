module.exports = {
  __NODE_ENV__: process.env.NODE_ENV, // dev | prod | test
  __PORT__: process.env.PORT, // e.g. 8000
  __MONGO_SRV__: process.env.MONGO_SRV, // e.g. mongodb://localhost:27017/my_db
};
