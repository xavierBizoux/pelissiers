import express from 'express'
import { createRole, deleteRole, findRoleById, listRoles, updateRole } from '../controllers/role.js'
import isAuth from '../middleware/is-auth.js'

const roleRoutes = express.Router()
roleRoutes.use(isAuth)

// Get all roles
roleRoutes.route("/role").get(listRoles)

// Get a single role using the id
roleRoutes.route("/role/:id").get(findRoleById)

// Create a role
roleRoutes.route("/role").post(createRole)

// Update a role
roleRoutes.route("/role/:id").put(updateRole)

// Delete a role
roleRoutes.route("/role/:id").delete(deleteRole)

export default roleRoutes