const mongoose = require("mongoose")

mongoose.connection.on("open", () => {
    console.log("db connected successfully")
})

 const mongoConnect = async () => {
   await mongoose.connect(process.env.MONGOURL)
}

module.exports = {
    mongoConnect
}