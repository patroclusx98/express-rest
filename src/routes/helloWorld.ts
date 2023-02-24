import express from 'express'

export const helloWorldRouter = express.Router()

// GET all
helloWorldRouter.get('/', (req, res) => {
  res.send('Hello World')
})
