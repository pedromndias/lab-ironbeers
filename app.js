const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

// Add route for the beers:
app.get("/beers", (req, res) => {
  punkAPI.getBeers()
  .then((response) => {
    // console.log(response);

    res.render("beers.hbs", {
      beers: response
    });
  })
  .catch((error) => {
    console.log(error);
  })
})

// Create a route to display a random beer:
app.get("/random-beer", (req, res) => {
  punkAPI.getRandom()
  .then((response) => {
    // console.log(response)

    res.render("random-beer.hbs", {
      beer: response[0]
    })
  })
  .catch((error) => {
    console.log(error)
  })
})

// Create a dynamic route to open each beer:
app.get("/beers/:id", (req, res) => {
  punkAPI.getBeer(req.params.id)
  .then((response) => {
    let singleBeer = response[0]
    // console.log(singleBeer)
    res.render("beerById.hbs", {
      beer: singleBeer
    })
  })
  .catch((error) => {
    console.log(error)
  })
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
