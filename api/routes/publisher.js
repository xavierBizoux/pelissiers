import express from 'express'
import { createPublisher, deletePublisher, findPublisherById, listPublishers, updatePublisher } from '../controllers/publisher.js'
import isAuth from '../middleware/is-auth.js'

const publisherRoutes = express.Router()
publisherRoutes.use(isAuth)

// Get all publishers
publisherRoutes.route("/publisher").get(listPublishers)

// Get a single publisher using the id
publisherRoutes.route("/publisher/:id").get(findPublisherById)

// Create a publisher
publisherRoutes.route("/publisher").post(createPublisher)

// Update a publisher
publisherRoutes.route("/publisher/:id").put(updatePublisher)

// Delete a publisher
publisherRoutes.route("/publisher/:id").delete(deletePublisher)

export default publisherRoutes