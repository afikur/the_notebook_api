const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const notebookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  processor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Processor',
    required: true
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },
  image: {
    type: Array,
    default: []
  },
  available:{
    required: true,
    type: Boolean
  },
  description:{
    required: true,
    type: String,
    maxlength: 100000
  },
  price:{
    required: true,
    type: Number
  },
  publish: {
    type: Boolean,
    default: false
  }
});

const Notebook = mongoose.model('Notebook', notebookSchema);

function validateNotebook(notebook) {
  const schema = {
    name: Joi.string().required(),
    processor: Joi.objectId().required(),
    brand: Joi.objectId().required(),
    image: Joi.array().items(Joi.string().uri()),
    available: Joi.boolean().required(),
    description: Joi.string().max(100000).min(10).required(),
    price: Joi.number().required(),
    publish: Joi.boolean()
  };

  return Joi.validate(notebook, schema);
}

exports.Notebook = Notebook;
exports.validate = validateNotebook;
