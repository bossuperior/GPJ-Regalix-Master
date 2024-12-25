const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://waraphon10000:QzpXbtKZYOXmeGqF@cluster0.59h5h.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0')
        console.log('DB Connected')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB