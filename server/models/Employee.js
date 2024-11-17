import mongoose from "mongoose";
const { Schema } = mongoose;

/** question model structure */
const EmployeeSchema = new Schema({
   name:String,
   email:String,
   password:String

});

export default mongoose.model('employees', EmployeeSchema)
