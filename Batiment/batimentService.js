var Batiment = require('./batimentModel')

async function list(req,res,next){
    await Batiment.find()
              .then((data,err)=>{
                if(err){
                    res.status(500).json(err)
                }
                    res.status(200).json(data)
              })

}

const getById = async (req, res) => {
    try {
      const batiment = await Batiment.findById(req.params.id);
      if (!batiment) return res.status(404).json({ message: 'Bâtiment introuvable' });
      res.status(200).json(batiment);
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
  };

const create =async (req,res,next)=>{
    const { nom,description,nbr_niveau,adress} = req.body 
    console.log(req.body.nom);
    console.log(req.params.description)
    await new Batiment({
        nom: nom,
        description: description,
        nbr_niveau: 0,
        adress: adress
    }).save()
      .then((data, err)=>{
          if(err){
              res.status(500).json(err)
            }
            console.log(data);
      })
    
res.json('Batiment added ! nom : '+ nom + ' description : '+ description+ ' nbr_niveau : '+ nbr_niveau)
}

const update = async (req, res, next)=>{
    await Batiment.findByIdAndUpdate(req.params.id, req.body)
              .then((data, err)=>{
                res.json(data)
              })
}

async function deleteB(req, res, next) {
    await Batiment.findByIdAndDelete(req.params.id)
              .then((data, err)=>{
                if(err){
                    res.status(500).json(err)
                }
                    res.status(200).json(data)
              })
}

module.exports = { create, list, update, deleteB ,getById} 