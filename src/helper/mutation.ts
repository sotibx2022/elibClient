import { LoginData,RegisterData } from "@/app/types/types";
import { config } from "@/config/configuration";
import axios from "axios"
export interface APIResponse{
    success:boolean, 
    status?:number,
    message:string,
    statusCode?:number,
    accessToken?:string,
}
export const registerUser = async (userData:RegisterData):Promise<APIResponse> => {
  try {
    const response = await axios.post(`${process.env.WEBSITE_URL}/api/user/signup`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        status: error.response.status,
        message: error.response.data.message || "An error occurred during registration.",
      };
    }
    return {
      success: false,
      status: 500,
      message: "Unknown error occurred.",
    };
  }
}
export const loginUser = async(userData:LoginData) =>{
try {
  const response = await axios.post(`${config.WEBSITE_URL}/api/users/login`,userData);
  return response.data;
} catch (error) {
  if(error instanceof Error){
    return {
      success:false,
      status:400,
      message:error.message,
    }
  }
  else{
      return{
        success:false,
        status:400, 
        message:"An Unknown Error Occured"
      }
    }
  }
}