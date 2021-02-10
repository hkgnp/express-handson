const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

require('dotenv').config();
const mongoUrl = process.env.MONGO_URL;

const app = express();

const MongoUtil = require('./MongoUtil');

let main = (async () => {
  let db = await MongoUtil.connect(mongoUrl, 'movie_app');
})();

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
