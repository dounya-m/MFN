const Company = require('../models/company')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');

exports.getAll = async(req,res) => {
    try{
        const company = await Company.find();
        res.status(200).json(
          company
        )
    }catch(error){
        next(error)
    }
}

exports.create = async (req, res) => { 
    try {
        const { rs, tele, address, ice,lat, log, password } = req.body;
        if (!rs || !tele || !address || !ice ||!lat ||!log || !password) {
          res.status(400).json({ message: req.body });
        }else{
        const company = await Company.create({
          rs,
          tele,
          address,
          ice,
          lat,
          log,
          password,
        });
        await company.save()
        res.status(201).json(company);
        console.log('company.password:', company.password);
        }
      
      } catch (err) {
        console.log(err); // pass the error to the error handling middleware
      }
  };
    