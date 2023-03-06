const Company = require('../models/company')
const asyncHandler = require('express-async-handler')

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