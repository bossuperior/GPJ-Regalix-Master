const express = require('express')
const router = express.Router()

const {
    read,
    list,
    create,
    update,
    remove,
    getLatestProduct,
    filter
} = require('../Controllers/product')
// middleware
const { auth } = require('../Middleware/auth')
const { upload } = require('../Middleware/upload')

//http://localhost:5000/api/product
router.get('/product', list)
router.get('/product/:id', read)
router.get('/latest', getLatestProduct)
router.get('/filter', filter)
router.post('/product', upload, create)
router.put('/product/:id', upload, update)
router.delete('/product/:id', remove)




module.exports = router