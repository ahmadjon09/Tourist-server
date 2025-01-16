import Service from '../models/service.js'

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message })
}

export const CreateNewService = async (req, res) => {
  try {
    const { designation, name, logo } = req.body

    if (!name || !designation || !logo) {
      return sendErrorResponse(
        res,
        400,
        'All fields except photos are required.'
      )
    }

    const newService = new Service({
      designation,
      name,
      logo
    })

    await newService.save()

    return res.status(201).json({
      message: 'Service created successfully',
      Service: newService
    })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error.S err:Funk1')
  }
}

export const GetAllServices = async (_, res) => {
  try {
    const Services = await Service.find()
    return res.status(200).json({ data: Services })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error. S err:FUNK2')
  }
}

export const GetOneService = async (req, res) => {
  const { id } = req.params
  try {
    const OneService = await Service.findById(id)
    if (!OneService) {
      return sendErrorResponse(res, 404, 'Service not found.')
    }
    return res.status(200).json({ OneService })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error. S err:FUNK3')
  }
}

export const UpdateService = async (req, res) => {
  const { id } = req.params
  try {
    const updatedService = await Service.findByIdAndUpdate(id, req.body, {
      new: true
    })
    if (!updatedService) {
      return sendErrorResponse(res, 404, 'Service not found.')
    }
    return res.status(200).json({
      message: 'Service updated successfully',
      Service: updatedService
    })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error. S err:FUNK4')
  }
}

export const DeleteService = async (req, res) => {
  const { id } = req.params
  try {
    const deletedService = await Service.findByIdAndDelete(id)
    if (!deletedService) {
      return sendErrorResponse(res, 404, 'Service not found.')
    }
    return res.status(200).json({ message: 'Service deleted successfully.' })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error. S err:FUNK5')
  }
}
