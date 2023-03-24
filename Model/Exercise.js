const  mongoose  = require("mongoose");

const Exercise = new mongoose.Schema({
    title:{
        type:String,
        enum:["Running","Swimming","Yoga","Cycling","Weight-Lifting" ],
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Completed" ],
        default: "Pending"
    },
    duration:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now(),
        required: true
    },
    calories:
    {
        type: Number,
        default: function() {
            switch(this.title) {
                case "Running":
                    return this.duration * 10;
                case "Swimming":
                    return this.duration * 15;
                case "Yoga":
                    return this.duration * 5;
                case "Cycling":
                    return this.duration * 8;    
                case "Weight-Lifting":
                    return this.duration * 10;    
            }
                
        }
    },
    distance:
    {
        type: Number,
        default: function() {
            switch(this.title) {
                case "Running":
                    return this.duration * 11;
                case "Swimming":
                    return (this.duration/60) * 3.2;
                case "Cycling":
                    return (this.duration/60) * 16;    
                default:
                    return 0;    
            }
                
        }
    }




})

module.exports = mongoose.model("Exercise",Exercise)