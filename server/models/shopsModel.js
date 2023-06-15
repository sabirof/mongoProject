import mongoose from "mongoose";
const { Schema } = mongoose;

const shopsSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
    unique: true
},
type:{
    type: String,
    required:false,
    unique: false
},
location: {
    latitude:{
    type:Number,
    required: true,
    },
    
longitude:{
        type:Number,
        required: true,
    },
}, 
});
const shopsModel = mongoose.model("shop", shopsSchema)

export default shopsModel;  