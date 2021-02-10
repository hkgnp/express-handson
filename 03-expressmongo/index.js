const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const mongoClient = require('mongodb').MongoClient;
const mongoUrl =
  'mongodb+srv://root:rotiPrata123@cluster0.n61vm.mongodb.net/<dbname>?retryWrites=true&w=majority';
const app = express();

async function connect() {
  // Create mongo client
  let client = await mongoClient.connect(mongoUrl, {
    useUnifiedTopology: true,
  });

  // Use a database
  let db = client.db('movie_app');
  console.log(client);
}

connect();

// Set up HBS as view engine
app.set('view engine', 'hbs');

// Set up static folder for styles, images, etc.
app.use(express.static('public'));

// Wax on
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// Forms processing
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => {
  console.log(`Server is listening on port 3000`);
});
