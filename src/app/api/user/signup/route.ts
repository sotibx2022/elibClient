import { Users } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { config } from "@/config/configuration";
import { connectToDB } from "@/config/db";
export async function POST(req:NextRequest, res:NextResponse) {
    connectToDB()
    try {
        const { firstName,lastName, email, password } = await req.json();
        // Validate required fields
        if (!firstName ||!lastName || !email || !password) {
            return NextResponse.json({status:400, message:"All fields are required", success:false});
        }
        // Check if the user already exists
        let user = await Users.findOne({ email });
        if (user) {
            return NextResponse.json({status:400, message:"User Already Exists with provided Email", success:false});
        }
        // Hash the password and create the new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
            name: firstName + lastName,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, config.SECRET_KEY!, {
            expiresIn: '2h'
        });
        return NextResponse.json({success:true, status:200, message:"User Registered Successfully !", accessToken:token });
    } catch (error) {
        return NextResponse.json({success:false, status:500, message:"Error to Signup user."});
    }
};