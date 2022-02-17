const db = require("../models");
const transactions = db.transactions;
const crypto = require('crypto');
// meters are hardcoded in the system database

//making the transaction, on each transaction a token will be assigned
exports.create = (req, res) => {
    const token = crypto.randomBytes(48).toString('hex');
  };

// see all transactions from the database.
exports.findAll = (req, res) => {
  
};
// see for a given  single meters with an id
exports.findOne = (req, res) => {
  
};
// Update meters transaction state by the id in the request,
exports.update = (req, res) => {

  
};
// Delete a transaction with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all transactions from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
// exports.findAllPublished = (req, res) => {
  
// };