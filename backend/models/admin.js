const { createPrivateKey } = require('crypto');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const adminSchema = mongoose.Schema({
  fullName: { type:String, required:true },
  email: { type:String, required: true, unique: true },
  password: { type:String, required:true },
  phoneNumber: { type:Number, required:true },
  fullAddress: { type:String, required:true },
  cnicNumber: { type:Number, required:true },
  dob: { type:Date, required:true },
  genderStatus: { type:String, required:true},
  accountStatus: { type:String, required:true },
  authorizedStatus: {type:Boolean,required:true},
  privateKey: {type:String, required:true}
});

adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Admin',adminSchema);
