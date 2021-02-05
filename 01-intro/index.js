// Import packages
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

// Set up app
const app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'));
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// Enable forms processing
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Routes start
app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get('/aboutus', (req, res) => {
  res.render('aboutus.hbs');
});

app.get('/contactus', (req, res) => {
  res.render('contactus.hbs');
});

app.get('/add/food', (req, res) => {
  res.render('add-food.hbs');
});

app.post('/add/food', (req, res) => {
  res.send('Data received.');
  console.log(req.body);
});

app.listen(3000, () => {
  console.log(`Server has started`);
});
