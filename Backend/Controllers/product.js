const Product = require('../Models/Product')
const fs = require('fs')

exports.read = async (req, res) => {
    try {
        // code
        const id = req.params.id
        const producted = await Product.findOne({ _id: id }).exec();
        res.send(producted)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.list = async (req, res) => {
    try {
        // code
        const producted = await Product.find({}).exec();
        res.send(producted)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}


exports.create = async (req, res) => {
    try {
        var data = req.body;

        if (req.files) {
            if (req.files.file) {
                data.file = req.files.file[0].filename;
            }

            if (req.files.file2) {
                data.file2 = req.files.file2[0].filename;
            }
        }

        if (data.tags && typeof data.tags === 'string') {
            data.tags = data.tags.split(',').map(tag => tag.trim());
        }

        const producted = await Product(data).save();
        res.send(producted);
    } catch (err) {
        // error
        console.log(err);
        res.status(500).send('Server Error');
    }
};


// exports.create = async (req, res) => {
//     try {
//         // code

//         var data = req.body
//         if (req.file) {
//             data.file = req.file.filename
//         }

//         const producted = await Product(data).save()
//         res.send(producted)
//     } catch (err) {
//         // error
//         console.log(err)
//         res.status(500).send('Server Error')
//     }
// }

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;
        if (req.files && req.files.file) {
            const uploadedFile = req.files.file[0].filename;
            newData.file = uploadedFile;
            if (newData.fileOld) {
                const oldFilePath = path.join(__dirname, '../public/uploads/', newData.fileOld);
                fs.unlink(oldFilePath, (err) => {
                    if (err) {
                        console.error("Error deleting old file (file):", err);
                    } else {
                        console.log("Old file (file) deleted successfully:", newData.fileOld);
                    }
                });
            }
        }
        if (req.files && req.files.file2) {
            const uploadedFile2 = req.files.file2[0].filename;
            newData.file2 = uploadedFile2;
            if (newData.file2Old) {
                const oldFilePath2 = path.join(__dirname, '../public/uploads/', newData.file2Old);
                fs.unlink(oldFilePath2, (err) => {
                    if (err) {
                        console.error("Error deleting old file (file2):", err);
                    } else {
                        console.log("Old file (file2) deleted successfully:", newData.file2Old);
                    }
                });
            }
        }
        if (newData.tags && typeof newData.tags === 'string') {
            newData.tags = newData.tags.split(',').map(tag => tag.trim());
        }
        const updated = await Product.findOneAndUpdate(
            { _id: id },
            newData,
            { new: true }
        ).exec();
        res.send(updated);
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).send("Server Error");
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const removed = await Product.findOneAndDelete({ _id: id }).exec();

        if (removed) {
            // Remove file1 if it exists
            if (removed.file) {
                await fs.unlink('../frontend/public/uploads/' + removed.file, (err) => {
                    if (err) {
                        console.log(`Error removing file1: ${err}`);
                    } else {
                        console.log('File1 removed successfully');
                    }
                });
            }

            // Remove file2 if it exists
            if (removed.file2) {
                await fs.unlink('../frontend/public/uploads/' + removed.file2, (err) => {
                    if (err) {
                        console.log(`Error removing file2: ${err}`);
                    } else {
                        console.log('File2 removed successfully');
                    }
                });
            }
        }

        res.send(removed);
    } catch (err) {
        console.log(`Server Error: ${err}`);
        res.status(500).send('Server Error');
    }
};



// exports.remove = async (req, res) => {
//     try {
//         // code
//         const id = req.params.id
//         const removed = await Product.findOneAndDelete({ _id: id }).exec()

//         if (removed?.file) {
//             await fs.unlink('../frontend/public/uploads/' + removed.file, (err) => {
//                 if (err) {
//                     console.log(err)
//                 } else {
//                     console.log('Remove success')
//                 }
//             })
//         }

//         res.send(removed)
//     } catch (err) {
//         // error
//         console.log(err)
//         res.status(500).send('Server Error')
//     }
// }


exports.getLatestProduct = async (req, res) => {
    try {
        const latestProduct = await Product.find().sort({ createdAt: -1 }).limit(9);
        res.json(latestProduct);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};



exports.filter = async (req, res) => {
    try {
        // รับค่าตัวกรองจาก query string
        const { tags, categories, price, onSale, type } = req.query;

        // สร้าง object สำหรับเก็บเงื่อนไขการกรอง
        const filter = {};

        // กรองตาม tags
        if (tags) {
            // สมมติว่า tags เป็น array ในฐานข้อมูล
            filter.tags = { $in: tags.split(',') }; // รองรับหลายค่าแยกด้วยเครื่องหมาย ','
        }

        // กรองตาม categories
        if (categories) {
            filter.categories = categories;
        }

        // กรองตามช่วงราคา
        if (price) {
            const [min, max] = price.split('-').map(Number);
            filter.price = { $gte: min || 0, $lte: max || Infinity }; // ค่าเริ่มต้น min = 0, max = Infinity
        }

        // กรองตามสถานะ onSale (boolean)
        if (onSale) {
            filter.onSale = onSale === 'true'; // แปลง string เป็น boolean
        }

        // กรองตาม type
        if (type) {
            filter.type = type;
        }

        // ค้นหาเอกสารที่ตรงกับตัวกรอง
        const products = await Product.find(filter).exec();

        // ส่งผลลัพธ์กลับไปยัง client
        res.json(products);
    } catch (err) {
        console.log(`Server Error: ${err}`);
        res.status(500).send('Server Error');
    }
};
