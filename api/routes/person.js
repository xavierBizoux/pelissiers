import express from 'express'
import { createPerson, deletePerson, findPersonById, listPersons, updatePerson } from '../controllers/person.js'
import isAuth from '../middleware/is-auth.js'

const personRoutes = express.Router()
personRoutes.use(isAuth)

// Get all persons
personRoutes.route("/person").get(listPersons)

// Get a single person using the id
personRoutes.route("/person/:id").get(findPersonById)

// Create a person
personRoutes.route("/person").post(createPerson)

// Update a person
personRoutes.route("/person/:id").put(updatePerson)

// Delete a person
personRoutes.route("/person/:id").delete(deletePerson)

export default personRoutes