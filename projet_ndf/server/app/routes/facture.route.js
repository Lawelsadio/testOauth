const express = require('express')
const router = express.Router()
const uploadMulter = require('../middlewares/upload.js')
const validation = require('../middlewares/validation.js')
const {
    createFacture,getOneFacture,getAllFacture,modifyFacture,deleteFacture,getUserFactures,CreateUserFacture
} = require('../controllers/facture.controllers')

router.get('/factures', getAllFacture);
router.get('/userfacture/:userId', getUserFactures);
router.post('/facture', uploadMulter, validation, createFacture);
router.post('/userfacture/CreateUserFacture', uploadMulter, validation, CreateUserFacture);
router.get('/edit/:id',getOneFacture);
router.get('/detail/:id',getOneFacture);
router.put('/:id', modifyFacture);
router.delete('/:id', deleteFacture);


module.exports = router