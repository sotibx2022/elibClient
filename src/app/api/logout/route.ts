import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        // Clear the accessToken cookie
        const response = NextResponse.json({
            message: "User Logout Successfully",
            status: 200, 
            success: true,
        });
        // Clear the 'accessToken' cookie
        response.cookies.set('accessToken', '', {
            httpOnly:true,
            maxAge: -1, // This will effectively delete the cookie
            path: '/',
        });
        return response;
    } catch (error) {
        console.error('Error during logout:', error);
        return NextResponse.json({
            message: "Internal Error to Logout User",
            status: 400,
            success: false,
        });
    }
}
