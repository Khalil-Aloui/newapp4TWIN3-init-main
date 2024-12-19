

async function list(req,res,next){
    await Ordinateur.find()
              .then((data,err)=>{
                if(err){
                    res.status(500).json(err)
                }
                    res.status(200).json(data)
              })

}

const getById = async (req, res) => {
    try {
      const Ordinateur = await Ordinateur.findById(req.params.id);
      if (!Ordinateur) return res.status(404).json({ message: 'Bâtiment introuvable' });
      res.status(200).json(Ordinateur);
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
  };

const create =async (req,res,next)=>{
    const { modele,categorie,dateFabrication,prix} = req.body 
 
    await new Ordinateur({
       
        modele: modele,
        categorie: categorie,
        dateFabrication:dateFabrication,
        prix: prix
    }).save()
      .then((data, err)=>{
          if(err){
              res.status(500).json(err)
            }
            console.log(data);
      })
    
res.json('Ordinateur added ! modele : '+ modele + ' modele : '+ modele+ ' prix : '+ prix)
}

const update = async (req, res, next)=>{
    await Ordinateur.findByIdAndUpdate(req.params.id, req.body)
              .then((data, err)=>{
                res.json(data)
              })
}

async function deleteO(req, res, next) {
    await Ordinateur.findByIdAndDelete(req.params.id)
              .then((data, err)=>{
                if(err){
                    res.status(500).json(err)
                }
                    res.status(200).json(data)
              })
}



const Recherche = async (req, res, next) => {
  const { prixMin, prixMax } = req.query;

  if (!prixMin || !prixMax) {
      return res.status(400).json({ message: 'Les paramètres prixMin et prixMax sont requis.' });
  }

  try {
      const resultats = await Ordinateur.find({
          prix: { $gte: Number(prixMin), $lte: Number(prixMax) },
      });

      res.status(200).json(resultats);
  } catch (err) {
      res.status(500).json({ message: 'Erreur serveur.', error: err });
  }
};

function Recherche2(req, res, next) {
  res.render('ordinateur');
}

const socketIO = (server) => {
  const io = socketIo(server);


  io.on('connection', (socket) => {
      console.log('User connected via Socket.IO');

      socket.on('display-ord', async (categorie) => {
                  try {
                      let ords;
                      if (categorie) {
                          ords = await ordinateurModel.find({ categorie });
                          console.log(`Data found for category "${categorie}":`, ords);
                      } else {
                     
                          ords = await ordinateurModel.find();
                          console.log('All data:', ords);
                      }
                      io.emit('ordList', ords); 
                  } catch (error) {
                      console.error('Error fetching data:', error.message);
                      io.emit('error', { message: 'Failed to fetch data' }); 
                  }
       });

  });

  return io;
};


  
module.exports = { create, list, update, deleteO ,getById,Recherche,Recherche2,socketIO} 