import {z} from 'zod';


export const usernameValidation=z.string().min(2,"username at least 2 characters").max(20,"username is no more than 20 characters").regex(/^[a-zA-Z0-9_]+$/,"username is not contain special character");

export const signUpSchema=z.object({
    username:usernameValidation,
    email:z.string().email({message:"Valid email is required"}),
    password:z.string().min(6,"password must be atleast 6 characters"),
})
