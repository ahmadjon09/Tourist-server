import mongoose from 'mongoose'

const Photos = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  photos: [{ type: String, required: true }],
  firstName: { type: String, required: true },
  avatar: { type: String, required: true },
  address: { type: String, required: true },
  likes: { type: [String], default: [] },
  dislikes: { type: [String], default: [] },
  Designation: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Photos', Photos)
