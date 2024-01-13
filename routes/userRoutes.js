const express =require('express')
const { loginController, registerController, authController ,applyDoctorController,getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController, getUserByIdController, getApprovedDoctorsController, getPescriptionByIdController, addToCartController, getCartItems, postSalesController, clearCartController, getSaleDateWise, createNewOrderNumber, getOrderNumber, updateOrderNumber, DeleteFromCart } = require('../controllers/userCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

const router=express.Router()

//routes

//login
router.post('/login',loginController)
//register
router.post('/register',registerController)
//Authentication
router.post('/getUserData',authMiddleware, authController )
//ApplyDoctor
router.post('/apply-doctor',authMiddleware, applyDoctorController )
//NotificationDoctor
router.post('/get-all-notification',authMiddleware, getAllNotificationController )
//delete all notif
router.post('/delete-all-notification',authMiddleware, deleteAllNotificationController )
//get all doctor
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)
//get all approved Doctors
router.get('/getApprovedDoctors',authMiddleware,getApprovedDoctorsController)
//book an appointment
router.post('/book-appointment',authMiddleware,bookAppointmentController)
//booking availability
router.post('/booking-availability',authMiddleware,bookingAvailabilityController)
//get all the appointments posted
router.get('/user-appointments',authMiddleware,userAppointmentsController)
//get user
router.get('/profile',authMiddleware,getUserByIdController)
//get pescription info
router.get('/getpescription',authMiddleware,getPescriptionByIdController)
//Add to Cart
router.post('/addToCart',authMiddleware,addToCartController)
//get items in a cart
router.post('/getCart',authMiddleware,getCartItems)
//posting sales
router.post('/PostSale',authMiddleware,postSalesController);
//Clearing Cart
router.post('/clearCart',authMiddleware,clearCartController);
//admin...all orders
router.post('/sales',authMiddleware,getSaleDateWise);
// temporary creation of new order Number
router.post('/newOrderNumber',authMiddleware,createNewOrderNumber);
// get order Number
router.get('/getOrderNumber',authMiddleware,getOrderNumber);
// update order number
router.post('/updateOrderNumber',authMiddleware,updateOrderNumber)
// delete item from Cart
router.post('/DeleteFromCart',authMiddleware,DeleteFromCart)

module.exports =router;