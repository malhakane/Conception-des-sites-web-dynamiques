var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var data = mongoose.model('Product');
var order = mongoose.model('Order');
var session = require("express-session");
var check = require('validator');
var isPositiveInteger = require('is-positive-integer');

router.get('/',function(req,res){
  mongoose.model('Order').find({},function(err, orders) {
	
    if (orders=== null) {
		res.status(500).json({error:'Error in server'});
		
	}else{
		res.status(200).json(orders);
	}
    
  });
});

router.post('/',function(req,res){
	var id = req.body['id'];
	var firstName = req.body['firstName'];
	var lastName = req.body['lastName'];
	var phone = req.body['phone'];
	var email = req.body['email'];
	var products = req.body['products'];

	if(!isPositiveInteger(id)){
		res.status(400);
		res.send('Bad request');
	}
	
	data.count({id:id}, function(count){
		if(count === 0){
			if(check(email).isMail()){
				res.status(400);
				res.send('Bad request');
			}
			if(check(lastName).isEmpty()){
				res.status(400);
				res.send('Bad request');
			}
			if(check(firstName).isEmpty()){
				res.status(400);
				res.send('Bad request');
			}
			if(!chechk(phone).isMobilPhone()){
				res.status(400);
				res.send('Bad request');
			}
			for(i =0;i< products.length;i++){
				if(!check(products[i]['id']).isInt() || check(products[i]['id']).exist()){
					res.status(400);
					res.send('Bad request');
				}
				if(!check(products[i]['quantity']).exist() || !isPositiveInteger(products[i]['quantity'])){
					res.status(400);
					res.send('Bad request');
				}
			}
			mongoose.model('Order').save(function(err) {
               if(err) {
					res.statusCode = 500;
					res.send('Error in server');
	
               }else{
					res.statusCode = 201;
					res.send('User created!');
				}
  			});
		}else{
			res.status(400).json({error:'Bad reuqest'});
		}
	});  
});

router.get('/:id',function(req,res){
	if(isPositiveInteger(req.params.id)){
		order.find({id:req.params.id},function( order){
			console.log('Order : '+order[0]);
			if(order.length === 0) {
				res.status(404).json({error:'Not Found'});
				
			}else{
				res.status(200).json(order[0]);
				
			}
		});
	}else{
		res.status(404).json({error:'Not Found'});
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
  order.remove({},function(err) {
    if (err){
		res.statusCode = 500;
		res.send('Server Error' );
	}else{
		res.statusCode = 204;
		res.send('All removed succefully !!' );
	}
	 });

});

module.exports = router;

