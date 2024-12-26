/*1.Connect to MongoDB*/
const mongoose = require('mongoose')
const dbUrl = 'mongodb+srv://waraphon10000:QzpXbtKZYOXmeGqF@cluster0.59h5h.mongodb.net/order?retryWrites=true&w=majority';
 //If productDB doesn't exist in the database, it will be automatically created.
mongoose.connect(dbUrl,{
    //Configure the proper new driver version.
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(() => console.log('Database connected successfully'))
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1); //Terminate process when connection error
    });
/*2.Schema design*/
let orderSchema = mongoose.Schema({
    productName: String,
    productDes: String,
    productNo: String,
    quantity: Number,
    subtotal: Number,
    fullName:String,
    email:String,
    tel:String,
    street:String,
    city:String,
    state:String,
    country:String,
    zip:String,
    payMethod: String,
    proofImage:String, //Images path
    cardNum: String,
    expire: String,
    csc: String,
    time: String// ตั้งค่า default เป็นเวลาในขณะนั้น
})
/*3.Create Model*/
let Orders = mongoose.model("orders",orderSchema)
/*4.Export Models*/
module.exports = Orders

/*Add products Function*/
module.exports.placeOrder = async function(model, document) {//โยน document(ข้อมูล) มาทำงานใน model แล้วบันทึกลง Database (document = doc ใน collection ของ Database)
    try {
        await model.save(document);
    } catch (err) {
        console.error(err);
        throw err;
    }
};