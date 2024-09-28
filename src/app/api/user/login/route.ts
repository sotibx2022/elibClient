import { Users } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { config } from "@/config/configuration";
import { connectToDB } from "@/config/db";
export async function POST(req: NextRequest) {
    await connectToDB(); // Ensure the DB connection is awaited
    const { email, password } = await req.json();
    if (!email || !password) {
        return NextResponse.json({
            status: 400,
            success: false,
            message: "Email and Password are required"
        });
    }
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return NextResponse.json({
                status: 404,
                success: false,
                message: "User Not Found"
            });
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return NextResponse.json({
                status: 400,
                success: false,
                message: "Incorrect Password"
            });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, config.SECRET_KEY!, {
            expiresIn: '2h' // Token expires in 2 hours
        });
        // Set the access token in the cookies with an expiration of 2 hours
        const response = NextResponse.json({
            success: true,
            status: 200,
            message: "User Login Successfully!",
            accessToken: token
        });
        response.cookies.set('accessToken', token, {
            maxAge: 2 * 60 * 60*1000, // 2 hours in seconds
            path: '/',
            httpOnly: true,
        });
        return response;
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({
            success: false,
            message: "Error to Login User",
            status: 500
        });
    }
}
