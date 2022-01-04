const express = require("express");
const router = express.Router();
const multer = require('multer');
const {AuthenticateUser}  = require('../authorization');
const productController = require('../controller/productController');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({storage: storage, limits: {
    fileSize: 1024*1024*10
},
fileFilter: fileFilter});


router.get('/', productController.getAllProducts);

router.post('/', AuthenticateUser, upload.single('productImage'), productController.createproduct);

router.get('/:productId', productController.getProductById);

router.put('/:productId',AuthenticateUser, productController.updateProduct);

router.delete('/:productId',AuthenticateUser, productController.deleteProduct);

module.exports = router;