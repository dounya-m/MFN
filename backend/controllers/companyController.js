const Company = require('../models/company')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');

exports.getAll = async(req,res) => {
    try{
        const company = await Company.find();
        res.status(200).json({
            success: true,
            couns: company.length,
            date: company
        })
    }catch(error){
        next(error)
    }
}

exports.create = async (req, res, next) => { // add the "next" parameter
    try {
      const { rs, tele, address, ice, manadger, password } = req.body;
      if (!rs || !tele || !address || !ice || !manadger || !password) {
        res.status(400).json({ message: 'Missing required fields' });
      }
    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(password, salt);
      const company = await Company.create({
        rs,
        tele,
        address,
        ice,
        manadger,
        password, // store the hashed password in the database
      });
      res.status(201).json({
        success: true,
        data: company,
      });
      console.log('company.password:', company.password);
    //   console.log(company);
    } catch (err) {
      console.log(err);
      next(err); // pass the error to the error handling middleware
    }
  };
    