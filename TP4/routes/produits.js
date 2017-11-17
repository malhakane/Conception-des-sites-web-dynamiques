var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var data = mongoose.model('Product');


router.get("/api/products",function(req,res){
    data.find({},function(err, products) {
        if (err) throw err;
      
        // object of all the users
        console.log(products);
      });
});

module.exports = router;