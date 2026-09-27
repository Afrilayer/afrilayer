import type {NormalizedSignal} from "./signals";

export type SignalSource={
 id:string;
 name:string;
 description:string;
 category:string;
 live:boolean;
 url:string;
 fetchSignals:()=>Promise<NormalizedSignal[]>;
};

export const sourceRegistry:SignalSource[]=[];

export function registerSource(source:SignalSource){
 sourceRegistry.push(source);
 return source;
}
