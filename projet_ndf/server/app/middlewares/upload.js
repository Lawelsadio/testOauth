const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/');
    },
    filename: function (req, file, cb) {
       // console.log(file);
        cb(null, 'ndf' + '-' + Date.now() + path.extname(file.originalname));
       
    }
    
});

const fileFilter = (req, file, cb) => {
    //console.log(file);
    cb(null, true);
};

let upload = multer({
    storage: storage,

    fileFilter: fileFilter,
});

module.exports = upload.single('factureImage')