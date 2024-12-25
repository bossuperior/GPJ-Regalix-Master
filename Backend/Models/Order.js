
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