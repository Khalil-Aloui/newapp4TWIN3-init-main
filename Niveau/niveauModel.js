var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Niveau = new Schema({
    nom : String,
    nbr_chambre : Number,
    etat_construction : Boolean,
    id_batiment : String
})
module.exports = mongoose.model('niveaux', Niveau)

