var mongoose = require('mongoose');
var wikiModel = mongoose.model('wikiPedia');

//##FIND ALL WIKIS###
function getAllWikis(callback) {
    wikiModel.find({}, function (err, allWikis) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            } else {
                callback(null, allWikis);
            }
        }
    )
}

//##GET ALL CATEGORIES###
function getWikisByCategoryID(categoryID, callback) {
    wikiModel.find({categories : categoryID}).select(selection).exec(function (err, result) {
        if (err){
            callback(err)
        }
        callback(null, result)
    });
};

function getAllCategories(selection, callback) {
    wikiModel.find().select(selection).exec(function (err, result) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            } else {
                var categoriesList = [];
                var stringified = JSON.stringify(result);
                console.log(categoriesList);

                callback(null, result);
            }
        }
    )
};

//##FIND ALL PROPERTIES YOU WANT###
function getSpecificProperty(selection, callback) {
    wikiModel.find().select(selection).exec(function (err, result) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            } else {
                callback(null, result);
            }
        }
    )
};

//##FIND WIKI BY TITLE###
function getParticularWikiByID(id, callback) {
    wikiModel.find({_id: id}, function (err, particularWiki) {
        if (err) {
            callback(err);
        }
        callback(null, particularWiki);
    });
}

module.exports = {
    getAllWikis: getAllWikis,
    getSpecificProperty: getSpecificProperty,
    getWikisByCategoryID : getWikisByCategoryID,
    getParticularWikiByID : getParticularWikiByID,
    getAllCategories : getAllCategories
}