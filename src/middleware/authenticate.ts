import jwt, { JwtPayload } from 'jsonwebtoken';
import createHttpError from "http-errors";
import {config} from "../config/configuration";
import { NextRequest, NextResponse } from 'next/server';
interface AuthRequest extends NextRequest{
    userId:string
}
export const authentication =(req:NextRequest,res:NextResponse)=>{
    const headerToken = req.headers.get('Authorization');
    const tokenPart = headerToken?.split(" ")[1];
    if(tokenPart){
        const decodedToken = jwt.verify(tokenPart,config.SECRET_KEY!) as JwtPayload;
    const _req = req as AuthRequest;
        return decodedToken.userId
    }
    else{
        return NextResponse.json({status:400,message:"Token Not found", success:false})
    }
}