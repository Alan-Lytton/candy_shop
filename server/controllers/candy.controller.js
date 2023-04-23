const Candy = require('../models/candy.model');
const { capitalize } = require("../utilities/candyShop.utilities");


module.exports.createCandy = (req, res) => {
    const temp = req.body.candyName;
    req.body = { ...req.body, candyName: capitalize(temp) }
    Candy.create(req.body)
        .then(newCandy => res.json({ candy: newCandy }))
        .catch(err => res.status(400).json(err))
}

module.exports.getAllCandy = (req, res) => {
    Candy.find()
        .then(candyArr => res.json({ allCandy: candyArr }))
        .catch(err => res.status(400).json(err))
}

module.exports.getOneCandy = (req, res) => {
    Candy.findOne({ _id: req.params.id })
        .then(aCandy => res.json({ oneCandy: aCandy }))
        .catch((err => res.status(400).json(err)))
}

module.exports.updateCandy = (req, res) => {
    const temp = req.body.candyName;
    req.body = { ...req.body, candyName: capitalize(temp) }
    Candy.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updatedCandy => res.json({ oneCandy: updatedCandy }))
        .catch(err => res.status(400).json(err))
}

module.exports.deleteCandy = (req, res) => {
    Candy.deleteOne({ _id: req.params.id })
        .then(deleteConfirm => res.json(deleteConfirm))
        .catch(err => res.status(400).json(err))
}


module.exports.updateCandyStock = (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    Candy.findByIdAndUpdate(
        id,
        { candyStock: quantity },
        { new: true, runValidators: true }
    )
        .then((updatedCandy) => res.json({ updatedCandy }))
        .catch((err) => res.status(400).json(err));
};