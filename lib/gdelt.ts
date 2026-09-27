import {normalizeSignal,NormalizedSignal} from "./signals";
import {registerSource} from "./sources";

type GdeltFeature={
 type:"Feature";
 geometry:{type:string;coordinates:number[]|number[][]|number[][][]};
 properties?:Record<string,unknown>;
};

type GdeltGeoJson={type:"FeatureCollection";features:GdeltFeature[]};

const africaCountries=[
 "Algeria","Angola","Benin","Botswana","Burkina Faso","Burundi","Cameroon","Cape Verde",
 "Central African Republic","Chad","Comoros","Congo","Democratic Republic of the Congo",
 "Djibouti","Egypt","Equatorial Guinea","Eritrea","Eswatini","Ethiopia","Gabon","Gambia",
 "Ghana","Guinea","Guinea-Bissau","Ivory Coast","Kenya","Lesotho","Liberia","Libya",
 "Madagascar","Malawi","Mali","Mauritania","Mauritius","Morocco","Mozambique","Namibia",
 "Niger","Nigeria","Rwanda","Sao Tome and Principe","Senegal","Seychelles","Sierra Leone",
 "Somalia","South Africa","South Sudan","Sudan","Tanzania","Togo","Tunisia","Uganda",
 "Zambia","Zimbabwe"
];

const countryAliases:Record<string,string>={
 "democratic republic of the congo":"DR Congo",
 "dem. rep. congo":"DR Congo",
 "republic of the congo":"Congo",
 "equatorial guinea":"Equatorial Guinea",
 "ivory coast":"Côte d'Ivoire",
 "south sudan":"South Sudan",
 "swaziland":"Eswatini"
};

const africaQuery=africaCountries.map(country=>`"${country}"`).join(" OR ");

function text(value:unknown){
 return typeof value==="string"?value.trim():"";
}

function coordinates(feature:GdeltFeature){
 const c=feature.geometry?.coordinates;
 if(Array.isArray(c)&&typeof c[0]==="number"&&typeof c[1]==="number") return [Number(c[0]),Number(c[1])] as const;
 return null;
}

function countryFrom(properties:Record<string,unknown>){
 const raw=text(properties.countryname)||text(properties.country)||text(properties.name);
 const lower=raw.toLowerCase();
 const alias=Object.entries(countryAliases).find(([key])=>lower.includes(key));
 if(alias)return alias[1];
 return africaCountries.find(country=>lower.includes(country.toLowerCase()))||"";
}

function toSignal(feature:GdeltFeature):NormalizedSignal|null{
 const coordinatesResult=coordinates(feature);
 if(!coordinatesResult)return null;
 const [lng,lat]=coordinatesResult;
 if(!Number.isFinite(lat)||!Number.isFinite(lng)||lat<-36||lat>38||lng<-20||lng>55)return null;
 const p=feature.properties??{};
 const title=text(p.name)||text(p.title)||"News activity";
 const url=text(p.url);
 const country=countryFrom(p);
 if(!country)return null;
 const city=text(p.location)||text(p.fullname)||country;
 const timestamp=text(p.date)||text(p.datetime);
 return normalizeSignal({
  id:`gdelt-${encodeURIComponent(url||[title,city,country,timestamp].join("|"))}`,
  title,
  summary:`Recent news coverage mentioning ${city}. GDELT geographic signal.`,
  city,
  country,
  lat,
  lng,
  category:"Event",
  time:"Recent",
  ageDays:0,
  source:"GDELT GEO",
  sourceUrl:url||"https://www.gdeltproject.org/",
  confidence:"medium",
  occurredAt:timestamp||undefined
 });
}

export async function getGdeltSignals():Promise<NormalizedSignal[]>{
 const params=new URLSearchParams({
  query:`(${africaQuery})`,
  mode:"point",
  format:"geojson",
  timespan:"360"
 });
 const response=await fetch("https://api.gdeltproject.org/api/v2/geo/geo?"+params.toString(),{next:{revalidate:900}});
 if(!response.ok)throw new Error("GDELT source unavailable");
 const data=(await response.json()) as GdeltGeoJson;
 const seen=new Set<string>();
 return data.features.map(toSignal).filter((signal):signal is NormalizedSignal=>Boolean(signal)).filter(signal=>{
  const key=[signal.title.toLowerCase(),signal.city.toLowerCase(),signal.country].join("|");
  if(seen.has(key))return false;
  seen.add(key);
  return true;
 }).slice(0,80);
}

export const gdeltSource=registerSource({
 id:"gdelt-geo",
 name:"GDELT GEO",
 description:"Recent geographically mapped news coverage across Africa.",
 category:"Event",
 live:true,
 url:"https://www.gdeltproject.org/",
 fetchSignals:getGdeltSignals
});
