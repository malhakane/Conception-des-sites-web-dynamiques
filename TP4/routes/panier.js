var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var data = mongoose.model('Product');
var session = require("express-session");

router.get('/',function(req,res){
  if(!req.session.order){
    res.send(req.session.order = []); 
  }else{
    res.send(req.session.order);    
  }
  console.log(req.session.order);
});

router.post('/',function(req,res){
  mongoose.model('Product').find({id:req.body['productId']},function(err,product){
    if(err) throw err;
    if(product.length === 0){
      res.status(400).send('speciefied Product Not found');
    }else{
      if(!req.session.order){
        req.session.order =[].push(req.body); 
      }else{
        req.session.order.push(req.body);    
      }
      console.log(req.session.order);
      res.status(201).send(req.session.order);
    }
  });
});

router.delete('/',function(req,res){
  req.session.order =[];
  console.log(req.session.order);
  res.status(204).send('All oder removed');
});


router.get('/:productId',function(req,res){
  var product = req.session.order.filter(function(xduct){
    return xduct.productId == req.params.productId;
  });
  if(!product){
    res.status(400).send("Specified Product doesn't exist");
  }else{
    console.log(req.session.order);
    res.status(200).send(product);
  }
});

router.put('/:productId',function(req,res){
  if(!Number.isInteger(Number.parseInt(req.params.productId))){
    res.status(400).send('Bad request');
  }else{
    var product = req.session.order.filter(function(xduct){
      return xduct.productId == req.params.productId;
    });
    if(!product){
      res.status(404).send("Specified Product doesn't exist");
    }else{
      for(i =0;i < req.session.order.length;i++){
        if(req.session.order[i]['productId'] == req.params.productId) {
          req.session.order[i]['quantity'] = req.body['quantity'];
        }
      }
      console.log(req.session.order);
      res.status(204).send();
    }
  }  
});

router.delete('/:productId',function(req,res){
  var product = req.session.order.filter(function(xduct){
    return xduct.productId == req.params.productId;
  });
  if(!Number.isInteger(Number.parseInt(req.params.productId))){
    res.status(400).send('Bad request');
  }else{
    if(!product){
      res.status(404).send("Specified Product doesn't exist");
    }else{
      var elt = req.session.order[product];
      var index = req.session.order.indexOf(elt);
      req.session.order.splice(index,1);
      console.log(req.session.order);
      res.status(204).send();
    }
  }  
});

module.exports = router;