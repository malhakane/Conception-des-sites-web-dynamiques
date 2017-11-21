var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var data = mongoose.model('Product');
var order = mongoose.model('Order');
var session = require("express-session");
var check = require('validator');
var isPositiveInteger = require('is-positive-integer')

router.get('/',function(req,res){
  mongoose.model('Order').find({},function(err, orders) {
    if (err) {
		res.statusCode = 500;
		res.send('Error in server');
		throw err;
	}
    res.statusCode=200;
    res.json(orders);
  });
});

router.post('/',function(req,res){
	if(!isPositiveInteger(req.body['id'])){
		res.status(400);
		res.send('Bad request');
	}
	data.count({id:req.body['id']}, function(err,count){
		if(err) throw err;
		if(count === 0){
			if(check(bodyreq.body['email']).isMail()){
				res.status(400);
				res.send('Bad request');
			}
			if(check(req.body['firstName']).isEmpty()){
				res.status(400);
				res.send('Bad request');
			}
			if(check(req.body['lastName']).isEmpty()){
				res.status(400);
				res.send('Bad request');
			}
			if(!chechk(req.body['phone']).isMobilPhone()){
				res.status(400);
				res.send('Bad request');
			}
		
			for(i =0;i< req.body['products'].length;i++){
				if(!check(req.body['products'][i]['id']).isInt() || check(req.body['products'][i]['id']).exist()){
					res.status(400);
					res.send('Bad request');
				}
			
				if(!check((eq.body['products'][i]['quantity']).exist() || !isPositiveInteger(req.body['products'][i]['quantity']))){
					res.status(400);
					res.send('Bad request');
				}
			
			}
			
			mongoose.model('Order').save(function(err) {
               if(err) {
					res.statusCode = 500;
					res.send('Error in server');
					throw err;
               }else{
					res.statusCode = 201;
					res.send('User created!');
				}
  });
			
		}else{
			
			res.status(400);
			res.send('Bad request')
		}
	});
	
	
  
});

router.get('/:id',function(req,res){
	if(check(req.params.id).isInt()){
		mongoose.model('Order').find({id:req.params.id},function(err, order){
			
			if(err) throw err;
			if(order.length === 0) {
				res.statusCode=404;
				res.send('Not Found');
			}else{
				res.statusCode=200;
				res.send(order[0]);
			}
		});
	}else{
		res.statusCode=404;
		res.send('Not Found');
	}
});

router.delete('/:id',function(req,res){
  mongoose.model('Order').count({id:req.params.id},function(err, count){
    if(err) throw err;
    if(count === 0) {
       res.statusCode = 404;
       res.send('Not Found');
    } else{
		res.statusCode =204;
        res.send('Deleted succufully !!!!');
     
    }
 });
});


router.delete('/',function(req,res) { 
  order.remove({},function(err, products) {
    if (err)
		throw err;
    res.statusCode = 204;
    res.send('All removed succefully !!' );
   });

});


module.exports = router;

