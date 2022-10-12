const  CardsModel = require("../data/cards");

// DEFINE CONTROLLER FUNCTIONS

// listAllCardsModels function - To list all CardsModels
exports.listAllCardsModels = (req, res) => {
    CardsModel.find({}, (err, cardsModel) => {
    if (err) {
    res.status(500).send(err);
    }
    res.status(200).json(cardsModel);
    });
};
/*
// createNewCardsModel function - To create new CardsModel
exports.createNewCardsModel = (req, res) => {
let  newCardsModel = new CardsModel (req.body);
newCardsModel.save((err, CardsModel) => {
if (err) {
res.status(500).send(err);
}
res.status(201).json(CardsModel);
});
};

// updateCardsModel function - To update CardsModel status by id
exports.updateCardsModel = (req, res) => {
CardsModel.findOneAndUpdate({ _id:req.params.id }, req.body, { new:true }, (err, CardsModel) => {
if (err) {
res.status(500).send(err);
}
res.status(200).json(CardsModel);
});
};

// deleteCardsModel function - To delete CardsModel by id
exports.deleteCardsModel = async ( req, res) => {
await  CardsModel.deleteOne({ _id:req.params.id }, (err) => {
if (err) {
return res.status(404).send(err);
}
res.status(200).json({ message:"CardsModel successfully deleted"});
});
};*/