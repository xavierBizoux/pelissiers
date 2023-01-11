import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import AuthRoute from './api/routes/auth.js'
import OwnerRoute from './api/routes/owner.js'
import PersonRoute from './api/routes/person.js'
import PublisherRoute from './api/routes/publisher.js'
import RoleRoute from './api/routes/role.js'
import ScoreRoute from './api/routes/score.js'
import UserRoute from './api/routes/user.js'
import database from './utils/database.js'
import IEM from './utils/intErrorMessages.js'

dotenv.config({ path: "./.env" })
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization"
    );
    next();
});
app.use(AuthRoute)
app.use(UserRoute)
app.use(ScoreRoute)
app.use(RoleRoute)
app.use(PublisherRoute)
app.use(PersonRoute)
app.use(OwnerRoute)

app.use((error, req, res, next) => {
    const status = error.statusCode || 500
    const message = IEM("FR", error.message) || error
    const data = error.data
    res.status(status).json({ message: message, data: data })
})

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
    const db = new database()
})