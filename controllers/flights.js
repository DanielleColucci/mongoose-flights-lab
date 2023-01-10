import { Flight } from '../models/flight.js'

function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      flights: flights,
      title: 'Flight List'
    })
  })
}

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight'
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

export {
  index, 
  newFlight as new, 
  create,
  deleteFlight as delete
}