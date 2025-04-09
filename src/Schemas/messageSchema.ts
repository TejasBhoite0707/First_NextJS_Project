import {z} from 'zod';

export const messageSchema=z.object({
    content:z.string().min(10,{message:"message at least contain 10 characters"})
})