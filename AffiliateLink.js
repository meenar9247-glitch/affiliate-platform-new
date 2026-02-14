const mongoose = require('mongoose');

const affiliateLinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  baseUrl: {
    type: String,
    required: true
  },
  commissionRate: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'active'
  }
});

module.exports = mongoose.model('AffiliateLink', affiliateLinkSchema);