const express = require('express');
const {Payment} = require("../models/Payment");
const {Product} = require("../models/Product");
const router = express.Router();
const {User} = require("../models/User");

const {auth} = require("../middleware/auth");
const async = require('async')
//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({success: false, err});
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({loginSuccess: false, message: "Wrong password"});

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: "", tokenExp: ""}, (err, doc) => {
        if (err) return res.json({success: false, err});
        return res.status(200).send({
            success: true
        });
    });
});


router.post('/addToCart', auth, (req, res) => {

    // 먼저 User Collection 에 해당 유저의 정보를 가져오기

    User.findOne({_id: req.user._id},
        (err, userInfo) => {
            let duplicate = false;
            // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인
            userInfo.cart.forEach((item) => {
                if (item.id === req.body.productId) {
                    duplicate = true;
                }
            })

            // 상품이 이미 있을때
            if (duplicate) {
                User.findOneAndUpdate(
                    {_id: req.user._id, "cart.id": req.body.productId},
                    {$inc: {"cart.$.quantity": 1}},
                    {new: true},
                    (err, userInfo) => {
                        if (err) return res.status(400).json({success: false, err});
                        return res.status(200).send(userInfo.cart);
                    }
                )
                // 상품이 이미 있지 않을떄
            } else {
                User.findOneAndUpdate(
                    {_id: req.user._id},
                    {
                        $push: {
                            cart: {
                                id: req.body.productId,
                                quantity: 1,
                                date: Date.now(),
                            }
                        }
                    },
                    {new: true},
                    (err, userInfo) => {
                        if (err) return res.status(400).json({success: false, err});
                        return res.status(200).send(userInfo.cart);
                    }
                )
            }
        }
    )
})

router.get('/removeFromCart', auth, (req, res) => {

    // 먼저 cart안에 내가 지우려고 한 상품을 지워주기

    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            $pull: {
                cart: {
                    id: req.query.id
                }
            }
        },
        {new: true},
        (err, userInfo) => {
            let cart = userInfo.cart;
            // console.log("서버카트",cart)
            let array = cart.map(item => {
                return item.id
            })
            // console.log(array);

            Product.find({_id: {$in: array}})
                .populate('writer')
                .exec((err, productInfo) => {
                    return res.status(200).json({success: true, productInfo, cart})
                })
        }
    )

    // product collection 에서 현재 남아있는 상품들의 정보를 가져오기

})


router.post('/successBuy', auth, (req, res) => {

    // 1.User COllection history filed 안에 payment 아이디나 퀀티티~ 가격정보등을 넣어주기
    // 1. User collecftion 안에 history 필드 안에 간단한 결제 정보 넣어주기
    let history = [];
    let transactionData = {};

    req.body.cartDetail.forEach((item) => {
        history.push({
            dataOfPurchase: Date.now(),
            name: item.title,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID,
        })
    })


    // 2. Payment Collection 안에 자세한 결제 정보들 넣어주기
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    transactionData.data = req.body.paymentData
    transactionData.product = history

    //history 정보 저장
    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            $push: {history: history},
            $set: {cart: []}
        }, // 결제하고 카트비우기
        {new: true},
        (err, user) => {
            if (err) return res.status(400).json({success: false, err});

            // payment 에다가 transactionData 정보 저장

            const payment = new Payment(transactionData);
            payment.save((err, doc) => {
                if (err) return res.json({success: false, err});

                // 3. product collection 안에 있는 sold 필드 정보 업데이트 시켜주기


                // 상품 당 몇개의 quantity 를 샀는지

                let products = [];

                doc.product.forEach(item => {
                    products.push({id: item.id, quantity: item.quantity})
                })

                async.eachSeries(products, (item, callback) => {

                        Product.update(
                            {_id: item.id},
                            {
                                $inc: {
                                    "sold": item.quantity,
                                }
                            },
                            {new: false},
                            callback
                        )

                    }, (err) => {
                        if (err) return res.json({success: false, err})
                        res.status(200).json({
                            success: true,
                            cart: user.cart,
                            cartDetail: [],
                        })
                    }
                )


            })


        }
    )


})

module.exports = router;
