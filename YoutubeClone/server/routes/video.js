const { Video } = require("../models/Video");

const express = require('express');
const router = express.Router();
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post("/uploadfiles", (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

});

router.post("/thumbnail", (req, res) => {


    let filePath = ""
    let fileDuration = ""


    ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
        console.dir(metadata); // all metadata
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration
    });


    ffmpeg(req.body.filePath)
        .on('filenames', function (filenames) {
            filePath = "uploads/thumbnails/" + filenames[0]
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, filePath: filePath, fileDuration: fileDuration });
        })
        .on('error', function (err) {
            console.error(err);
            return res.json({ success: false, err });
        })
        .screenshots({
            // Will take screenshots at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',
            //'%b': input basename (filename w/o extension)
            filename: 'thumbnail-%b.png'
        })
});

router.post('/uploadVideo',(req,res)=>{
    //비디오 정보들을 저장한다.
    const video = new Video(req.body)
    video.save((err, doc)=> {
        if(err) return res.json({success:false,err})
        res.status(200).json({success:true})
    })
    }
)

router.get('/getVideos',(req,res)=>{

    //비디오를 DB 에서 가져와서 클라이언트에 보낸다

    Video.find()
        .populate('writer')
        .exec((err,videos)=>{
            if(err) return res.status(400).send(err);
            res.status(200).json({success:true, videos})

        })
})


router.post('/getVideoDetail', (req, res) => {
    console.log(req.body.videoId)
    Video.findOne({"_id":req.body.videoId})
        .populate('writer')
        .exec((err, videoDetail)=>{
            if(err) return res.status(400).send(err);
            return res.status(200).json({success:true , videoDetail})
        })
})


module.exports = router;