const productCtrl = require("../controllers/productCtrl");
router = require('express').Router();


router.route('/products')
    .get(productCtrl.getProducts)
    .post(productCtrl.createProduct)


router.route('/products/:id')
    .delete(productCtrl.deleteProduct)
    .put(productCtrl.updateProduct)


module.exports = router;
