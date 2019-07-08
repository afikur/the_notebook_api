const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const processorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Processor = mongoose.model('Processor', processorSchema);

function validateProcessor(processor) {
  const schema = {
    name: Joi.string().required(),
  };

  return Joi.validate(processor, schema);
}

exports.Processor = Processor;
exports.validate = validateProcessor;
