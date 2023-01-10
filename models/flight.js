import mongoose from "mongoose"

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: String, 
  airport: {type: String, default: 'DEN'},
  flightNo: Number,
  departs: {
    type: Date, 
    default: function() {
      const today = new Date()
      console.log(today)
      const nextYear = today.getFullYear() + 1
      console.log(nextYear)
      today.setFullYear(nextYear)
      return today 
    }
  }
}, {
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}