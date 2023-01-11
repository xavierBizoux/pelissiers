import express from 'express'
import { createOwner, deleteOwner, findOwnerByID, listOwners, updateOwner } from '../controllers/owner.js'
import isAuth from '../middleware/is-auth.js'
import OwnerValidator from '../validators/owner.js'

const ownerRoutes = express.Router()
ownerRoutes.use(isAuth)

// Get all owners
ownerRoutes.route("/owner").get(listOwners)

// Get a single owner using the id
ownerRoutes.route("/owner/:id").get(findOwnerByID)

// Create a owner
ownerRoutes.route("/owner").post(OwnerValidator, createOwner)

// Update a owner
ownerRoutes.route("/owner/:id").put(OwnerValidator, updateOwner)

// Delete a owner
ownerRoutes.route("/owner/:id").delete(deleteOwner)

export default ownerRoutes