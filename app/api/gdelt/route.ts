import {NextResponse} from "next/server";
import {getGdeltSignals} from "../../../lib/gdelt";
import {deduplicateSignals} from "../../../lib/signals";

export const revalidate=900;

export async function GET(){
 try{
  const signals=deduplicateSignals(await getGdeltSignals());
  return NextResponse.json({signals,updatedAt:new Date().toISOString()});
 }catch{
  return NextResponse.json({signals:[],error:"GDELT source unavailable"},{status:502});
 }
}
