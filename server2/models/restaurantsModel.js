import mongoose from "mongoose";
const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: {
    type: String, 
    required: true,
    unique: true
},
type:{
    type: String,
    required:true,
    unique: false
},
likes: {
    type:Number,
    required: false,
    unique:false,
},
shops: [
    {type:mongoose.Schema.Types.ObjectId, ref:"shop"}
],

  
});
const restaurantsModel = mongoose.model("restaurant", restaurantSchema)

export default restaurantsModel;  