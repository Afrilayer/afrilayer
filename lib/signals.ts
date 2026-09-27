import type {MapEvent} from "./events";

export type SignalConfidence="low"|"medium"|"high";

export type NormalizedSignal=MapEvent & {
 confidence:SignalConfidence;
 occurredAt?:string;
};

export function normalizeSignal(signal:MapEvent & Partial<Pick<NormalizedSignal,"confidence"|"occurredAt">>):NormalizedSignal{
 return {
  ...signal,
  confidence:signal.confidence??(signal.source==="Open-Meteo"?"high":"low"),
  occurredAt:signal.occurredAt
 };
}

export function deduplicateSignals(signals:NormalizedSignal[]):NormalizedSignal[]{
 const seen=new Set<string>();
 return signals.filter(signal=>{
  const key=signal.id||[signal.title,signal.city,signal.country,signal.time].join("|");
  if(seen.has(key)) return false;
  seen.add(key);
  return true;
 });
}
