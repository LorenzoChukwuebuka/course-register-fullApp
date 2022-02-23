const express = require('express')
const cors = require('cors')
const db = require('./db')
const helmet = require('helmet')
const adminlogroute = require('./Routes/AdminRoutes/LoginRoute')
const levelRoute = require('./Routes/AdminRoutes/levelsRoute')
const courseRoute = require('./Routes/AdminRoutes/courseRoute')
const studentRoute = require('./Routes/AdminRoutes/studentRoutes')
const userRoute = require('./Routes/userRoutes/loginRoute')
const getStudentRoutes = require('./Routes/userRoutes/fetchStudentRoute')
const courseRegisterRoute = require('./Routes/userRoutes/courseRegisterRoute')
const resultRoute = require('./Routes/AdminRoutes/resultRoutes')
const studentResult = require('./Routes/userRoutes/resultRoue')
const path = require('path')
var history = require('connect-history-api-fallback')

const app = express()

app.use(cors())
app.use(helmet())
app.use(
  history({
    index: '/index.html'
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 3000

app.use(express.static(path.join(__dirname, './client')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'))
})

//instantiate the routes
app.use('/api/login', adminlogroute)
app.use('/api', levelRoute)
app.use('/api/course', courseRoute)
app.use('/api/student', studentRoute)
app.use('/api/user/login', userRoute)
app.use('/api/getStudent', getStudentRoutes)
app.use('/api/courseRegister', courseRegisterRoute)
app.use('/api/result', resultRoute)
app.use('/api/studentResult', studentResult)

db.connect(err => {
  if (err) throw err
})

app.listen(PORT, console.log(`Server running on ${PORT}`))
