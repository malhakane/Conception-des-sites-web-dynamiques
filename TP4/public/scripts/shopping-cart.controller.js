var onlineShop = onlineShop || {};

/**
 * Controls the "shopping cart" view and the elements associated with the shopping cart.
 *
 * @author Antoine Beland <antoine.beland@polymtl.ca>
 * @author Konstantinos Lambrou-Latreille <konstantinos.lambrou-latreille@polymtl.ca>
 */
(function($, shoppingCartService, utils) {
  "use strict";

  /**
   * Updates the shopping cart count to display.
   *
   * @private
   */
  /*function _updateCount() {
    var itemsCount = shoppingCartService.getItemsCount();
    console.log('_updateCount : ' +itemsCount)
    var countElement = $(".shopping-cart").find(".count");
    if (itemsCount > 0) {
      countElement.addClass("visible").text(itemsCount);
    } else {
      countElement.removeClass("visible");
    }
  }*/

  function _updateCount() {
    shoppingCartService.getItemsCount().done(function(itemsCount){
      console.log('_updateCount : ' +itemsCount);
      var countElement = $(".shopping-cart").find(".count");
      if (itemsCount > 0) {
        countElement.addClass("visible").text(itemsCount);
      } else {
        countElement.removeClass("visible");
      }
    }); 
  }  

  /**
   * Updates the total amount to display.
   *
   * @private
   */
  function _updateTotalAmount() {
    shoppingCartService.getTotalAmount().done(function(total) {
      $("#total-amount").html(utils.formatPrice(total));
    });
  }

  /**
   * Renders the view when the shopping cart is empty.
   *
   * @private
   */
  function _renderEmptyView() {
    $("#shopping-cart-container").html("<p>Aucun produit dans le panier.</p>");
  }

  /**
   * Renders the view when the shopping cart isn't empty.
   *
   * @param items   The items in the shopping cart.
   * @private
   */
  function _renderShoppingCartView(items) {
    var shoppingCartTable = $(".shopping-cart-table tbody");
    items.forEach(function(item) {
      var product = item.product;
      var rowElement = _createItemElement(item);

      // Updates the quantity for a specific item and update the view.
      function updateQuantity(quantity) {
        rowElement.find(".remove-quantity-button").prop("disabled", quantity <= 1);
        shoppingCartService.updateItemQuantity(product.id, quantity);

        _updateCount();
        _updateTotalAmount();
        rowElement.find(".quantity").text(quantity);
        rowElement.find(".price").html(utils.formatPrice(product["price"] * quantity));
      }

      rowElement.find(".remove-item-button").click(function() {
        if (confirm("Voulez-vous supprimer le produit du panier?")) {
          shoppingCartService.removeItem(product.id);
          rowElement.remove();
          if (shoppingCartService.getItemsCount() === 0) {
            _renderEmptyView();
          } else {
            _updateTotalAmount();
          }
          _updateCount();
        }
      });
      rowElement.find(".remove-quantity-button").click(function() {
        updateQuantity(shoppingCartService.getItemQuantity(product.id) - 1);
      });
      rowElement.find(".add-quantity-button").click(function() {
        updateQuantity(shoppingCartService.getItemQuantity(product.id) + 1);
      });

      shoppingCartTable.append(rowElement);
    });
  }

  /**
   * Creates an item element.
   *
   * @param item                The item to use to create the element.
   * @returns {*|HTMLElement}   A jQuery element.
   * @private
   */
  function _createItemElement(item) {
    return $("<tr>" +
      "<td><button class='remove-item-button' title='Supprimer'><i class='fa fa-times'></i></button></td>" +
      "<td><a href='/produit?id=" + item.product.id + "'>" + item.product.name + "</a></td>" +
      "<td>" + utils.formatPrice(item.product["price"]) + "</td>" +
      "<td>" +
      "<div class='row'>" +
      "<div class='col'><button class='remove-quantity-button' title='Retirer' " +
      ((item.quantity <= 1) ? "disabled" : "") + ">" +
      "<i class='fa fa-minus'></i></button></div>" +
      "<div class='col quantity'>" + item.quantity + "</div>" +
      "<div class='col'><button class='add-quantity-button' title='Ajouter'><i class='fa fa-plus'></i></button></div>" +
      "</div>" +
      "</td>" +
      "<td class='price'>" + utils.formatPrice(item.total) + "</td>" +
      "</tr>");
  }

  // Initializes the shopping cart.
  $("#add-to-cart-form").submit(function(event) {
    event.preventDefault();
    var productId = parseInt($(this).attr("data-product-id"));
    shoppingCartService.addItem(productId, parseInt($(this).find("input").val())).done(function(data){
      shoppingCartService.getItemQuantity(productId).done(function(donnees){
        _updateCount();
        console.log("donnees: "+ JSON.stringify(donnees.quantity));
        //$("#shopping-cart-quantity").text(data);      
      });
      
      //$("#shopping-cart-quantity").text(shoppingCartService.getItemQuantity(productId));
    });

    var dialog = $("#dialog");
    dialog.fadeIn();
    setTimeout(function() {
      dialog.fadeOut();
    }, 5000);

    //_updateCount();
    //$("#shopping-cart-quantity").text(shoppingCartService.getItemQuantity(productId));
  });

  $("#remove-all-items-button").click(function () {
    if (confirm("Voulez-vous supprimer tous les produits du panier?")) {
      shoppingCartService.removeAllItems();
      _renderEmptyView();
      _updateCount();
    }
  });

  // Checks if we are on the "shopping cart" page.
  if ($("#shopping-cart-container").length) {
    shoppingCartService.getItems().done(function(items) {
      if (items.length === 0) {
        _renderEmptyView();
      } else {
        _renderShoppingCartView(items);
      }
    });
    _updateTotalAmount();
  }
  _updateCount();

})(jQuery, onlineShop.shoppingCartService, onlineShop.utils);
