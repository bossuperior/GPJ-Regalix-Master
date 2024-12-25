const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, 'REGALIX-' + uniqueSuffix + file.originalname)
    }
})

// exports.upload = multer({ storage: storage }).single('file')
exports.upload = multer({ storage: storage }).fields([
    { name: 'file', maxCount: 1 },
    { name: 'file2', maxCount: 1 }
]);