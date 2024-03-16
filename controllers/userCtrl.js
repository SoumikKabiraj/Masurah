const userModel =require ('../models/userModels')
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const doctorModel =require('../models/doctorModel')
const appointmentModel =require('../models/appointmentModel')
const moment =require('moment')
const pescriptionModel = require('../models/pescriptionModel')
const inventoryModel= require('../models/inventoryModel')
const cartModel =  require('../models/cartModel')
const salesModel = require('../models/salesModel')
const  orderNumberModel = require('../models/orderNumberModel')


const registerController = async (req, res) => {
    try {
        const exisitingUser = await userModel.findOne({ email: req.body.email });
        if (exisitingUser) {
        return res.status(200).send({ message: "User Already Exists", success: false });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({ message: "Registered Sucessfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: `Error in Register Controller ${error.message}`,
        });
    }
};


const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
          return res.status(200).send({ message: "User not found", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
        return res.status(200).send({ message: "Wrong Email or Password", success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: "1d",});
        res.status(200).send({ message: "Login Successful", success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
    }
};


const authController = async(req,res)=>{
    try{
        const user = await userModel.findById({_id:req.body.userId})
        if(!user){
            return res.status(200).send({
                message:'user not found',
                success: false
            })
        }else{
            res.status(200).send({
                success:true,
                data:user
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            message:'Authentication Error userCtr;',
            success: false,
            error
        })
    }
}

const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Applying For Doctotr",
    });
  }
};

const getAllNotificationController=async(req,res)=>{
    try{
        const user = await userModel.findOne({ _id: req.body.userId });
        const seennotification = user.seennotification;
        const notification = user.notification;
        seennotification.push(...notification);
        user.notification = [];
        user.seennotification = notification;
        const updatedUser = await user.save();
        res.status(200).send({
            success: true,
            message: "all notification marked as read",
            data: updatedUser,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            message: 'Error in Notification',
            success: false,
        })
    }
};


const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
};


const getAllDoctorsController= async(req,res)=>{
  try{
    const doctor = await doctorModel.find()
    res.status(200).send({
      success: true,
      message: "Doctor list received",
      data: doctor
    })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to get Doctor Info error in getAllDoctorsController",
      error
    })
  }
};

const getApprovedDoctorsController= async(req,res)=>{
  try{
    const doctor = await doctorModel.find({status:'approved'})
    res.status(200).send({
      success: true,
      message: "Doctor list received",
      data: doctor
    })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to get Doctor Info error in getAllDoctorsController",
      error
    })
  }
};


const bookAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New-appointment-request",
      message: `A new Appointment Request by ${req.body.userInfo.name}`,
      onCLickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Book succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};



// booking bookingAvailabilityController
const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm").subtract(1, "hours").toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not Availibale at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
};


// get all the appointments posted
const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({userId: req.body.userId,});
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};


//get user by Id controller
const getUserByIdController = async (req, res) => {
  try {
    const doctor = await userModel.findOne({ _id: req.body.userId });
    
    res.status(200).send({
      success: true,
      message: "User Info Fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in fetching getUseryIdController Failed",
    });
  }
};

//get pescription by user Id controller
const getPescriptionByIdController = async (req, res) => {
  try {
    // console.log(req.body.userId)
    const doctor = await pescriptionModel.find({patientId: req.body.userId });
    
    res.status(200).send({
      success: true,
      message: "Pescription Info Fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in fetching getPescriptionByIdController Failed",
    });
  }
};

const addToCartController = async (req,res)=>{
  try {
    // console.log(req.body)
      if(req.body.soldQty>0)
      {
        await inventoryModel.findByIdAndUpdate(req.body._id,{
        item: req.body.item,
        category:req.body.category,
        description:req.body.description,
        qty:req.body.qty-req.body.soldQty,
        qtyType:req.body.qtyType,
        costPrice:req.body.costPrice,
        salesPrice:req.body.salesPrice
      })

      const user = await cartModel.findOne({ userId : req.body.userId });
      if (!user) {
        // console.log("not found"+req.body.userId)
          const newCart = new cartModel({userId: req.body.userId, items:[]});
          const addItem = newCart.items;
          addItem.push({
            item: req.body.item,
            category:req.body.category,
            description:req.body.description,
            qty:Number(req.body.soldQty),
            qtyType:req.body.qtyType,
            costPrice:req.body.costPrice,
            salesPrice: req.body.salesPrice,
            soldAt:Number(req.body.soldAt)
          })
          await newCart.save();
          res.status(201).send({ message: "Posting Successfil", success: true });
      }else{
        // console.log("found")
        const addItem = user.items;
        let flag=0;
        for(let i=0;i<addItem.length;i++){
          if(addItem[i].item===req.body.item)
          {
            flag=1;
            addItem[i].qty+=Number(req.body.soldQty);
          }
        }
        if(flag==0)
        {
          addItem.push({
            item: req.body.item,
            category:req.body.category,
            description:req.body.description,
            qty:Number(req.body.soldQty),
            qtyType:req.body.qtyType,
            costPrice:req.body.costPrice,
            salesPrice: req.body.salesPrice,
            soldAt:Number(req.body.soldAt)
          })
        }
        user.items=addItem;
        // console.log(user.items)
        await cartModel.findByIdAndUpdate(user._id,user)
        await user.save();
        res.status(201).send({ message: "Posting Successfil", success: true });
      }
    }else{
        res.status(500).send({success: false, message: `Error as quantity below 0`,
      });
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, message: `Error in adding to cart ${error.message}`,
    });
  }
};


