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
exports.create = async(req,res) => {
    try{
            const { rs, tele, address, ice, manadger, password } = req.body;
            if (!rs || !tele || !address || !ice || !manadger || !password) {
                res.status(400).json({ message: 'Missing required fields' });
            }
            const company = await Company.create({
                rs,
                tele,
                address,
                ice,
                manadger,
                password
            });
            const salt = await bcrypt.genSalt(10)
            company.password = await bcrypt.hash(company.password, salt)
            await company.save();
            res.status(201).json({
            success: true,
            data: company,
            });
            
        
    }catch(err){
        console.log(err);
        res.status(400).json({message: "Server error"})
    }
}