import jwt from 'jsonwebtoken'
import IEM from '../../utils/intErrorMessages.js'

const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization")
    if (!authHeader) {
        const error = new Error(IEM("FR", "E00011"))
        error.statusCode = 401
        throw error
    }
    const token = authHeader.split(' ')[1]
    let decodedToken
    try {
        decodedToken = jwt.verify(token, process.env.JWT_ENCRYPTION)
    } catch (err) {
        err.statusCode = 500
        throw err
    }
    if (!decodedToken) {
        const error = new Error(IEM("FR", "E00011"))
        error.statusCode = 401
        throw error
    }
    req.userId = decodedToken.userId
    next()
}

export default isAuth