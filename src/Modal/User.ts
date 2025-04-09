import mongoose ,{Schema,Document} from "mongoose";

export interface Message extends Document{
    content:string,
    createdAt:Date,
}

const MesaageSchema:Schema<Message>=new Schema({
content:{
type:String,
required:true,
},
createdAt:{
type:Date,
required:true,
default:Date.now(),
}
})

export interface User extends Document{
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified:boolean,
    isAcceptingMessage:boolean,
    messages:Message[]
}

const userSchema:Schema<User>=new Schema({
username:{
    type:String,
    required:[true,"username is Required"],
    trim:true,
    unique:true,
},
email:{
    type:String,
    required:[true,"Email is Required"],
    unique:true,
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"please use the valid email address"]
},
password:{
    type:String,
    required:[true,"password is Required"],

},
verifyCode:{
    type:String,
    required:[true,"Verify code is Required"],
},

verifyCodeExpiry:{
    type:Date,
    required:[true,"erify code Expiry is Required"],
},
isVerified:{
    type:Boolean,
    default:false,
},
isAcceptingMessage:{
    type:Boolean,
    default:true,
},
messages:[MesaageSchema],

})

const UserModel=(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",userSchema);

export default UserModel;
