const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    googleId:{
        type:String,
    },
    avatar:{
        type:String,
        default:"",
    },
    plan:{
        type:String,
        enum:["free","pro","enterprise"],
        default:"free",
    },
    roadmapsUsed:{
        type:Number,
        default:0,
    },
    roadmapLimit:{
        type:Number,
        default:3,
    },
    streakDays:{
        type:Number,
        default:0,
    }
}, {timestamps:true});

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password =await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}
module.exports = mongoose.model("User", userSchema);
