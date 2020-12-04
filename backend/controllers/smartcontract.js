const User = require('../models/user');
const Contract = require('../models/smartcontract');
const Post = require('../models/post');


exports.inititatecontract = (req,res) =>
{
  console.log('inititatecontract');
  const url = req.protocol + '://' + req.get("host");
   const temp =null;
  const contract = new Contract(
    {
      SellerName   : req.body.SellerName ,
      SellerCNIC    : req.body.SellerCNIC ,
      SellerPK    : "tobefilled" ,
      BuyerName    : req.body.BuyerName ,
      BuyerCNIC    : req.body.BuyerCNIC ,
      BuyerPK    : req.body.BuyerPK ,
      make    : req.body.make ,
      model    : req.body.model ,
      registrationnumber    : req.body.registrationnumber ,
      registrationcity    : req.body.registrationcity ,
      exteriorcolor    : req.body.exteriorcolor ,
      price    : req.body.price ,
      enginetype    : req.body.enginetype ,
      enginecapacity    : req.body.enginecapacity ,
      transmission    : req.body.transmission ,
      assembly    : req.body.assembly ,
      //features    : req.body.features ,
      imagePath: url+"/images/" + req.file.filename
    });
    contract.save().then(result =>
      {
        console.log("sucess");
        res.status(201).json({
          message: "contract created sucesfully",
          result: result
        });
      })
        .catch(error => {
          console.log("eror"+error)
          res.status(500).json({
              message: "Error creating Contract!",
              result: error
          });
        });

}


exports.getallsellercontracts =(req,res) =>
{
  Contract.find({SellerCNIC:req.params.cnicNumber}).then(result =>
    {
      if(result)
      {
        res.status(200).send(result);
      }
      else
      {
        res.status(404).json({message:"No Contracts available"})
      }
    }).catch(err =>
      {
        console.log(err);
        res.status(500).send(err.message);
      });
}

exports.getallbuyercontracts =(req,res) =>
{
  Contract.find({BuyerCNIC:req.params.cnicNumber}).then(result =>
    {
      if(result)
      {
        res.status(200).send(result);
      }
      else
      {
        res.status(404).json({message:"No Contracts available"})
      }
    }).catch(err =>
      {
        console.log(err);
        res.status(500).send(err.message);
    });
}

exports.getcontractdetails =(req,res) =>
{
  Contract.findOne({_id: req.params.contractid}).then(result =>
    {
      if(result)
      {
        res.status(200).send(result);
      }
      else
      {
        res.status(404).json({message:"No Contracts available"})
      }
    }).catch(err =>
      {
        console.log(err);
        res.status(500).send(err.message);
    });
}
