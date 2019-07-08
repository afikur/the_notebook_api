const express = require('express');
const router = express.Router();
const {Brand, validate} = require('./../model/Brand');

router.get('/', async (req, res) => {
  const brands = await Brand.find();
  res.send(brands);
});

router.post('/', async (req, res) => {
  const {error} = validate(req.body);

  if(error) {
    res.status(400).send(error.details[0].message);
  }
  const {name} = req.body;
  let brand = new Brand({name});
  brand = await brand.save();

  res.send(brand);
});

router.put('/:id', async (req, res) => {
  const {error} = validate(req.body);
  const {name} = req.body;
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const brand = await Brand.findByIdAndUpdate(req.params.id, {name}, {new: true});

  if (!brand) {
    return res.status(404).send('The brand with the given ID was not found.');
  }
  res.send(brand);
});

router.delete('/:id', async (req, res) => {
  const brand = await Brand.findByIdAndRemove(req.params.id);
  if (!brand) {
    return res.status(404).send('The brand with the given ID was not found.');

  }
  res.send(brand);
});

module.exports = router;
