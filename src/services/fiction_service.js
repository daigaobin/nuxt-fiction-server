const fictionModel = require('../models/fiction_model');

const getHotFictionList = () => {
    return fictionModel.find({});
};

const saveFiction = (fiction) => {
    let newFiction = new fictionModel(fiction);
    newFiction.save(() => {
        debugger
    });
};

const createFiction = (fictionArray) => {
    //let newFiction = new fictionModel(fictionArray);
    fictionModel.create(fictionArray, () => {
        debugger
    });
};

module.exports = {
    getHotFictionList,
    saveFiction,
    createFiction
}