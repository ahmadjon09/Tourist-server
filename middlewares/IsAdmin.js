const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message })
}

export default function (req, res, next) {
  if (!req.userInfo || !req.userInfo.role) {
    return sendErrorResponse(res, 409, 'Access not allowed!😡')
  }

  const { role } = req.userInfo

  if (role !== 'admin') {
    return sendErrorResponse(res, 409, 'You are Client⛔')
  }

  next()
}
