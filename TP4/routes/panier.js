var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var data = mongoose.model('Product');
var session = require("express-session");
var isPositiveInteger = require('is-positive-integer');


router.get('/',function(req,res){// supposed to validate
  if(req.session.order === undefined){
    req.session.order = [];
    res.status(200).send(req.session.order); 
  }else{
    res.status(200).send(req.session.order);  
  }
});

router.post('/',function(req,res){ // supposed to validate
  var productId = req.body['productId'];
  
  var quantity = req.body['quantity'];
  if(isPositiveInteger(productId) && isPositiveInteger(quantity)){

    data.count({id:productId},function(err,count){ 
      if(err){
        res.status(500).json({error:'Errors in server!'});
      }
      if(count === 0){
        res.status(400).json({error:'Bad Request'});  
      }else{
        
        if(req.session.order === undefined){
          req.session.order =[];
          
          req.session.order.push(req.body);
          res.status(201).json({message:'Created'}); 
        }else{
          req.session.order.push(req.body);
          res.status(201).json({message:'Created'});    
        }  
      }
    });
  }else{
    if(!isPositiveInteger(productId)){
      res.status(400).json({error:'Bad Request'});
    }
    if(!isPositiveInteger(quantity)){
      res.status(400).json({error:'Bad Request'});
    }
  }
  
});

router.delete('/',function(req,res){
  req.session.order =[];
  res.statusCode=204;
  res.send('All oder removed');
});


router.get('/:productId',function(req,res){  // supposed to validate
  var order = req.session.order.filter(function(ox){
    return ox.productId == req.params.productId;
  });
  if(order.length === 0){
    res.status(404).json({error:"Not found"});
  }else{
    res.status(200).json(order[0]);
  }
});

router.put('/:productId',function(req,res){// supposed to validate
  var quantity = req.body['quantity'];
  var productId = req.params.productId;
  if(!isPositiveInteger(quantity)){
    res.status(400).json({error:'Bad request'});
  }else{
    var product = req.session.order.filter(function(xduct){
      return xduct.productId == productId;
    });
    if(product.length === 0){
      res.status(404).json({error:"Not Found"});
    }else{
      for(i =0;i < req.session.order.length;i++){
        if(req.session.order[i]['productId'] === productId) {
          req.session.order[i]['quantity'] = req.body['quantity'];
        }
      }
      res.status(204).json({message:"No Content"});
    }
  }  
});

router.delete('/:productId',function(req,res){// supposed to validate
  var productId = req.params.productId;
  var order = req.session.order.filter(function(ox){
    return ox.productId == productId;
  });
  if(order.length === 0){
    res.status(404).json({error:"Not Found"});
  }else{
    var elt = req.session.order[order[0]];
    var index = req.session.order.indexOf(elt);
    req.session.order.splice(index,1);
    res.status(204).json();
  }
   
});

module.exports = router;