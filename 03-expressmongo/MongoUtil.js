const mongoClient = require('mongodb').MongoClient;

let connect = async (mongoUrl, dbName) => {
  // Create mongo client
  let client = await mongoClient.connect(mongoUrl, {
    useUnifiedTopology: true,
  });

  // Use a database
  let db = client.db(dbName);
  console.log('Datebase connected');
  return db;
};

// exporting the connect function
module.exports = {
  connect,
};
