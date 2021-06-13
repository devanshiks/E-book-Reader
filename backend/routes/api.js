const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var multer = require('multer');
var Book = require('../models/books');


const router = express.Router()

const User = require('../models/user');


router.get('/', (req,res) => {
    res.send('From API route')
})

router.post('/register', (req, res) => {
    /*let userData = req.body*/
    var user = new User({
        name: req.body.name,
        password: User.hashPassword(req.body.password),
        email: req.body.email,  
    })
    user.save((error, registeredUser) => {
        if(error)
        {
            console.log(error)
        }
        else
        {
            let payload = {subject: registeredUser._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req, res ) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, User) => {
        if(error){
            console.log(error)
        }else {
            if(!User){
                res.json({
                    msg: "Invalid Email "
                })
            } 
            else {
                bcrypt.compare(userData.password, User.password).then(match => {
                    if (match)
                    {
                        let payload = {subject: User._id}
                        let token = jwt.sign(payload, 'secretKey')
                        //res.status(200).send({token})
                        res.status(200).json({
                            token: token,
                            msg: "Login successfull",
                        })
                    } else {
                        res.json({
                            msg: "Incorrect Password"
                        })
                    }
                })
            }
        
        }
    })
})

var storage = multer.diskStorage({

    destination: (req, file, callBack) => {
        callBack(null, 'C:\\Users\\DEVANSHI\\desktop\\Demo\\frontend\\src\\assets\\uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }

})
var upload = multer({ storage: storage })

// addbook data
router.post("/addbook",upload.single('file'), (req, res, next) => {
    var file = req.file
    var book = new Book({
        title: req.body.booktitle,
        author: req.body.bookauthor,
        category: req.body.bookgenre,
        desc:req.body.bookdescription,
        aboutauthor:req.body.bookaboutauthor,
        imgpath: file.filename,
    })
    try {
        doc = book.save();

        return res.status(201).json(doc);
    }
    catch (err) {
        return res.status(501).json(err);
    }
    /*console.log(req.body)
    res.send('all okay!')*/
})

router.post('/addbookfile', upload.single('file'), (req, res ) => {
    var file = req.file

    Book.findOne({title: req.body.booktitle}, (error, User) => {
        if(error){
            console.log(error)
        }else {
            if(!Book){
                res.json({
                    msg: "Invalid Title "
                })
            } 
            else {
                console.log("Name exists")
                Book.updateOne({ title: req.body.booktitle}, {
                    bookpath: file.filename,
                }, function (err, Book) {
                    console.log(1);
                    if (err) {
                        console.log(err)
                        res.status(500).json({ errmsg: err })
                    }
                    else {
                        console.log("edited profile");
                        return res.status(201).json(Book);
                    }
                })
            }
        }
    })
})
   


router.get('/getallbooks',  (req, res, next) => {
    Book.find({}, (err, books) => {
        if (err) {
            res.status(500).json({ errmsg: err })
        }
        res.status(200).json({ msg: books })
    })
})

/*function getTime() {
    var today = new Date().toLocaleDateString()
    today = today.toString().replace('/', '-')
    today = today.replace('/', '-')
    // console.log(today)

    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    // console.log(h);
    // console.log(m);
    // console.log(s);

    today += '-' + h + '-' + m + '-' + s
    // console.log(today);
    return today;
}*/

module.exports = router