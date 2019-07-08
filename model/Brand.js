const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Brand = mongoose.model('Brand', brandSchema);

function validateBrand(brand) {
  const schema = {
    name: Joi.string().required(),
  };

  return Joi.validate(brand, schema);
}

exports.Brand = Brand;
exports.validate = validateBrand;
