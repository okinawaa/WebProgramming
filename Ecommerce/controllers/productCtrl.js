const Product = require('../models/productModel');

// Filter, sorting and paginating

class APIfeatures{
    query;
    queryString;
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        // console.log(this.query)
        const queryObj = {...this.queryString} // queryString = req.query
        const excludedFields = ['page','sort','limit'];
        excludedFields.forEach(el=>delete(queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match=> '$' +match)

        this.query.find(JSON.parse(queryStr))
        return this;
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt');
        }
        return this
    }

    pagination(){
        const page = this.queryString.page *1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
        return this;

    }
}


const productCtrl = {

    getProducts: async (req, res) => {
        try {

            const features = new APIfeatures(Product.find(),req.query).filtering().sorting().pagination()
            const products = await features.query;

            res.json({
                status:'success',
                result:products.length,
                products:products
            });
        } catch (err) {
            return res.status(400).json({msg: err.message})
        }
    },
    createProduct: async (req, res) => {
        try {
            const {product_id, title, price, description, content, images, category} = req.body;
            if (!images) return res.status(400).json({msg: "No Image upload"})

            const product = await Product.findOne({product_id})
            if (product) {
                return res.status(400).json({msg: "This product already exists"})
            }

            const newProduct = new Product({
                product_id, title: title.toLowerCase(), price, description, content, images, category
            })

            await newProduct.save()
            res.json({msg: "Created a product"})

        } catch (err) {
            return res.status(400).json({msg: `${err.message} , createError`})
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg: 'Deleted a product'})

        } catch (err) {
            return res.status(400).json({msg: err.message})
        }
    },
    updateProduct: async (req, res) => {
        try {
            const {product_id, title, price, description, content, images, category} = req.body;
            if (!images) return res.status(400).json({msg: "No Images"})

            await Product.findOneAndUpdate({_id:req.params.id},{
                title:title.toLowerCase(),
                price,
                description,
                content,
                images,
                category
            })
            res.json({msg:"Updated a Product"})

        } catch (err) {
            return res.status(400).json({msg: err.message})
        }
    },
}


module.exports = productCtrl