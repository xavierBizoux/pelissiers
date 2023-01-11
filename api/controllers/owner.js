import errorHandler from '../../utils/errorHandler.js'
import IEM from '../../utils/intErrorMessages.js'
import titleCase from '../../utils/titleCase.js'
import OwnerModel from '../models/owner.js'

export const listOwners = (req, res, next) => {
    OwnerModel.find({})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const findOwnerByID = (req, res, next) => {
    OwnerModel.findById(req.params.id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const createOwner = (req, res, next) => {
    const userId = req.userId
    let { name } = req.body
    name = titleCase(name)
    const owner = new OwnerModel({
        name: name,
        created_by: userId
    })
    owner.save()
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const updateOwner = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("E00014")
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }
    const userId = req.userId
    let { name } = req.body
    name = titleCase(name)
    OwnerModel.findByIdAndUpdate(
        req.params.id,
        {
            name: name,
            userId: userId
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

export const deleteOwner = (req, res, next) => {
    OwnerModel.findByIdAndDelete(req.params.id)
        .then(result => {
            const message = IEM("FR", "E00009")
            res.status(200).json({ "message": message })
        })
        .catch(err => {
            next(errorHandler(err))
        })
}
