const express = require('express')
const cheerio = require('cheerio');
const fs = require('fs').promises;
const moment = require('moment');
const Orders = require('../models/orders') //Import model
const router = express.Router()

router.get('/checkout',(req, res)=>{
    res.render('pages/checkout')
})
router.get('/orders', async (req, res) => {
    try {
        // ใช้ await กับ Products.find() เพื่อดึงข้อมูลทั้งหมด
        const doc = await Orders.find().sort({ time: -1 });//documents ที่อยู่ใน products collection
        // ส่งข้อมูลไปยัง view
        res.render('pages/orders', { orders: doc });
    } catch (err) {
        // จัดการข้อผิดพลาด (Error Handling)
        console.error(err);
        res.status(500).send('Error retrieving orders');
    }
})

/*File upload*/
const multer = require('multer')
const {diskStorage} = require("multer");
//1.Create Disk Storage -> กำหนด Destination and File name
const storage = multer.diskStorage({
    //(req,file,cb) รับ 3 parameters req = request object ,file = file ที่ถูกอัปโหลด (file object) ,cb = callback function (ระบุ folder)
    destination:function(req,file,cb){
        cb(null,'./public/images/transactions') //บอก Multer ให้เก็บไฟล์ในโฟลเดอร์ ./public/images/products โดยไม่มีข้อผิดพลาด (null) คือต้องสร้าง folder ไว้ล่วงหน้า
    },
    filename:function(req,file,cb){
        const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
        const payMethod = req.body.payMethod;
        cb(null, `${payMethod}_${timestamp}.jpg`); // เช่น 2024-12-21_13-45-30.jpg
    }
})
//2.Define Upload function
const upload = multer({
    storage:storage
})

// อ่านไฟล์ HTML

router.post('/checkout',upload.single("image"), async (req, res) => { //รับข้อมูลคำขอจาก HTTP Form
    /*สร้าง object Products ที่ inherit จากโมเดล products.js เพื่อสร้างเอกสารใน format MongoDB แล้วเก็บในตัวแปร Document*/
    try {
        // อ่าน HTML ไฟล์
        const htmlContent = await fs.readFile('./views/partials/orderItems.html', 'utf8');

        // โหลด HTML เข้า Cheerio
        const $ = cheerio.load(htmlContent);

        // ดึงข้อความจาก span โดยใช้ id หรือ class (span tag ไม่สามารถใช้ req.body ได้)
        const productName = $('span.orderiteminfo__designer').text();
        const productDes = $('span.productDes').text();
        const productNo = $('span.productNo').text();
        const subtotalText = $('span.pricing__prices__value--discount').text(); // ดึงข้อความจาก span
        const subtotal = parseFloat(subtotalText.replace(/[^0-9.-]+/g, "")).toFixed(2); // แปลงข้อความเป็นตัวเลข (โดยการลบอักขระที่ไม่ใช่ตัวเลข)
        let currentDate = new Date();
        let formattedDate = currentDate.toLocaleString("en-US", {
            year: "numeric", // ปี
            month: "long", // เดือน
            day: "numeric", // วันที่
            hour: "numeric", // ชั่วโมง
            minute: "numeric", // นาที
            second: "numeric", // วินาที
        });
        // สร้าง object Orders
        const document = new Orders({
            productName: productName,
            productDes: productDes,
            productNo: productNo,
            quantity: req.body.quantity,
            subtotal: subtotal,
            fullName: req.body.name,
            email: req.body.email,
            tel: req.body.tel,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zip: req.body.zip,
            payMethod: req.body.payMethod,
            proofImage: req.file.filename,
            cardNum: req.body.cardNum,
            expire: req.body.expire,
            csc: req.body.csc,
            time: formattedDate
        });

        // บันทึกลงฐานข้อมูล
        await Orders.placeOrder(document);
        // Fetch and sort orders by time in descending order
        console.log("Order placed successfully");
        res.redirect("/orders");
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error processing your request");
    }
});

module.exports = router;
