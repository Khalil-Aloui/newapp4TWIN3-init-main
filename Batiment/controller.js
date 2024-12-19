var express = require('express')
var router = express.Router()
const { list, create, update, deleteB, getById} = require('./batimentService')

router.get('/getallbatiment', list)
router.get('/getbyidbatiment/:id', getById)
router.post('/addBatiment', create)
router.put('/update/:id', update)
router.delete('/delete/:id', deleteB)

module.exports = router