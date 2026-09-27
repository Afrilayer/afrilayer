import {NextResponse} from "next/server";
import {getAviationSignals} from "../../../lib/aviation";
import {deduplicateSignals} from "../../../lib/signals";

export const revalidate=180;

export async function GET(){
 try{
  const signals=deduplicateSignals(await getAviationSignals());
  return NextResponse.json({signals,updatedAt:new Date().toISOString()});
 }catch{
  return NextResponse.json({signals:[],error:"Aviation source unavailable"},{status:502});
 }
}
