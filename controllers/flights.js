import { Flight } from '../models/flight.js'
import { Meal } from '../models/meal.js'

function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      flights: flights,
      title: 'All Flights'
    })
  })
}

function newFlight(req, res) {
  const newFlight = new Flight()
  const defaultDeparts = newFlight.departs
  res.render('flights/new', {
    title: 'Add Flight', 
    defaultDeparts: defaultDeparts.toISOString().slice(0, 16)
  })
}

function create(req, res) {
  // remove empty properties
  for (const key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Flight.create(req.body) 
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    res.redirect('/flights')
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    res.redirect('/')
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      res.render('flights/show', {
        flight: flight, 
        meals,
        title: 'Flight Details'
      })
    })
    .catch(err => {
      res.redirect('/flights')
    })
  })
  .catch(err => {
    res.redirect('/flights')
  })
}

function edit(req, res) {
  Flight.findById(req.params.id) 
  .then(flight => {
    res.render('flights/edit', {
      title: 'Edit Flight',
      flight: flight
    })
  })
  .catch(err => {
    res.redirect('/')
  })
}

function update(req, res) {
  for (const key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${req.params.id}`)
  })
  .catch(err => {
    res.redirect('/')
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err);
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/')
  })
}

function addMeal(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.meals.push(req.body.mealId)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      res.redirect('/flights')
    })
  })
  .catch(err => {
    res.redirect('/flights')
  })
}

export {
  index, 
  newFlight as new, 
  create,
  deleteFlight as delete, 
  show, 
  edit, 
  update, 
  createTicket,
  addMeal
}