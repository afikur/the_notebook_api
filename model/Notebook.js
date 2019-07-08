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
  }
});

const Notebook = mongoose.model('Notebook', notebookSchema);

function validateNotebook(notebook) {
  const schema = {
    name: Joi.string().required(),
    processor: Joi.objectId(),
    brand: Joi.objectId()
  };

  return Joi.validate(notebook, schema);
}

exports.Notebook = Notebook;
exports.validate = validateNotebook;
