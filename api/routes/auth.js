import express from 'express'
import { authenticateUser, registerUser } from '../controllers/user.js'

const authRoutes = express.Router()

// Register user
authRoutes.route("/auth/register").post(registerUser)

// Authenticate user
authRoutes.route("/auth/login").post(authenticateUser)

export default authRoutes