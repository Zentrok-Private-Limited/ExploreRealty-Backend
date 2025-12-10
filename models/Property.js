const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  area: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  image: { type: String } // image file name or URL
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