//get items in a cart

const getCartItems= async(req,res)=>{
  try{
    // console.log(req.body.category)
    const Cart = await cartModel.find({userId: req.body.userId})
    res.status(200).send({
      success: true,
      message: "Cart items",
      data: Cart
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

//post Sales
const postSalesController= async(req,res)=>{
  try {
      if(req.body.items.length>0)
      {
        const newCat = new salesModel(req.body);
        await newCat.save();
        res.status(201).send({ message: "Posting Successfil", success: true });
      }
      else{
        res.status(200).send({success: false, message: `Cart Is Empty`});
      }
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: `Error in posting Med data ${error.message}`,
        });
    }
}


//clear cart
const clearCartController  = async (req, res) => {
    try {
      // console.log(req.body)
      await cartModel.findByIdAndUpdate(req.body._id,{
        userId:req.body.userId,
        items: []
    })
        // await newCat.save();
        res.status(201).send({ message: "Posting Successfil", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: `Error in Clearing cart data ${error.message}`,
        });
    }
};


const getSaleDateWise = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const query = { 
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      // Add any other criteria as needed
    };

    const salesData = await salesModel.find(query);

    res.status(200).json({ success: true, data: salesData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
/// One time use controller
const createNewOrderNumber = async (req, res) => {
  try {
    // Assuming you have a mongoose model named `NewOrderNumber`
    const newOrderNumber = new  orderNumberModel(req.body);
    await newOrderNumber.save();
    res.status(201).send({ message: "Posting Successful", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in posting new Order ${error.message}`,
    });
  }
};

const getOrderNumber = async (req, res) => {
  try{
        const out = await orderNumberModel.findById({_id:'65945e75ebc4d92010372b8a'})
        if(!out){
            return res.status(200).send({
                message:'Error getting Order Number',
                success: false
            })
        }else{
            res.status(200).send({
                success:true,
                data:out
            })
        }
    }catch(error){
        // console.log(error)
        res.status(500).send({
            message:'error while getting Order Number;',
            success: false,
            error
        })
    }
};
//Update Order Number
const updateOrderNumber  = async (req, res) => {
    try {
      // console.log(req.body)
      const data=await orderNumberModel.findById('65945e75ebc4d92010372b8a');
      await orderNumberModel.findByIdAndUpdate('65945e75ebc4d92010372b8a',{
        orderNumber: data.orderNumber+1
    })
        res.status(201).send({ message: "Posting Successfil", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: `Error in updating order Number ${error.message}`,
        });
    }
};


// Delete From item Cart
const DeleteFromCart = async(req,res)=>{
  try{
    // console.log(req.body.category)
    var Cart = await cartModel.find({userId: req.body.userId});
    var update= Cart[0].items;
    // console.log(update)
    Cart[0].items=  [...update.slice(0, req.body.itemNo), ...update.slice(req.body.itemNo + 1)] ;
    await cartModel.findOneAndUpdate({userId: req.body.userId},Cart[0]);
    const val = (await inventoryModel.find({ item: update[req.body.itemNo].item}).lean())[0];
    // console.log(val[0])
    const inventoryUpdated= await inventoryModel.findOneAndUpdate({item: update[req.body.itemNo].item},{
        item: val.item,
        category:val.category,
        description:val.description,
        qty:val.qty+ update[req.body.itemNo].qty,
        qtyType:val.qtyType,
        costPrice:val.costPrice,
        salesPrice:val.salesPrice
      })

    res.status(200).send({
      success: true,
      message: "Cart items Updated",
      data: val
    })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to get info error in DeleteFromCart",
      error
    })
  }
};


module.exports ={loginController, registerController, authController, applyDoctorController,getAllNotificationController,deleteAllNotificationController,getAllDoctorsController,bookAppointmentController,bookingAvailabilityController,userAppointmentsController,  getUserByIdController, getApprovedDoctorsController, getPescriptionByIdController,addToCartController,getCartItems,postSalesController,clearCartController,getSaleDateWise,createNewOrderNumber, getOrderNumber, updateOrderNumber, DeleteFromCart }