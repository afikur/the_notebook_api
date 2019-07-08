const express = require('express');
const router = express.Router();
const {Processor, validate} = require('./../model/Processor');

router.get('/', async (req, res) => {
  const processors = await Processor.find();
  res.send(processors);
});

router.post('/', async (req, res) => {
  const {error} = validate(req.body);

  if(error) {
    res.status(400).send(error.details[0].message);
  }
  const {name} = req.body;
  let processor = new Processor({name});
  processor = await processor.save();

  res.send(processor);
});

router.put('/:id', async (req, res) => {
  const {error} = validate(req.body);
  const {name} = req.body;
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const processor = await Processor.findByIdAndUpdate(req.params.id, {name}, {new: true});

  if (!processor) {
    return res.status(404).send('The processor with the given ID was not found.');
  }
  res.send(processor);
});

router.delete('/:id', async (req, res) => {
  const processor = await Processor.findByIdAndRemove(req.params.id);
  if (!processor) {
    return res.status(404).send('The processor with the given ID was not found.');

  }
  res.send(processor);
});

module.exports = router;
