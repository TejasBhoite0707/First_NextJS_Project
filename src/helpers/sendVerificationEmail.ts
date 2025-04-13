import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { Apiresponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string,

):Promise<Apiresponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Message Verification Code',
            react: VerificationEmail({username,otp:verifyCode}),
          });
        return {success:true,message:"send verification email SuccessFully" }
    } catch (EmailError) {
        console.error("Error sending verification email", EmailError);
        return {success:false,message:"Failed to send verification email"}
    }
}
