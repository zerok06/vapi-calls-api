import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'


dotenv.config()


const app = express()
const port = process.env.PORT || 3000


// config
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes


app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})