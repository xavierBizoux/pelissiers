import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import errorHandler from '../../utils/errorHandler.js'
import IEM from '../../utils/intErrorMessages.js'
import titleCase from '../../utils/titleCase.js'
import UserModel from '../models/user.js'

export const registerUser = (req, res, next) => {
    let { email, password, firstName, lastName } = req.body
    firstName = titleCase(firstName)
    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new UserModel({
                email: email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName
            })
            return user.save()
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const authenticateUser = (req, res, next) => {
    const { email, password } = req.body
    let loadedUser
    UserModel.findOne({
        email: email
    })
        .then(user => {
            if (!user) {
                const error = new Error(IEM("FR", "IE00010"))
                error.statusCode = 401
                throw error
            }
            loadedUser = user
            return bcrypt.compare(password, user.password)
        })
        .then(passwordIsValid => {
            if (!passwordIsValid) {
                const error = new Error(IEM("FR", "E00010"))
                error.statusCode = 401
                throw error
            }
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                process.env.JWT_ENCRYPTION,
                { expiresIn: "1h" }
            )
            res.status(200).send({
                id: loadedUser._id,
                accessToken: token
            })
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const listUsers = (req, res, next) => {
    UserModel.find({})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const findUserByID = (req, res, next) => {
    UserModel.findById(req.params.id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const updateUser = (req, res, next) => {
    let { id, email, password, firstName, lastName } = req.body
    if (typeof firstName !== "undefined") firstName = titleCase(firstName)
    if (typeof password !== "undefined") password = bcrypt.hashSync(password)
    UserModel.findByIdAndUpdate(
        id,
        {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        },
        {
            new: true,                       // return updated doc
            runValidators: true              // validate before update
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const deleteUser = (req, res, next) => {
    UserModel.findByIdAndDelete(req.params.id)
        .then(result => {
            const message = IEM("FR", "E00003")
            res.status(200).json({ "message": message })
        })
        .catch(err => {
            next(errorHandler(err))
        })
}
