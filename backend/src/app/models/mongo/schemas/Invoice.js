const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema(
  {
    nfe_json: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Invoice', InvoiceSchema);
