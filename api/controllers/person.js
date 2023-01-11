import errorHandler from '../../utils/errorHandler.js'
import IEM from '../../utils/intErrorMessages.js'
import titleCase from '../../utils/titleCase.js'
import PersonModel from '../models/person.js'

export const listPersons = (req, res, next) => {
    PersonModel.find({})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const findPersonById = (req, res, next) => {
    PersonModel.findById(req.params.id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const createPerson = (req, res, next) => {
    const userId = req.userId
    let { firstName, lastName } = req.body
    firstName = titleCase(firstName)
    const Person = new PersonModel({
        firstName: firstName,
        lastName: lastName,
        created_by: userId
    })
    Person.save()
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            console.log(err)
            next(errorHandler(err))
        })
}

export const updatePerson = (req, res, next) => {
    const userId = req.userId
    let { firstName, lastName } = req.body
    firstName = titleCase(firstName)
    PersonModel.findByIdAndUpdate(
        req.params.id,
        {
            firstName: firstName,
            lastName: lastName,
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

export const deletePerson = (req, res, next) => {
    PersonModel.findByIdAndDelete(req.params.id)
        .then(result => {
            const message = IEM("FR", "E00008")
            res.status(200).json({ "message": message })
        })
        .catch(err => {
            next(errorHandler(err))
        })
}
