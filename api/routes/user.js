import express from 'express'
import { deleteUser, findUserByID, listUsers, registerUser, updateUser } from '../controllers/user.js'
import isAuth from '../middleware/is-auth.js'

const userRoutes = express.Router()
userRoutes.use(isAuth)

// Get all users
userRoutes.route("/user").get(listUsers)

// Get a single user using the id
userRoutes.route("/user/:id").get(findUserByID)

// Create a user
userRoutes.route("/user").post(registerUser)

// Update a user
userRoutes.route("/user").put(updateUser)

// Delete a user
userRoutes.route("/user/:id").delete(deleteUser)

export default userRoutes