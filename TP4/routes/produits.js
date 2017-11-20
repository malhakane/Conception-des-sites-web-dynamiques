var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var data = mongoose.model('Product');
var session = require("express-session");


router.get("/",function(req,res){
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


router.post('/',function(req,res){
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

router.get('/:id',function(req,res){
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

router.delete('/:id',function(req,res){
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

router.delete('/',function(req,res) {
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

  


module.exports = router;