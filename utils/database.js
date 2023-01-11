import mongoose from 'mongoose';

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = mongoose.connection
        db.on("error", console.error.bind(console, "MongoDB connection error: "))
        db.on("connected", (err, res) => {
            console.log("Connection to MongoDB was successful")
        })
    }
}

export default Database