export type EventCategory="Business"|"Infrastructure"|"Tech"|"Event"|"Weather"|"Aviation";

export type MapEvent={
 id:string;
 title:string;
 summary:string;
 city:string;
 country:string;
 lat:number;
 lng:number;
 category:EventCategory;
 time:string;
 ageDays:number;
 source:string;
 sourceUrl?:string;
 hot?:boolean;
};

export const events:MapEvent[]=[
 {id:"acc-1",title:"Digital infrastructure activity",summary:"A prototype signal around Accra.",city:"Accra",country:"Ghana",lat:5.6037,lng:-0.187,category:"Tech",time:"Today",ageDays:0,source:"Demo signal"},
 {id:"lag-1",title:"Business activity",summary:"A prototype business signal around Lagos.",city:"Lagos",country:"Nigeria",lat:6.5244,lng:3.3792,category:"Business",time:"Today",ageDays:0,source:"Demo signal",hot:true},
 {id:"nbo-1",title:"Technology activity",summary:"A prototype technology signal around Nairobi.",city:"Nairobi",country:"Kenya",lat:-1.2864,lng:36.8172,category:"Tech",time:"Today",ageDays:0,source:"Demo signal"},
 {id:"jhb-1",title:"Infrastructure activity",summary:"A prototype infrastructure signal around Johannesburg.",city:"Johannesburg",country:"South Africa",lat:-26.2041,lng:28.0473,category:"Infrastructure",time:"Yesterday",ageDays:1,source:"Demo signal"},
 {id:"cai-1",title:"Business activity",summary:"A prototype business signal around Cairo.",city:"Cairo",country:"Egypt",lat:30.0444,lng:31.2357,category:"Business",time:"Yesterday",ageDays:1,source:"Demo signal"},
 {id:"dkr-1",title:"Event activity",summary:"A prototype event signal around Dakar.",city:"Dakar",country:"Senegal",lat:14.7167,lng:-17.4677,category:"Event",time:"2 days ago",ageDays:2,source:"Demo signal"},
 {id:"kig-1",title:"Infrastructure activity",summary:"A prototype infrastructure signal around Kigali.",city:"Kigali",country:"Rwanda",lat:-1.9441,lng:30.0619,category:"Infrastructure",time:"2 days ago",ageDays:2,source:"Demo signal"},
 {id:"cas-1",title:"Technology activity",summary:"A prototype technology signal around Casablanca.",city:"Casablanca",country:"Morocco",lat:33.5731,lng:-7.5898,category:"Tech",time:"3 days ago",ageDays:3,source:"Demo signal"}
];