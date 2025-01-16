import mongoose from 'mongoose'

const Product = new mongoose.Schema({
  description: { type: String, required: true },
  days: { type: Number, required: true },
  price: { type: Number, required: true },
  person: { type: Number, required: true },
  category: { type: String, required: true },
  photos: [{ type: String, required: true }],
  location: { type: String, required: true },
  sale: { type: Number, required: true }
})

export default mongoose.model('Product', Product)
