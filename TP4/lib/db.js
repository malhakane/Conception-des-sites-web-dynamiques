"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Order = new Schema({
  id: { type: Number, unique: true },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  products: Array
}, { versionKey: false });


var Product = new Schema({
  id: { type: Number, unique: true },
  name: String,
  price: Number,
  image: String,
  category: String,
  description: String,
  features: Array
}, { versionKey: false });

mongoose.model("Order", Order);
mongoose.model("Product", Product);

mongoose.Promise = global.Promise;

// TODO: Initialiser la connexion avec le "connect string" de votre base de données.
mongoose.connect("mongodb://ablam:Ks39px23@ds157475.mlab.com:57475/ablam", { useMongoClient: true });
//mongoose.connect("mongodb://carenedb:tp4db@ds111476.mlab.com:11476/online-shop", { useMongoClient: true });


