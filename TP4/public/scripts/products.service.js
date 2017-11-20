var onlineShop = onlineShop || {};

/**
 * Defines a service to retrieve the products.
 *
 * @author Antoine Beland <antoine.beland@polymtl.ca>
 * @author Konstantinos Lambrou-Latreille <konstantinos.lambrou-latreille@polymtl.ca>
 */
onlineShop.productsService = (function($) {
  "use strict";

  var self = {};
  var productsPromise;
  
  /**
   * Gets all the products.
   *
   * @param [sortingCriteria]   The sorting criteria to use. If no value is specified, the list returned isn't sorted.
   * @param [category]          The category of the product. The default value is "all".
   * @returns {jquery.promise}  A promise that contains the products list.
   */
  self.getProducts = function(sortingCriteria, category) {
    if (!productsPromise) {
      productsPromise=$.get("/api/products?category="+category+"&criteria="+sortingCriteria,function(){});
      console.log(productsPromise);
      //return productsPromise;
    }
    return productsPromise.then(function(products) {
      if (category) {
        products = $.get("/api/products?category="+category+"&criteria="+sortingCriteria,function(){});
      }
      if (sortingCriteria) {
        products = $.get("/api/products?category="+category+"&criteria="+sortingCriteria,function(){});
      }
      return products;
    });
  };

  /**
   * Gets the product associated with the product ID specified.
   *
   * @param productId           The product ID associated with the product to retrieve.
   * @returns {jquery.promise}  A promise that contains the product associated with the ID specified.
   */
  self.getProduct = function(productId) {
    productsPromise = $.get('/api/products/'+productId,function(){});
    return productsPromise.then(function(products) {
      return products[0];
    });
  };


  return self;
})(jQuery);
