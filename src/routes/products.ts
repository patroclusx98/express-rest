import express from 'express'

export const productsRouter = express.Router()

// GET all
productsRouter.get('/', (req, res) => {
    res.send('Hello World!')
})

