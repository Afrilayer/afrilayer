"use client";
import {useEffect,useMemo,useState} from "react";
import {events,MapEvent} from "../lib/events";\nimport {africaFeatures} from "../lib/geo";
import {X,Plus,Minus,MapPin,ExternalLink,RefreshCw} from "lucide-react";

const categories=["All","Business","Infrastructure","Tech","Event","Weather"] as const;
const ranges=["LIVE","24H","7D","30D"] as const;
const maxAge=(range:string)=>range==="LIVE"?0:range==="24H"?1:range==="7D"?7:30;
const project=(lat:number,lng:number)=>({x:50+(lng/40),y:48-(lat/37)});

export default function Home(){
 const [range,setRange]=useState<typeof ranges[number]>("LIVE");
 const [category,setCategory]=useState("All");
 const [selected,setSelected]=useState<MapEvent|null>(null);
 const [zoom,setZoom]=useState(1); const [weather,setWeather]=useState<MapEvent[]>([]); const [weatherLoading,setWeatherLoading]=useState(true);\n const loadWeather=async()=>{setWeatherLoading(true);try{const r=await fetch("/api/weather");const j=await r.json();setWeather(j.signals??[]);}finally{setWeatherLoading(false);}};\n useEffect(()=>{loadWeather();},[]);\n const allEvents=useMemo(()=>[...events,...weather],[weather]);
 const visible=useMemo(()=>{
   const age=maxAge(range);
   return events.filter(e=>(category==="All"||e.category===category)&&e.ageDays<=age);
 },[category,range]);
 return <main className="app">
  <header className="topbar">
   <div><span className="brand">Afrilayer</span><span className="tagline">See what&apos;s happening across Africa.</span></div>
   <div className="controls">{ranges.map(r=><button key={r} className={`control ${range===r?"active":""}`} onClick={()=>setRange(r)}>{r}</button>)}<button className="control" onClick={loadWeather} title="Refresh weather"><RefreshCw size={14}/></button></div>
  </header>
  <section className="workspace">
   <div className="mapwrap">
    <div className="maptitle"><strong>Africa</strong><small>{visible.length} activity signals</small></div>
    {selected&&visible.some(e=>e.id===selected.id)&&<div className="selectedpanel"><button className="close" onClick={()=>setSelected(null)}><X size={16}/></button><div className="eyebrow">{selected.category} · {selected.time}</div><h3>{selected.title}</h3><p>{selected.summary}</p><div className="location"><MapPin size={12} style={{verticalAlign:"-2px"}}/> {selected.city}, {selected.country}</div><div className="source">Source: {selected.source}{selected.sourceUrl&&<a href={selected.sourceUrl} target="_blank" rel="noreferrer">Open source <ExternalLink size={11}/></a>}</div></div>}
    <svg className="map" viewBox="0 0 100 100" preserveAspectRatio="none" style={{transform:`scale(${zoom})`}}>
      <defs><pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M5 0H0V5" fill="none" stroke="#758089" strokeWidth=".08"/></pattern></defs>
      <rect width="100" height="100" fill="url(#grid)" className="mapgrid"/>
      <path d="M40 5 L35 8 31 15 29 20 25 24 24 30 28 34 26 39 29 44 27 50 30 57 34 62 36 69 40 75 43 82 48 91 53 96 57 90 61 82 65 75 67 67 70 60 72 52 76 45 74 38 78 31 75 25 77 19 72 14 66 13 62 9 56 8 51 5 46 6Z" fill="#1b2529" stroke="#536067" strokeWidth=".25"/>\n      {africaFeatures.map(f=><path key={f.id} d={f.path} className="country" title={f.name}/>)}
      <path d="M30 26L39 23 48 25 57 22 67 25 73 31M28 39L39 38 50 40 61 37 73 41M30 52L41 50 52 53 65 49 71 54M35 64L46 62 57 65 67 60M40 76L50 73 60 76" fill="none" stroke="#3b474e" strokeWidth=".18" opacity=".8"/>
      {visible.map(e=>{const p=project(e.lat,e.lng);return <g key={e.id} onClick={()=>setSelected(e)}><circle className={`marker ${e.hot?"hot":e.category==="Event"?"event":e.category==="Tech"?"tech":""}`} cx={p.x} cy={p.y} r={e.hot?1.25:.85}/>{e.hot&&<circle cx={p.x} cy={p.y} r="2.3" fill="none" stroke="#ffbd5c" strokeWidth=".18" opacity=".7"/>}</g>})}
    </svg>
    <div className="zoom"><button onClick={()=>setZoom(z=>Math.min(1.5,z+.1))}><Plus size={15}/></button><button onClick={()=>setZoom(z=>Math.max(.8,z-.1))}><Minus size={15}/></button></div>
    <div className="legend"><span><i style={{background:"#d9ff52"}}/>Activity</span><span><i style={{background:"#ffbd5c"}}/>Hot</span><span><i style={{background:"#c59cff"}}/>Tech</span><span><i style={{background:"#67d7ff"}}/>Weather</span></div>
    <div className="footerline">Prototype signals · source ingestion is the next layer</div>
   </div>
   <aside className="side">
    <div className="sidehead"><div className="eyebrow">{range==="LIVE"?"Live view":range}</div><h1>What&apos;s happening?</h1><p>Explore activity across Africa by place, category and time.</p></div>
    <div className="filters">{categories.map(c=><button key={c} className={`control ${category===c?"active":""}`} onClick={()=>setCategory(c)}>{c}</button>)}</div>
    <div className="feed">{visible.map(e=><article key={e.id} className={`card ${selected?.id===e.id?"selected":""}`} onClick={()=>setSelected(e)}><div className="meta"><span><i className="dot"/> {e.category}</span><span>{e.time}</span></div><h2>{e.title}</h2><p>{e.summary}</p><div className="location">{e.city}, {e.country}</div></article>)}{visible.length===0&&<div className="empty">No activity in this layer yet.</div>}</div>
   </aside>
  </section>
 </main>
}