import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        dob:{
            type: Date,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        description:{
            type: String, 
            default: "",           
        },
        avatar: {            
              type: String,  
              default: "",      
          },
    }
);
export const User = mongoose.model('User', userSchema);