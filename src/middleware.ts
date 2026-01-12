import jwt, { decode, type JwtPayload } from 'jsonwebtoken'
import type { Response,Request,NextFunction}  from 'express';
export const authUser=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const token=req.headers["authorization"];
        const decode_token=await jwt.verify(token as string ,process.env.JWT_SECRET as string)
        req.userId=(decode_token as JwtPayload).id;// as jwtpayload se bta rhe h ki ye ye deocde_token object hai
        next()
    } catch (error) {
        return res.json({
            msg:'not logged in'
        })
    }
}