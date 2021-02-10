const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const axios = require('axios');

const app = express();

// Set up HBS as view engine
app.set('view engine', 'hbs');

// Set up static folder for styles, images, etc.
app.use(express.static('public'));

// Wax on
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// Forms processing
app.use(express.urlencoded({ extended: false }));

const baseUrl = 'https://ckx-movies-api.herokuapp.com/';

app.get('/', async (req, res) => {
  let response = await axios.get(baseUrl + 'movies');
  let reverseResponse = response.data.reverse();
  console.log(response.data[0]._id.$oid);
  res.render('index', {
    allmovies: reverseResponse,
  });
});

app.get('/add-movie', (req, res) => {
  res.render('add-movie');
});

app.post('/add-movie', async (req, res) => {
  let movieTitle = req.body.title;
  let moviePlot = req.body.plot;

  let newMovie = {
    title: movieTitle,
    plot: moviePlot,
  };

  await axios.post(baseUrl + 'movie/create', newMovie);
  res.redirect('/');
});

app.get('/delete-movie/:movieid', async (req, res) => {
  let movieId = req.params.movieid;
  let response = await axios.get(baseUrl + 'movie/' + movieId);

  let movie = response.data;

  res.render('delete-movie', {
    movieToDelete: movie,
  });
});

app.post('/delete-movie/:movieid', async (req, res) => {
  let movieId = req.params.movieid;
  await axios.delete(baseUrl + 'movie/' + movieId);
  res.redirect('/');
});

app.get('/edit-movie/:movieid', async (req, res) => {
  let movieId = req.params.movieid;
  let response = await axios.get(baseUrl + 'movie/' + movieId);
  let movie = response.data;

  res.render('edit-movie', {
    movie: movie,
  });
});

app.post('/edit-movie/:movieid', async (req, res) => {
  let movieId = req.params.movieid;

  let updatedMovie = {
    title: req.body.title,
    plot: req.body.plot,
  };

  await axios.patch(baseUrl + 'movie/' + movieId, updatedMovie);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log(`Server has started`);
});
