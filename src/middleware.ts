import jwt, { decode } from 'jsonwebtoken'
import type { Response,Request,NextFunction}  from 'express';
import { JWT_SECRET } from './config.js';
export const authUser=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const token=req.headers["authorization"];
        const decode_token=jwt.verify(token as string ,JWT_SECRET)
        // @ts-ignore
        req.userId=decode_token.id;
        next()
    } catch (error) {
        return res.json({
            msg:'not logged in'
        })
    }
}