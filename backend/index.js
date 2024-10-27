const express = require('express')
const env = require('dotenv').config()
const cors = require('cors')

const ConnectToMongo = require("./database")
ConnectToMongo()

const app = express()
app.use(express.json())
app.use(cors())

app.get("/test", (req, res) => {
    // console.dir(req.originalUrl) // '/admin/new?a=b' (WARNING: beware query string)
    // console.dir(req.baseUrl) // '/admin'
    // console.dir(req.path) // '/new'
    // console.dir(req.baseUrl + req.path) // '/admin/new' (full path without query string)
    console.log(`${req.method} ${req.originalUrl}`)
    res.json("success")
})

app.use("/api/admin", require('./Routes/AdminRoutes'))

app.use("/api/member", require('./Routes/MemberRoutes'))

app.use("/api/project", require('./Routes/ProjectRoutes'))

app.use("/api/work", require('./Routes/WorkRoutes'))

app.use("/api/expense", require('./Routes/ExpenseRoutes'))

app.use("/api/client", require('./Routes/ClientRoutes'))

app.use("/api/payment", require('./Routes/PaymentRoutes'))

app.use("/api/cloudinary", require('./Routes/CloudinaryRoutes'))



app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT}`)
})