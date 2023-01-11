import express from 'express'
import { createScore, deleteScore, findScoreById, listScores, updateScore } from '../controllers/score.js'
import isAuth from '../middleware/is-auth.js'

const scoreRoutes = express.Router()
scoreRoutes.use(isAuth)

// Get all scores
scoreRoutes.route("/score").get(listScores)

// Get a score
scoreRoutes.route("/score/:id").get(findScoreById)

// Create a score
scoreRoutes.route("/score").post(createScore)

// Update a score
scoreRoutes.route("/score/:id").put(updateScore)

// Delete a score
scoreRoutes.route("/score/:id").delete(deleteScore)

export default scoreRoutes