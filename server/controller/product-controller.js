const Product = require('../models/ProductModels')
const ApiFeatures = require('../utils/apifeatures')
class productController {
  //create  product admin
    async createProducts(req,res,next) {
        req.body.user = req.user.id
        const product = await Product.create(req.body);
        res.status(201).json({success:true,product})
    }

//getAllProducts
    async getAllProducts(req,res) {
                const resultPerPage = 5;
                const productCount = await Product.countDocuments();
                const apifeature =  new ApiFeatures(Product.find(),req.query).search().filter()

              //  let filteredProductsCount = products.length;

              let products = await apifeature.query;
                apifeature.pagination(resultPerPage);

           
              
               
                res.status(200).json({success:true,products,productCount,resultPerPage})
        }

//update product

     async updateProduct(req,res,next) {
          let product = Product.findById(req.params.id);

          if(!product) {
              return res.status(500).json({success:false,message:"product not found"})
          }

          product = await Product.findByIdAndUpdate(req.params.id,req.body,{
              new:true,
              runValidators:true,
              useFindAndModify:false
          });

          res.status(200).json({success:true,product})
     }

//delete product 
     async deleteProduct(req,res,next) {
         const product = await Product.findById(req.params.id);
          if(!product){
              return res.status(500).json({success:false,message:"product not found"})
          }

          await product.remove();
     }


// Get Product Details
async getProductDetails(req, res, next)  {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return res.json("kopal  kharap tmr");
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  };     

}

module.exports = new productController();