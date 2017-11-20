var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var data = mongoose.model('Product');
var session = require("express-session");

router.get('/',function(req,res){
  mongoose.model('Order').find({},function(err, orders) {
    if (err) throw err;
    res.statusCode=200;
    res.json(orders);
  });
});

router.post('/',function(req,res){
  var order = mongoose.model('Order')(req.body);
  order.save(function(err) {
    if (err) {
      res.statusCode=400;
      res.send('Bad request');
      throw err;
    }else{
      res.statusCode=201;
      res.send('User created!');
    }
  });
});

router.get('/:id',function(req,res){
  mongoose.model('Order').find({id:req.params.id},function(err, order){
    if(err) throw err;
    if(order.length === 0) {
       res.statusCode=404;
       res.send('Not Found');
    } else{
      res.statusCode=200;
      res.send(order);
    }
  });
});

router.delete('/:id',function(req,res){
  mongoose.model('Order').find({id:req.params.id},function(err, order){
    if(err) throw err;
    if(order.length === 0) {
       res.statusCode = 404;
       res.send('Not Found');
    } else{
      
      mongoose.model('Order').findOneAndRemove(order,function(err){
        if(err) throw err;

        res.send('Deleted succufully !!!!');
      });
    }
  });
});


router.delete('/',function(req,res) {
  mongoose.model('Order').find({},function(err, orders) {
    console.log(orders);
    if (err) throw err;
    if(orders.length === 0) {
      res.statusCode = 204;
      res.send('Not Content');
    }else{
      mongoose.model('Order').remove(orders,function(err,res){
        if(err){ 
          throw err;
        }
        res.statusCode = 200;
        res.send('All orders removed succefully !!' );
      });
    }
  });  
});


module.exports = router;

