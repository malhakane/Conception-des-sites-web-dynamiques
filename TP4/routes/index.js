var express = require("express");
var router = express.Router();

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



module.exports = router;

