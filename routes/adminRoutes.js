const express = require('express')
const authMiddleware =require("../middlewares/authMiddleware")
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController, toggleController,postCategoryController, getAllCategoryController, postItemController, getCatItem, getItemId, updatItemController, getAllItemsController } = require('../controllers/adminCtrl')

const router = express.Router()

router.get('/getAllUsers',authMiddleware,getAllUsersController)
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)
router.post('/changeAccountStatus',authMiddleware,changeAccountStatusController)
router.post('/toggleUser',authMiddleware,toggleController)
router.post('/PostCategory',authMiddleware,postCategoryController)
router.get('/getAllCategory',authMiddleware,getAllCategoryController)
router.post('/PostItem',authMiddleware,postItemController)
router.post('/getItemsCatWise',authMiddleware,getCatItem)
router.post('/getItemIdWise',authMiddleware,getItemId)
router.post('/UpdateItem',authMiddleware,updatItemController)
router.get('/getAllItems',authMiddleware,getAllItemsController)

module.exports=router