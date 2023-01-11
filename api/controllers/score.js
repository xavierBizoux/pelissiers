import errorHandler from '../../utils/errorHandler.js'
import IEM from '../../utils/intErrorMessages.js'
import titleCase from '../../utils/titleCase.js'
import ScoreModel from '../models/score.js'

export const listScores = (req, res, next) => {
    ScoreModel.find({})
        .populate("publisher")
        .populate("owner")
        .populate("musicians.personId")
        .populate("musicians.roleId")
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const findScoreById = (req, res, next) => {
    ScoreModel.findById(req.params.id)
        .populate("publisher")
        .populate("owner")
        .populate("musicians.personId")
        // .populate("musicians.personId")
        // .populate("musicians.roleId")
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const createScore = (req, res, next) => {
    const userId = req.userId
    let { title, subtitle, publisher, owner, musicians } = req.body
    title = titleCase(title)
    if (typeof subtitle !== "undefined") {
        subtitle = titleCase(subtitle)
    }
    const score = new ScoreModel({
        title: title,
        subtitle: subtitle,
        owner: owner,
        publisher: publisher,
        musicians: musicians,
        created_by: userId
    })

    score.save()
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const updateScore = (req, res, next) => {
    const userId = req.userId
    let { title, subtitle, publisher, owner, musicians } = req.body
    const updatedScore = { userId: userId }
    if (typeof title !== undefined) {
        title = titleCase(title)
        updatedScore["title"] = title
    }
    if (typeof subtitle !== undefined) {
        subtitle = titleCase(subtitle)
        updatedScore["subtitle"] = subtitle
    }
    if (typeof publisher !== undefined) {
        updatedScore["publisher"] = owner
    }
    if (typeof owner !== undefined) {
        updatedScore["owner"] = owner
    }
    if (typeof musicians !== undefined && musicians.length > 0) {
        updatedScore["musicians"] = musicians
    }
    ScoreModel.findByIdAndUpdate(
        req.params.id,
        updatedScore,
        {
            new: true,              // return updated doc
            runValidators: true     // validate before update
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(errorHandler(err))
        })
}

export const deleteScore = (req, res, next) => {
    ScoreModel.findByIdAndDelete(req.params.id)
        .then(result => {
            const message = IEM("FR", "E00005")
            res.status(200).json({ "message": message })
        })
        .catch(err => {
            res.status(500).json({ "message": err })
        })
}