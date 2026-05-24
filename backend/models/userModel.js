import { Schema,model } from "mongoose";

const userSchema = new Schema(
    {
        firstName:{
            type: String,
            required: true,
            minlength:[3,'First name must be 3 characters']
        },
        lastName:{
            type:String,
            required:true,
            minlength:[3,'last name must be 3 characters']

        },
        email:{
            type:String,
            trim:true,
            required:true,
            unique:true,
            lowercase:true,
            index:true,
            match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
        },
        contact:{
            type:String,
            required:true,
            unique:true,
            match: [/^\+\d{1,3}-\d{3}-\d{7}$/,"Enter valid contact format +code-3digits-7digits"]
        },
        address:{
            type:String,
            required:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
            select:false,
            minlegth:[5,"Min length for password is 5"]
        }
        
    },{timestamps:true}
)

const User = model("User",userSchema);
export default User;






