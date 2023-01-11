import errorHandler from '../../utils/errorHandler.js'
import IEM from '../../utils/intErrorMessages.js'
import titleCase from '../../utils/titleCase.js'
import RoleModel from '../models/role.js'

export const listRoles = (req, res, next) => {
    RoleModel.find({})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const findRoleById = (req, res, next) => {
    RoleModel.findById(req.params.id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const createRole = (req, res, next) => {
    const userId = req.userId
    let { name } = req.body
    name = titleCase(name)
    const role = new RoleModel({
        name: name,
        created_by: userId
    })
    role.save()
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const updateRole = (req, res, next) => {
    const userId = req.userId
    let { name } = req.body
    name = titleCase(name)
    RoleModel.findByIdAndUpdate(
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

export const deleteRole = (req, res, next) => {
    RoleModel.findByIdAndDelete(req.params.id)
        .then(result => {
            const message = IEM("FR", "E00006")
            res.status(200).json({ "message": message })
        })
        .catch(err => {
            next(errorHandler(err))
        })
}