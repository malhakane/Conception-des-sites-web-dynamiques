var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var data = mongoose.model('Product');
var session = require("express-session");




router.get("/",function(req,res){
  mongoose.model('Product').find({},function(err, products) {
      if (err) throw err;
      if(products.length===0){
        products =[];
        res.json(products);
      }else {
        products = _applyCategory(products,'all');
        products=_applySortingCriteria(products, 'price-asc');
        
        if(req.query.category === undefined && req.query.criteria===undefined){

          products = _applyCategory(products,'all');
          products=_applySortingCriteria(products, 'price-asc');
          
        }else{
          if(!validerParametreCategorie(req.query.category) || !validerParametreCritere(req.query.criteria)){
            res.statusCode=400;
            res.send('Bad request');
          }else{
            if(req.query.category  && req.query.criteria===undefined || req.query.category){
              products = _applyCategory(products, req.query.category);
            }
            if(req.query.criteria && req.query.category ===undefined || req.query.criteria){
              products = _applySortingCriteria(products, req.query.criteria);
            }
            res.statusCode = 200;
            //res.json(products);
          }
        }
        res.json(products);
      }


    });
});


router.post('/',function(req,res){
  var product = mongoose.model('Product')(req.body);
  product.save(function(err) {
    if (err) {
      res.status(400).json({error:'Bad request'});
    }else{
      res.sendStatus(201);
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
  data.remove({},function(err, products) {
    if (err)
		throw err;
    res.statusCode = 204;
    res.send('All removed succefully !!' );
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

function validerParametreCategorie(category){
  var estValide= false;
  if(category==="cameras"||category==="computers"||category==="consoles"||category==="screens" ||category===undefined){
    estValide= true;
  }else {
    estValide = false;
  }
  return estValide;
}

function validerParametreCritere(criteria){
  var valider = false;
  if(criteria ==="alpha-asc"||criteria ==="alpha-dsc"||criteria ==="price-asc"||criteria ==="price-dsc" || criteria ===undefined){
    valider = true;
  }else {
    valider = false;
  }
  return valider;
}




module.exports = router;
