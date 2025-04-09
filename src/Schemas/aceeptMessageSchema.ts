import {z} from 'zod';

export const isAcceptingMessageSchema=z.object({
    aceeptMessages:z.boolean(),
})