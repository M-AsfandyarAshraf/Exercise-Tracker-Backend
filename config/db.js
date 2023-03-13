const mongoose = require("mongoose");
const Url = "mongodb+srv://AsfandyarAshraf:ngFQybJ1JiYYBF5e@test.mmjzi6j.mongodb.net/?retryWrites=true&w=majority"

function db(){
    
    mongoose.connect(Url)
    .then(()=>{
        console.log("DB Connected")
    })
    .catch(()=>{
        console.log("DB Connection Failed")
    })

}


module.exports = db