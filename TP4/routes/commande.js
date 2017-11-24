var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var data = mongoose.model('Order');
var dataProduct = mongoose.model('Product');
var validator = require('validator');
var session = require("express-session");

router.get('/',function(req,res){
  data.find({},function(err, orders) {
    if (err) throw err;
    res.status(200).json(orders);
  });
	
});

router.post('/',function(req,res){
  var order =req.body;
  var id=order.id;
  var firstName=order.firstName;
  var lastName=order.lastName;
  var email=order.email;
  var phone=order.phone;
  var products=order.Products;
  
  var coul=validerIdProduit(order.products);
  console.log(coul);
 var validerTelephone=validatePhone(phone);
 var com=validerProduitCommande(order.products);
  var pro=validerIdProduit(order.products); // validation de l'existance des id de la liste des produits
 
  data.count({id: req.body.id},function(err,count){
      if(count !== 0){
		 return res.status(400).json({message:"Bad Request: la commande existe deja!"});
	  }
	  else {  // verification de la validicite des paramètre
		  if(!validerParametrecommande(id,firstName,lastName,email)||(!pro)||(!com)||(!validerTelephone)){
			 return res.status(400).json({message:"Bad Request: une ou plusieurs parametres ne sont pas valides"});
		 }
		 else{
			 var commande=data(req.body);
			 commande.save(function(err){
			  if(err)throw err
			  console.log(order);
			  return res.status(201).json({message:"create!:la commande a été cree avec succes"});
        });
      }
      }
    });
        
});

router.get('/:id',function(req,res){
  console.log(req.params.id);
	data.count({id:req.params.id},function(err, countId){
    if(err) throw err;
    if(countId === 0) {
	   return res.status(404).json({message:"not found! la commande specifie ne se trouve pas dans la base de donnee"});
    }
	else{	
		data.find({id:req.params.id},function(err, commande){
			if(err) throw err;
		res.status(200).json(commande[0]);
		});
		}
	});
});

router.delete('/:id',function(req,res){
  
  console.log(req.params.id);
	data.count({id:req.params.id},function(err, countId){
    if(err) throw err;
    if(countId === 0) {
	   return res.status(404).json({message:"not found:la commande ne se trouve pas dans la base de donnee"});
    }
	else{	
		data.remove({id:req.params.id},function(err){
		if(err) throw err;
		return res.status(204).json({message: "No Content"});
			
		});
		}
	});
});


router.delete('/',function(req,res) {
  
  data.remove({},function(err){
      if(err)throw err  
	  return res.status(204).json({message: "No Content"});
    });
});

// fonction pour verifier les parametres
function validerParametrecommande(id,firstName,lastName,email){
  var estValide = false;
    if(id&&validator.isInt(id.toString(),{gt:0})&& (!validator.isEmpty(firstName))&&(!validator.isEmpty(lastName))&&(validator.isEmail(email)))
		estValide=true;
	return estValide;
  }
  
 // cette fonction permet de valider les produit d'une commande
function validerProduitCommande(listProduct){
  var estValide = true;
  var validerElement=true;
   for (var i=0;i<listProduct.length;i++ && validerElement){
	 
	 if(!listProduct[i].id ||(!validator.isInt(listProduct[i].id.toString()))){
		 validerElement=false;
	 }
      if(!listProduct[i].quantity ||(!validator.isInt(listProduct[i].quantity.toString(),{gt:0}))){
		validerElement=false;
		}
			
  } 
		
  if(validerElement)
	  estValide=true;
  else
	 estValide=false; 
  
return estValide;
  }

function validatePhone(phone){
  var estValide=false;
  var regexCode = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
if (phone && regexCode.test(phone))
	estValide=true;
return estValide;
}
 function validerIdProduit(produits){
	var existe=true;
	var estVide=true;
	for (var i=0;i<produits.length;i++ && estVide){
		dataProduct.count({id:produits[i].id},function(err,Count){
		if(Count === 0){
		    existe=false;
			estVide=false;
			return existe;
		}
	});
	}
	return existe;
}

module.exports = router;

