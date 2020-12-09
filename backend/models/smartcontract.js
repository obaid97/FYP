const mongoose = require('mongoose');

const smartContractSchema = mongoose.Schema
({


  /*

   SellerName:string;
  SellerCNIC: string;
  SellerPK: string;

  BuyerName:string;
  BuyerCNIC: string;
  BuyerPK: string;

  id: string;


  make:string;
  model:string;
  registrationcity:string;
  mileage:string;
  exteriorcolor: string;

  //price
  price: string;

  //images
  imagePath: string;

  //additional information
  enginetype:string;
  enginecapacity:string;
  transmission:string;
  assembly:string;
  features:string;
  */

 SellerName   : { type:String, required:true},
 SellerCNIC    : { type:String, required:true},
 SellerPK    : { type:String, required:true},
 BuyerName    : { type:String, required:true},
 BuyerCNIC    : { type:String, required:true},
 BuyerPK    : { type:String, required:true},
 make    : { type:String, required:true},
 model    : { type:String, required:true},
 registrationnumber:{ type:String, required:true},
 registrationcity    : { type:String, required:true},
 exteriorcolor    : { type:String, required:true},
 price    : { type:String, required:true},
 enginetype    : { type:String, required:true},
 enginecapacity    : { type:String, required:true},
 transmission    : { type:String, required:true},
 assembly    : { type:String, required:true},
 features    : { type:String, required:true},
 imagePath : { type:String, required:true }
});


module.exports = mongoose.model('smartContract',smartContractSchema);
