// Seed db route module

const express = require('express');
const router = express.Router();
const seed = require('../db/seed');
const faker = require('faker');
const Product = require('../model/models');

router.get('/', (req, res) => {
  seed.seed();
  res.send("db successfully seeded!");
});

router.get('/drop', (req, res) => {
  seed.drop();
  res.send("db successfully dropped");
});

module.exports = router;
