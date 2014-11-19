var express = require('express');
var router = express.Router();

var dataLayerModel = require('../model/dataLayer');

router.get('/wiki', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    dataLayerModel.getAllWikis(function (err, allWikis) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(allWikis));
    })
});

router.get('/testing', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    dataLayerModel.getAllCategories('categories', function (err, allCat) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(allCat));
    })
});

router.get('/wiki/:id', function (req, res) {
    var id = req.params.id;
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    dataLayerModel.getParticularWikiByID(id, function (err, currentWiki) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(currentWiki));
    })
});

router.get('/categories', function (req, res) {
    return actualSpecificPropertyRestLogic('categories',res);
});

router.get('/titleabstract', function (req, res) {
    return actualSpecificPropertyRestLogic('title abstract', res);
});

router.get('titleabstractByCategory', function(req, res){
    return actualSpecificPropertyRestLogic('title abstract', res);
})

function actualSpecificPropertyRestLogic(selection, res){
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    dataLayerModel.getSpecificProperty(selection,function (err, result) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(result));
    })
}

module.exports = router;
