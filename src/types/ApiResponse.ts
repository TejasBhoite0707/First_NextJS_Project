import { Message } from "@/Modal/User";
export interface Apiresponse{
    success:Boolean;
    message:string;
    isAcceptingMessages?:boolean;
    messages?:Array<Message>;
}