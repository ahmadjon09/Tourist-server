import Guide from '../models/guides.js'

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message })
}

export const CreateNewGuide = async (req, res) => {
  try {
    const {
      fsblink,
      twtlink,
      inslink,
      firstName,
      lastName,
      Designation,
      photos
    } = req.body

    if (
      !fsblink ||
      !twtlink ||
      !inslink ||
      !firstName ||
      !lastName ||
      !Designation
    ) {
      return sendErrorResponse(
        res,
        400,
        'All fields except photos are required.'
      )
    }

    const newGuide = new Guide({
      fsblink,
      twtlink,
      inslink,
      firstName,
      lastName,
      Designation,
      photos
    })

    await newGuide.save()

    return res.status(201).json({
      message: 'Guide created successfully',
      guide: newGuide
    })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error.')
  }
}

export const GetAllGuides = async (_, res) => {
  try {
    const guides = await Guide.find()
    return res.status(200).json({ data: guides })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error.')
  }
}

export const GetOneGuide = async (req, res) => {
  const { id } = req.params
  try {
    const guide = await Guide.findById(id)
    if (!guide) {
      return sendErrorResponse(res, 404, 'Guide not found.')
    }
    return res.status(200).json({ guide })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error.')
  }
}

export const UpdateGuide = async (req, res) => {
  const { id } = req.params
  try {
    const updatedGuide = await Guide.findByIdAndUpdate(id, req.body, {
      new: true
    })
    if (!updatedGuide) {
      return sendErrorResponse(res, 404, 'Guide not found.')
    }
    return res.status(200).json({
      message: 'Guide updated successfully',
      guide: updatedGuide
    })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error.')
  }
}

export const DeleteGuide = async (req, res) => {
  const { id } = req.params
  try {
    const deletedGuide = await Guide.findByIdAndDelete(id)
    if (!deletedGuide) {
      return sendErrorResponse(res, 404, 'Guide not found.')
    }
    return res.status(200).json({ message: 'Guide deleted successfully.' })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error.')
  }
}
