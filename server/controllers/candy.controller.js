const Candy = require('../models/candy.model');

module.exports.createCandy = (req, res) =>{
    Candy.create(req.body)
        .then(newCandy => res.json({candy:newCandy}))
        .catch(err => res.status(400).json(err))
}

module.exports.getAllCandy = (req,res) =>{
    Candy.find()
        .then(candyArr =>res.json({allCandy:candyArr}))
        .catch(err => res.status(400).json(err))
}

module.exports.getOneCandy = (req,res) =>{
    Candy.findOne({_id:req.params.id})
        .then(aCandy => res.json({oneCandy:aCandy}))
        .catch((err => res.status(400).json(err)))
}

module.exports.updateCandy = (req,res) =>{
    Candy.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
        .then(updatedCandy => res.json({oneCandy:updatedCandy}))
        .catch(err => res.status(400).json(err))
}

module.exports.deleteCandy = (req,res) =>{
    Candy.deleteOne({_id:req.params.id})
        .then(deleteConfirm => res.json(deleteConfirm))
        .catch(err => res.status(400).json(err))
}