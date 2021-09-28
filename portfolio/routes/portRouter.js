const router = require('express').Router();
const portCtrl = require("../controllers/portCtrl");

router.route('/')
    .get(portCtrl.getPortfolios)
router.route('/contents')
    .post(portCtrl.getPortfolioContents)
router.route('/images')
    .post(portCtrl.getPortfolioImages)
module.exports = router;
