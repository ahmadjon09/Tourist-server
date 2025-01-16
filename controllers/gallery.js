import Photos from '../models/gallery.js'
import Client from '../models/client.js'
import Admin from '../models/admin.js'

export const createPhoto = async (req, res) => {
  const { phoneNumber, photos, Designation, isAdminn } = req.body

  try {
    if (!Designation) {
      return res.status(400).json({ message: 'Designation is required!' })
    }

    let client = null
    let admin = null

    if (isAdminn) {
      admin = await Admin.findOne({ phoneNumber })
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found!' })
      }
    } else {
      client = await Client.findOne({ phoneNumber })
      if (!client) {
        return res.status(404).json({ message: 'Client not found!' })
      }
    }

    const newPhoto = new Photos({
      client: isAdminn ? admin._id : client._id,
      photos,
      Designation,
      firstName: isAdminn ? `${admin.firstName} ᵃᵈᵐⁱⁿ` : client.firstName,
      avatar: isAdminn ? admin.avatar : client.photo[0],
      address: isAdminn ? 'N/A' : client.address,
      likes: [],
      dislikes: []
    })

    await newPhoto.save()

    return res.status(201).json({
      message: 'Photo created successfully!',
      data: newPhoto
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const allPhotos = async (_, res) => {
  try {
    const photos = await Photos.find()
    return res.status(200).json({ data: photos })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error!' })
  }
}

export const likePhoto = async (req, res) => {
  const { id } = req.params
  const { phoneNumber } = req.body

  try {
    const photo = await Photos.findById(id)
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found!' })
    }

    if (photo.likes.includes(phoneNumber)) {
      return res.status(400).json({ message: 'You can only like once!' })
    }

    if (photo.dislikes.includes(phoneNumber)) {
      photo.dislikes.pull(phoneNumber)
    }

    photo.likes.push(phoneNumber)
    await photo.save()

    return res.status(200).json({
      message: 'Photo liked successfully!',
      data: photo
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const dislikePhoto = async (req, res) => {
  const { id } = req.params
  const { phoneNumber } = req.body

  try {
    const photo = await Photos.findById(id)
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found!' })
    }

    if (photo.dislikes.includes(phoneNumber)) {
      return res.status(400).json({ message: 'You can only dislike once!' })
    }

    if (photo.likes.includes(phoneNumber)) {
      photo.likes.pull(phoneNumber)
    }

    photo.dislikes.push(phoneNumber)
    await photo.save()

    return res.status(200).json({
      message: 'Photo disliked successfully!',
      data: photo
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const deletePhoto = async (req, res) => {
  const { id } = req.params
  try {
    const deletedPhoto = await Photos.findByIdAndDelete(id)
    if (!deletedPhoto) {
      return res.status(404).json({ message: 'Photo not found.' })
    }
    return res.status(200).json({ message: 'Photo deleted successfully.' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

export const getOnePhoto = async (req, res) => {
  const { id } = req.params
  try {
    const photo = await Photos.findById(id)
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found.' })
    }
    return res.status(200).json({ data: photo })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}
