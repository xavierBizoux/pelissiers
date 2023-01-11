import errorHandler from '../../utils/errorHandler.js'
import IEM from '../../utils/intErrorMessages.js'
import titleCase from '../../utils/titleCase.js'
import PublisherModel from '../models/publisher.js'

export const listPublishers = (req, res, next) => {
    PublisherModel.find({})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const findPublisherById = (req, res, next) => {
    PublisherModel.findById(req.params.id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const createPublisher = (req, res, next) => {
    const userId = req.userId
    let { name } = req.body
    name = titleCase(name)
    const publisher = new PublisherModel({
        name: name,
        created_by: userId
    })
    publisher.save()
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const updatePublisher = (req, res, next) => {
    const userId = req.userId
    let { name } = req.body
    name = titleCase(name)
    PublisherModel.findByIdAndUpdate(
        req.params.id,
        {
            name: name,
            updated_by: userId
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

export const deletePublisher = (req, res, next) => {
    PublisherModel.findByIdAndDelete(req.params.id)
        .then(result => {
            const message = IEM("FR", "E00007")
            res.status(200).json({ "message": message })
        })
        .catch(err => {
            next(errorHandler(err))
        })
}