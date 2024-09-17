import { Users } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { config } from "@/config/configuration";
import { connectToDB } from "@/config/db";
export async function POST(req:NextRequest, res:NextResponse) {
    connectToDB()
    const { email, password } = await req.json();
    if (!email || !password) {
        return NextResponse.json({status:400,success:false,message: "Email and Password are required"});
    }
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return NextResponse.json({status:404,success:false,message: "User Not Found"});
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return NextResponse.json({status:400,success:false,message: "Incorrect Password"});
        }
        const token = jwt.sign({ userId: user._id }, config.SECRET_KEY!, {
            expiresIn: '2h'
        });
        return NextResponse.json({success:true, status:200, message:"User Login Successfully !", accessToken:token });
    } catch (error) {
        return NextResponse.json({success:false, message:"Error to Login User", status:500});
    }
}