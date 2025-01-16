import mongoose from 'mongoose'

const Service = new mongoose.Schema({
  designation: { type: String, required: true },
  name: { type: String, required: true },
  logo: { type: String, required: true }
})

export default mongoose.model('Service', Service)
