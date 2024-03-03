const doctorModel =require('../models/doctorModel')
const userModel =require('../models/userModels')
const categoryModel =require('../models/categoryModel')
const inventoryModel = require('../models/inventoryModel')

const getAllUsersController = async(req,res)=>{
    try{
        const user=await userModel.find({})
        res.status(200).send({
            success:true,
            message:"users data",
            data:user
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in adminCtrl while fetching user data',
            error
        })
    }
}



const getAllDoctorsController = async(req,res)=>{
    try{
        const doc=await doctorModel.find({})
        res.status(200).send({
            success:true,
            message:"doctor data",
            data:doc
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in adminCtrl while getting doctor data',
            error
        })
    }
}



const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Account Status",
      error,
    });
  }
};

//Masura// toggle user status

const toggleController = async (req, res) => {
  try {
    console.log(req.body);
    const { guyId,status,userid } = req.body;
    // const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    // const user = await userModel.findByIdAndUpdate(guyId, { status });
    console.log(guyId);
    const user = await userModel.findOne({ _id: guyId });
    const notification = user.notification;
    notification.push({
      type: "Account authorization undated",
      message: `Your account authorization has been changed ${status?"access graned":"access denied"} `,
      onClickPath: "/notification",
    });
    user.hasAccess = status ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in toggle contoroller",
      error,
    });
  }
};


// Category Controllers
const postCategoryController  = async (req, res) => {
    try {
        const newCat = new categoryModel(req.body);
        await newCat.save();
        res.status(201).send({ message: "Posting Successfil", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: `Error in posting Med data ${error.message}`,
        });
    }
};
const getAllCategoryController  = async (req, res) => {
    try{
        const doc=await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"All Categories Fetched",
            data:doc
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in adminCtrl while getting Ctegory data',
            error
        })
    }
};
//Item Controller
const postItemController  = async (req, res) => {
    try {
        const newCat = new inventoryModel(req.body);
        await newCat.save();
        res.status(201).send({ message: "Posting Successfil", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: `Error in posting Med data ${error.message}`,
        });
    }
};

const updatItemController  = async (req, res) => {
    try {
      // console.log(req.body)
      await inventoryModel.findByIdAndUpdate(req.body._id,{
      item: req.body.values.item,
      category:req.body.values.category,
      description:req.body.values.description,
      qty:req.body.values.qty,
      qtyType:req.body.values.qtyType,
      costPrice:req.body.values.costPrice,
      salesPrice:req.body.values.salesPrice
    })
        // await newCat.save();
        res.status(201).send({ message: "Posting Successfil", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: `Error in posting Med data ${error.message}`,
        });
    }
};



//Item Controller depending on category
const getCatItem= async(req,res)=>{
  try{
    // console.log(req.body.category)
    var Inventory;
    if(req.body.category!="NA")
      inventory = await inventoryModel.find({
      $or: [
        { category: { $exists: false } },
        { category: null }
      ]
    })
    else
      inventory = await inventoryModel.find({ category: { $exists: false } })
    res.status(200).send({
      success: true,
      message: "Inventory items",
      data: inventory
    })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to get info error in getCatItem",
      error
    })
  }
};

const getItemId= async(req,res)=>{
  try{
    // console.log(req.body.category)
    // console.log(req.body._id);
    const inventory = await inventoryModel.findById({_id:req.body._id})
    res.status(200).send({
      success: true,
      message: "Inventory items",
      data: inventory
    })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to get info error in getCatItem",
      error
    })
  }
};

//Get all Items present

const getAllItemsController= async(req,res)=>{
  try{
    const item = await inventoryModel.find()
    res.status(200).send({
      success: true,
      message: "Item List recieved",
      data: item
    })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to get Item ",
      error
    })
  }
};

//deletefromcart
//getorderNumber
//postOrderNumber



module.exports={getAllDoctorsController,getAllUsersController,changeAccountStatusController,toggleController,postCategoryController,getAllCategoryController,postItemController,getCatItem,getItemId,updatItemController,getAllItemsController}