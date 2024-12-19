var express = require('express')
var router = express.Router()
const { list, create, update, deleteO,Recherche} = require('./ordinateurService')


router.get('/getOrdinateur', list)
router.post('/addOrdinateur', create)
router.put('/update/:id', update)
router.delete('/delete/:id', deleteO)   
router.get('/Recherche', Recherche)
router.get('/Recherche2', (req, res) => {
    res.render('ordinateur');
});


module.exports = router