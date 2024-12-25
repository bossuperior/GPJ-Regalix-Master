const express = require('express')
const path = require('path')
const router = require('./controllers/routes')
const app = express()

/*ตั้งค่า view engine และ views folder*/
app.set('views',path.join(__dirname,'views')) //views folder
app.set('view engine','ejs') //ตั้งค่า view engine เป็น ejs

/*เข้าถึง Static Files*/
app.use(express.static(path.join(__dirname, '../frontend_part')));
app.use('/public', express.static(path.join(__dirname, 'public'))); //เข้าถึง static files ใน public folder

/*แปลง URL-encoded เป็น JavaScript object*/
app.use(express.urlencoded({extended:true})) //แปลง urlencoded เป็น js object

/*ใช้ router*/
app.use(router) //ใช้ router ในการกำหนดเส้นทาง



app.listen(3500, () => {
    console.log('Server started on port 3500!');
})