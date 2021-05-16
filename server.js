const express=require("express");
const app=express();
const mongoose = require("mongoose");
require('dotenv').config()
const person = require("./models/Person");

 mongoose.connect(process.env.DB_URI ,{ useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true } ,(err)=>{
    if (err) throw err
    console.log('database connected')
  })

//Create and Save a Record of a Model

  const personmodel = new person({
    name: "Med amine",
    age: 30,
    favoriteFoods: ["pizza", "tacos"],
  });
  
  
  personmodel.save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });

  //Create Many Records with model.create()

  var arrayOfPeople = [
    {
      name: "imen ",
      age: 28, 
      favoriteFoods: ["salade", "farfoucha"],
    },
    {
      name: "adem ",
      age: 2,
      favoriteFoods: ["lait", "oeuf"],
    },
    {
      name: "mariem",
      age: 20,
      favoriteFoods: ["spaguetti", "salade"],
    },
    {
      name: "aymen",
      age: 27,
      favoriteFoods: ["kouskous", "daurade"],
    }]

    person.create(arrayOfPeople)
          .then((doc) => {
            console.log(doc);
          })
          .catch((err) => {
            console.log(err);
          }); 
          
// Find all the people having a given name
         person.find({name:"mariem"})
          .then ((doc)=>{console.log(doc)})
          .catch((err) => {
            console.log(err);
          }); 
       

          // Return a Single Matching Document from Your Database
    
           person.findOne({favoriteFoods:"salade"})
          .then ((doc)=>{console.log(doc)})
          .catch((err) => {
            console.log(err);
          });  

          
          

     //Search Your Database By _id

          person.findById({_id: "609f23fe1339b02fa42157dd"})
          .then ((doc)=>{console.log(doc)})
          .catch((err) => {
            console.log(err);
          });  

  // Perform Classic Updates by Running Find, Edit, then Save
      
           person.findByIdAndUpdate({ _id: "609f23fe1339b02fa42157dc"}, {$addToSet:{favoriteFoods:  "hamburger"}}, {new:true},  (err, person)=>{
                 person.save()
            .then((person)=>{console.log(person)})
          .catch((err) => {
            console.log(err);
          });
        })  


//Perform New Updates on a Document Using model.findOneAndUpdate()
      
        person.findOneAndUpdate({ name: "adem"}, {$set:{age:4}}, {new:true}, (err, doc) => {
          if (err) {console.log("error")}
          console.log(doc);
      });  
         
      
     //Delete One Document Using model.findByIdAndRemove
 
         person.findByIdAndRemove({ _id: "60a18dc317f2e52ee4a95724"}, function (err, docs) {
          if (err){
              console.log(err)
          }
          else{
              console.log("User is being removed : ", docs);
          }
      }); 
  
//MongoDB and Mongoose - Delete Many Documents with model.remove()

 person.remove({age:{$lt:28}}, function (err, docs) {
          if (err){
              console.log(err)
          }
          else{
              console.log(docs);
          }
      }); 

  //Chain Search Query Helpers to Narrow Search Results    
 
   person.find({favoriteFoods: {$all:["pizza"]}})
  .limit(2)
  .sort({name:'asc'})
  .select('name')
  .exec()
  .then(docs => {
          console.log(docs)
        })
       .catch(err => {
          console.error(err)
        }) 
app.listen(5000,()=>{
    console.log("conected...")
})