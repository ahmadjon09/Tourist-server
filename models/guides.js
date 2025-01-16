import mongoose from 'mongoose'

const Guide = new mongoose.Schema({
  fsblink: { type: String, required: true },
  twtlink: { type: String, required: true },
  inslink: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  Designation: { type: String, required: true },
  photos: [{ type: String, required: true }]
})

export default mongoose.model('Guide', Guide)
