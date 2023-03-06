const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
    rs:{
        type: String,
        require: [true, 'please enter the rs'],
        lowercase: true
    },
    tele:{
        type: String,
        require: [true, 'please enter your number phone']
    },
    address:{
        type: String,
        require: [true, 'please enter your Adress'],
        lowercase: true
    },
    ice:{
        type: String,
        require: [true, 'please enter your ice']
    },
    manadger:{
        type: String,
        require: [true, 'please enter your manadger name']
    },
    password:{
        type: String,
        require: [true, 'please enter your password']
    },

},{
    timestamps: true,
}
)

module.exports = mongoose.model('Company', companySchema)