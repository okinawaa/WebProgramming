const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minLength: 5,
    },
    lastname: {
        type: String,
        maxLength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    }
})

userSchema.pre('save', function(next) {
    let user = this;
    // 비밀번호를 암호화 시킨다.
    if (user.isModified('password')) {

        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next()
            })
        })
    }else{
        next();
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //plainePassword 1234567    암호화된 비밀번호 $2b$10$j1u3yVKocqYLJ54VA.uiseRSVXaDaTnp0390wpYw3cR384MennzCS
    bcrypt.compare(plainPassword, this.password, function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })
}
userSchema.methods.generateToken = function(cb){
    //jsonwebtoken 을 이용해서 token 을 생성하기
    const user = this;

    const token = jwt.sign(user._id.toHexString() , 'secretToken');
    user.token = token;
    user.save((err,user)=>{
        if(err) return cb(err);
        cb(null,user)
    })
}

userSchema.statics.findByToken = function(token,cb){
    const user = this;
    // 토큰을 decode 한다.
    jwt.verify(token,'secretToken', (err,decoded)=>{
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token 과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id":decoded,"token":token}, (err,user)=>{
            if(err) return cb(err);
            cb(null,user)
        })
    })
}
const User = mongoose.model('User', userSchema)

module.exports = {User}