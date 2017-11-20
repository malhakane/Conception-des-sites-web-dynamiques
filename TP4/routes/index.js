var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var data = mongoose.model('Product');
var session = require("express-session");

router.get(["/", "/accueil"], function(req, res) {
  res.render("index", { title: "Accueil"});
});

router.get("/produits", function(req, res) {
  res.render("produits", { title: "produits"});
});

router.get("/produit", function(req, res) {
  res.render("produit", { title: "produit"});
});

router.get("/contact", function(req, res) {
  res.render("contact", { title: "contact" }); 
});

router.get("/panier", function(req, res) {
  res.render("panier", { title: "panier"});
});

router.get("/commande", function(req, res) {
  res.render("commande", { title: "commande"}); 
});

router.post("/confirmation", function(req, res) {
  res.render("confirmation", { title: "confirmation" });
});

/******************Api for products**********************/

router.get("/api/products",function(req,res){
  mongoose.model('Product').find({},function(err, products) {
      if (err) throw err;
      console.log('Console length : '+ req.param('category'));
      console.log('Console length : '+ req.param('criteria'));
      if(req.param('category') === undefined && req.param('criteria')===undefined){
        console.log('Je suis ici HAHAHAHAH');
        
        products = _applyCategory(products,'all');
        products=_applySortingCriteria(products, 'price-asc');
      }else{
        if(req.param('category')){
          console.log('Je suis dans categorie');
          products = _applyCategory(products, req.param('category'));
        }
        if(req.param('criteria')){
          console.log('Je suis dans critere');
          products = _applySortingCriteria(products, req.param('criteria'));
        }
      }
      res.json(products);
    });
});


router.post('/api/products',function(req,res){
  var product = mongoose.model('Product')(req.body);
  product.save(function(err) {
    if (err) {
      res.statusCode = 400;
      res.send('Bad request');
      throw err;
    }else{
      res.statusCode = 201;
      res.send('User created!');
    }
  });
});

router.get('/api/products/:id',function(req,res){
  mongoose.model('Product').find({id:req.params.id},function(err, product){
    if(err) throw err;
    if(product == null) {
       res.statusCode = 404;
    } else{
      res.statusCode = 200;
      res.send(product);
    }
  });
});

router.delete('/api/products/:id',function(req,res){
  mongoose.model('Product').find({id:req.params.id},function(err, product){
    if(err) throw err;
    if(product == null) {
       res.statusCode = 404;
       res.send('Not Found');
    } else{
      
      mongoose.model('Product').findOneAndRemove(product,function(err){
        if(err) throw err;

        res.send('Deleted succufully !!!!');
      })
    }
  });
});

router.delete('/api/products',function(req,res) {
  mongoose.model('Product').find({},function(err, products) {
    if (err) throw err;
    if(products == null) {
      res.statusCode = 204;
      res.send('Not Content');
    }else{
      mongoose.model('Product').remove(products,function(err,res){
        if(err){ 
          throw err;
        }
        res.statusCode = 200;
        res.send('All removed succefully !!' );
      });
    }
  });  
});

/**
   * Applies a filter to the specified products list to keep only the products of the specified category.
   *
   * @param products        The products list to filter.
   * @param category        The category to use with the filter.
   * @returns {*}           The products list filtered.
   * @private
   */
  function _applyCategory(products, category) {
    if (products) {
      products = products.filter(function(product) {
        return category === "all" || product.category === category;
      });
    }
    return products;
  }


  /**
   * Applies a sorting criteria to the specified products list.
   *
   * @param products          The product list to sort.
   * @param sortingCriteria   The sorting criteria to use. The available values are:
   *                            - price-up (ascendant price);
   *                            - price-down (descendant price);
   *                            - alpha-up (alphabetical order ascending);
   *                            - alpha-down (alphabetical order descending).
   * @returns {*}             The products list sorted.
   * @private
   */
  function _applySortingCriteria(products, sortingCriteria) {
    if (products) {
      switch (sortingCriteria) {
        case "price-asc":
          products = products.sort(function(a, b) {
            return a["price"] - b["price"];
          });
          break;
        case "price-dsc":
          products = products.sort(function(a, b) {
            return b["price"] - a["price"];
          });
          break;
        case "alpha-asc":
          products = products.sort(function(a, b) {
            var nameA = a["name"].toLowerCase();
            var nameB = b["name"].toLowerCase();
            if (nameA > nameB) {
              return 1;
            } else if (nameA < nameB) {
              return -1;
            }
            return 0;
          });
          break;
        case "alpha-dsc":
          products = products.sort(function(a, b) {
            var nameA = a["name"].toLowerCase();
            var nameB = b["name"].toLowerCase();
            if (nameA > nameB) {
              return -1;
            } else if (nameA < nameB) {
              return 1;
            }
            return 0;
          });
          break;
      }
    }
    return products;
  }

  


/*****************API for shopping-card*************************/

router.get('/api/shopping-cart',function(req,res){
  if(!req.session.order){
    res.send(req.session.order = []); 
  }else{
    res.send(req.session.order);    
  }
  console.log(req.session.order);
});

router.post('/api/shopping-cart',function(req,res){
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

router.delete('/api/shopping-cart',function(req,res){
  req.session.order =[];
  console.log(req.session.order);
  res.status(204).send('All oder removed');
});


router.get('/api/shopping-cart/:productId',function(req,res){
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

router.put('/api/shopping-cart/:productId',function(req,res){
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

router.delete('/api/shopping-cart/:productId',function(req,res){
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

/*******************API des commandes********************** */

router.get('/api/orders',function(req,res){
  mongoose.model('Order').find({},function(err, orders) {
    if (err) throw err;
    res.statusCode=200;
    res.json(orders);
  });
});

router.post('/api/orders',function(req,res){
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

router.get('/api/orders/:id',function(req,res){
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

router.delete('/api/orders/:id',function(req,res){
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


router.delete('/api/orders',function(req,res) {
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

