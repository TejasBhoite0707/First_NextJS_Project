import dbConnect from "@/lib/dbConnect";
import UserModel from "@/Modal/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { number } from "zod";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();
        const existingUserVerifiedByUsername =await UserModel.find({
            username,
            isVerified: true,
        })
        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "username is already Taken",
            }, { status: 400 })
        }
        const existingUserVerifiedByEmail=await UserModel.findOne({email});
        const verifyCode=Math.floor(1000+Math.random()).toString();
        if (existingUserVerifiedByEmail) {
            true
        }
        else{
            const hashedpassword=await bcrypt.hash(password,10);
            const expiryDate=new Date();
            expiryDate.setHours(expiryDate.getHours()+1);
          const newUser=  new UserModel({
                 username,
                    email,
                    password:hashedpassword,
                    verifyCode:verifyCode,
                    verifyCodeExpiry:expiryDate,
                    isVerified:false,
                    isAcceptingMessage:true,
                    messages:[],
            })
            await newUser.save();
        }

      const EmailResponse=  await sendVerificationEmail(
            email,
            username,
            verifyCode,
        )

if(!EmailResponse.success){
    return Response.json({
        suceess:false,
        message:EmailResponse.message,
    },{status:500})
}
else{
    return Response.json({
        suceess:true,
        message:"User Assigned Successfully please verify email Suceesfully",
    },{status:201})
}

    } catch (error) {
        console.log(error);
        return Response.json({
            success: true,
            message: "Error Registring User"
        },
            {
                status: 500,
            }
        )
    }
}