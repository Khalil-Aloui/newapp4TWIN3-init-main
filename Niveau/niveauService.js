var Niveau = require('./niveauModel')
async function list(req,res,next){
    await Niveau.find()
              .then((data,err)=>{
                if(err){
                    res.status(500).json(err)
                }
                    res.status(200).json(data)
              })
    //res.end('Niveau List')
}

const create =async (req,res,next)=>{
    const { nom, email } = req.body 
    console.log(req.body.nom);
    console.log(req.params.age)
    const { age } = req.params
    console.log(req.params);
    await new Niveau({
        nom: nom,
        email: email,
        age: age
    }).save()
      .then((data, err)=>{
          if(err){
              res.status(500).json(err)
            }
            console.log(data);
      })
    
res.json('Niveau added ! nom : '+ nom + ' email : '+ email+ ' age : '+ age)
}

const update = async (req, res, next)=>{
    await Niveau.findByIdAndUpdate(req.params.id, req.body)
              .then((data, err)=>{
                res.json(data)
              })
}

async function deleteU(req, res, next) {
    await Niveau.findByIdAndDelete(req.params.id)
              .then((data, err)=>{
                if(err){
                    res.status(500).json(err)
                }
                    res.status(200).json(data)
              })
}



module.exports = { create, list, update, deleteU }