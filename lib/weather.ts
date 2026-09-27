export type WeatherSignal={
 id:string; title:string; summary:string; city:string; country:string;
 lat:number; lng:number; category:"Weather"; time:string; ageDays:number;
 source:string; sourceUrl:string; hot?:boolean;
};

type OpenMeteoRow={current:{temperature_2m:number;weather_code:number;wind_speed_10m:number}};

const cities=[
 {id:"acc",city:"Accra",country:"Ghana",lat:5.6037,lng:-0.187},
 {id:"lag",city:"Lagos",country:"Nigeria",lat:6.5244,lng:3.3792},
 {id:"nbo",city:"Nairobi",country:"Kenya",lat:-1.2864,lng:36.8172},
 {id:"jhb",city:"Johannesburg",country:"South Africa",lat:-26.2041,lng:28.0473},
 {id:"cai",city:"Cairo",country:"Egypt",lat:30.0444,lng:31.2357},
 {id:"dkr",city:"Dakar",country:"Senegal",lat:14.7167,lng:-17.4677},
 {id:"kig",city:"Kigali",country:"Rwanda",lat:-1.9441,lng:30.0619},
 {id:"cas",city:"Casablanca",country:"Morocco",lat:33.5731,lng:-7.5898}
];

const description=(code:number)=>{
 if(code===0)return "Clear sky";
 if([1,2,3].includes(code))return "Cloudy conditions";
 if([45,48].includes(code))return "Fog conditions";
 if([51,53,55,56,57].includes(code))return "Drizzle";
 if([61,63,65,66,67,80,81,82].includes(code))return "Rain activity";
 if([71,73,75,77,85,86].includes(code))return "Snow activity";
 if([95,96,99].includes(code))return "Thunderstorm activity";
 return "Weather activity";
};

export async function getWeatherSignals():Promise<WeatherSignal[]>{
 const latitude=cities.map(c=>c.lat).join(",");
 const longitude=cities.map(c=>c.lng).join(",");
 const url="https://api.open-meteo.com/v1/forecast?latitude="+latitude+"&longitude="+longitude+"&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto";
 const response=await fetch(url,{next:{revalidate:900}});
 if(!response.ok) throw new Error("Weather source unavailable");
 const data=await response.json();
 const rows=Array.isArray(data)?data:[data];
 return rows.map((row:OpenMeteoRow,index:number)=>{
   const c=cities[index];
   const temp=Math.round(row.current.temperature_2m);
   const code=Number(row.current.weather_code);
   const wind=Math.round(row.current.wind_speed_10m);
   return {id:"weather-"+c.id,title:description(code),summary:temp+"°C · wind "+wind+" km/h. Current weather signal from Open-Meteo.",city:c.city,country:c.country,lat:c.lat,lng:c.lng,category:"Weather",time:"Now",ageDays:0,source:"Open-Meteo",sourceUrl:"https://open-meteo.com/",hot:code>=95};
 });
}