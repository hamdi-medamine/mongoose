const mongoose = require("mongoose");
const personSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        default: "amine" },
    age: { 
        type: Number, 
        required: true, 
        default: 25 },
    favoriteFoods: { 
        type: [String], 
        default: ["banane"] },
  })

  module.exports = mongoose.model("person", personSchema);