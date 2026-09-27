import {NextResponse} from "next/server";
import {getWeatherSignals} from "../../../lib/weather";

export const revalidate=900;

export async function GET(){
 try{
  const signals=await getWeatherSignals();
  return NextResponse.json({signals,updatedAt:new Date().toISOString()});
 }catch{
  return NextResponse.json({signals:[],error:"Weather source unavailable"},{status:502});
 }
}