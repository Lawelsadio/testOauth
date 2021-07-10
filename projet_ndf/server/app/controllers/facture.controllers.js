const Facture = require('../models/facture.model')


/*
exports.createFacture = (req, res) => {
    let userId = req.body.userId
    let name = req.body.name
    let image = req.file.path
    //let montant = req.file.montant
    //console.log(name, image,userId)
    //console.log( "je suis l'url de l'image",image);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const path = require('path')
const {spawn} = require('child_process')
const fs = require('fs')
const data64 = fs.readFileSync(image, 'base64')
//console.log(data64);
var img = "hi i went to python, and i'm back now" 
/**
 * Run python script, pass in `-u` to not buffer console output 
 * @return {ChildProcess}
 *
 var r = spawn('python', [
  "-u", 
  path.join(__dirname, 'script.py'),
  image,
]);
r.stdin.write(data64);
r.stdin.end();
function runScript(){
  return r
}

const subprocess = runScript()
var m;
var traitee = false;
// print output of script
subprocess.stdout.on('data', (data) => {
 // console.log(`${data}`);
 //montant = data.toString();
 m=parseFloat(data);
 //console.log(typeof m);
 //console.log("\n",image);
});
subprocess.stderr.on('data', (data) => {
  console.log(`error:${data}`);
});
subprocess.on('close', () => {
  //console.log("Closed");

  console.log("je suis le type du montant", typeof m);
  console.log("\nje suis le type du traitee", typeof traitee);
  const facture = new Facture({
    userId: userId,
    name: name,
    image: image,
    montant: m,
    traitee: traitee
    
})
facture.save((err, facture) => {
    if (err) {
        console.log(err)
        return res.status(400).json({
            errors: err.meesage
        })
    }
    return res.json({
        message: "Created facture successfully",
        facture
    })
})

});

//console.log("\n je suis le montant",subprocess);
////////////////////////////////////////////////////////////////////////////////////////////////////////////


}

*/

exports.createFacture = (req, res) => {
  let userId = req.body.userId
  let name = req.body.name
  let image = req.file.path
  //let montant = req.file.montant
  //console.log(name, image,userId)
  //console.log( "je suis l'url de l'image",image);
  const facture = new Facture({
      userId: userId,
      name: name,
      image: image
      //montant: montant
  })
  facture.save((err, facture) => {
      if (err) {
          console.log(err)
          return res.status(400).json({
              errors: err.meesage
          })
      }
      return res.json({
          message: "Created facture successfully",
          facture
      })
  })

}


exports.CreateUserFacture = (req, res) => {
  let userId = req.body.userId
  let name = req.body.name
  let image = req.file.path
  //let montant = req.file.montant
  //console.log(name, image,userId)
  //console.log( "je suis l'url de l'image",image);
  const facture = new Facture({
      userId: userId,
      name: name,
      image: image
      //montant: montant
  })
  facture.save((err, facture) => {
      if (err) {
          console.log(err)
          return res.status(400).json({
              errors: err.meesage
          })
      }
      return res.json({
          message: "Created facture successfully",
          facture
      })
  })

}




exports.getOneFacture = (req, res, next) => {
  Facture.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
};


exports.modifyFacture = (req, res, next) => {
  Facture.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Facture updated successfully !')
    }
  })
};

exports.deleteFacture = (req, res, next) => {
  Facture.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
};


exports.getAllFacture = (req, res, next) => {
    Facture.find().then(
    (factures) => {
      res.status(200).json(factures);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};


exports.getUserFactures = (req, res, next) => {
  const userId = req.params.userId
  //console.log("userId",userId)
      Facture.find({userId}).then(
      (factures) => {
        res.status(200).json(factures);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };


