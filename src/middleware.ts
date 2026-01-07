import jwt, { decode } from 'jsonwebtoken'
import type { Response,Request,NextFunction}  from 'express';
export const authUser=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const token=req.headers["authorization"];
        const decode_token=jwt.verify(token as string ,process.env.JWT_SECRET as string)
        // @ts-ignore
        req.userId=decode_token.id;
        next()
    } catch (error) {
        return res.json({
            msg:'not logged in'
        })
    }
}