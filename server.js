const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./router")

const dotenv = require("dotenv")

dotenv.config()

const PORT = process.env.PORT || 8000

const app = express();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB")
})
.catch(error => console.log(error))

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: " this is simple route"})
})

app.use('/api',router)

app.listen(PORT, async () => {
    console.log(`server runnig on port ${PORT}`)
})