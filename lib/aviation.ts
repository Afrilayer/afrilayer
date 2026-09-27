import {normalizeSignal,NormalizedSignal} from "./signals";
import {registerSource} from "./sources";

type State=[string,string|null,number|null,number|null,number|null,number|null,number|null,number|null,number|null,number|null,number|null,number|null,number|null,number|null,number|null,number|null,number|null];

type OpenSkyResponse={time:number;states:State[]|null};

export async function getAviationSignals():Promise<NormalizedSignal[]>{
 const params=new URLSearchParams({
  lamin:"-36",lamax:"38",lomin:"-18",lomax:"52"
 });
 const response=await fetch("https://opensky-network.org/api/states/all?"+params.toString(),{next:{revalidate:180}});
 if(!response.ok) throw new Error("OpenSky source unavailable");
 const data=(await response.json()) as OpenSkyResponse;
 return (data.states??[]).map((state,index)=>{
  const [icao,callsign,,,,lng,lat,baroAltitude,onGround,velocity,track,verticalRate]=state;
  if(lat==null||lng==null)return null;
  const label=(callsign??"").trim()||icao;
  const altitude=baroAltitude==null?"altitude unavailable":Math.round(baroAltitude*3.28084).toLocaleString()+" ft";
  const speed=velocity==null?"speed unavailable":Math.round(velocity*1.94384)+" kt";
  return normalizeSignal({
   id:"aircraft-"+icao+"-"+index,
   title:label,
   summary:`Live aircraft position · ${altitude} · ${speed}.`,
   city:"Airspace",
   country:"Africa",
   lat,
   lng,
   category:"Aviation",
   time:"Now",
   ageDays:0,
   source:"OpenSky Network",
   sourceUrl:"https://opensky-network.org/",
   confidence:"high",
   hot:Boolean(!onGround&&velocity!=null&&velocity>250)
  });
 }).filter((signal):signal is NormalizedSignal=>Boolean(signal));
}

export const aviationSource=registerSource({
 id:"opensky-aviation",
 name:"OpenSky Network",
 description:"Live ADS-B aircraft state vectors across the African airspace bounding box.",
 category:"Aviation",
 live:true,
 url:"https://opensky-network.org/",
 fetchSignals:getAviationSignals
});
