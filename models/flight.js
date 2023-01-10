import mongoose from "mongoose"

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: String, 
  airport: {type: String, default: 'DEN'},
  flightNo: Number,
  departs: {type: Date, default: function() {
    return new Date().getFullYear + 1
  }}
}, {
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}