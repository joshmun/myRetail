// Seed db route module

const express = require("express");
const router = express.Router();
const seed = require("../db/seed");
const Product = require("../model/product-model");

router.get("/", (req, res) => {
  seed.seed(res);
});

router.get("/drop", (req, res) => {
  seed.drop(res);
});

router.get("/one", (req, res) => {
  seed.seedOne(res);
});

module.exports = router;
