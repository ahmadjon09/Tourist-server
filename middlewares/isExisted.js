import jwt from 'jsonwebtoken'

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message })
}

export default function (req, res, next) {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (!token) return sendErrorResponse(res, 401, 'Access not allowed!🚫 AUTH')

  try {
    const { _id, role } = jwt.verify(token, process.env.JWTSECRET_KEY)
    req.userInfo = { userId: _id, role }
    next()
  } catch (error) {
    console.error('JWT error:', error)
    if (error.name === 'TokenExpiredError') {
      return sendErrorResponse(
        res,
        401,
        'Token has expired. Please log in again.'
      )
    } else if (error.name === 'JsonWebTokenError') {
      return sendErrorResponse(res, 401, 'Invalid token. Access denied.')
    } else {
      return sendErrorResponse(res, 500, 'Server error. Try again later.')
    }
  }
}
