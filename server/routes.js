const productController = require('./controller/product-controller');
const userController = require('./controller/user-controller');
const adminauth = require('./middleware/adminauth')
const router = require('express').Router();
const auth = require('./middleware/auth')

router.get('/product/:id',productController.getProductDetails)
router.get('/api/products',productController.getAllProducts)
router.post('/api/product',auth,adminauth,productController.createProducts)
router.put('/api/updateproduct/:id',productController.updateProduct)
router.delete('/api/products/:id',productController.deleteProduct)

//user route
router.post('/api/register',userController.registerUser)
router.post('/api/login',userController.loginUser)
router.post('/api/password/reset',userController.forgotPassword)
router.get('/api/me',auth,userController.getUserDetails)
router.put('/api/password/update',auth,userController.updatePassword)
router.put('/api/update/profile',auth,userController.updateProfile)
router.get('/api/logout',userController.logout)
//admin user route
router.get('/api/alluser',auth,userController.getAllUser);
router.get('/api/singleuser',auth,userController.getSingleUser)
router.put('/api/update/userole',auth,userController.updateUserRole)


//making order api



module.exports = router