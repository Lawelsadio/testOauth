const mongoose = require('mongoose');

const factureSchema = new mongoose.Schema({
    userId: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
        required: true
    },
    montant: {
        type: Number,
        trim: true,
        
    },
    traitee: {
        type: Boolean,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Facture', factureSchema);