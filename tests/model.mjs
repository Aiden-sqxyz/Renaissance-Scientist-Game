import { writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { INITIAL, KEYS, ruined, recognitionChance, classify, resolveTurn, transitions } from '../src/engine.js';
const id=(t,s)=>`${t}:${KEYS.map(k=>s[k]).join(',')}`;
const cache=new Map();
function optimal(t,s){
  if(ruined(s))return{value:0,choice:0};
  if(t===6)return{value:recognitionChance(s),choice:0};
  const k=id(t,s);if(cache.has(k))return cache.get(k);
  const values=[0,1,2].map(c=>transitions(s,t,c).reduce((v,b)=>v+b.p*optimal(t+1,b.stats).value,0));
  const value=Math.max(...values),result={value,choice:values.indexOf(value)};cache.set(k,result);return result;
}
function evaluate(policy){
  let states=new Map([[KEYS.map(k=>INITIAL[k]).join(','),{s:INITIAL,p:1}]]);
  const endings={success:0,unrecognized:0,stable:0,unfinished:0,ruin:0};
  for(let t=0;t<6;t++){
    const next=new Map();
    for(const {s,p} of states.values())for(const [c,weight]of policy(t,s))for(const b of transitions(s,t,c)){
      const mass=p*weight*b.p;
      if(ruined(b.stats)){endings.ruin+=mass;continue;}
      if(t===5){const win=recognitionChance(b.stats);endings.success+=mass*win;endings[classify(b.stats,false)]+=mass*(1-win);continue;}
      const k=KEYS.map(key=>b.stats[key]).join(',');
      if(next.has(k))next.get(k).p+=mass;else next.set(k,{s:b.stats,p:mass});
    }
    states=next;
  }
  assert.ok(Math.abs(Object.values(endings).reduce((a,b)=>a+b,0)-1)<1e-9);
  return endings;
}
const randomPolicy=()=>[[0,1/3],[1,1/3],[2,1/3]];
const adaptivePolicy=(t,s)=>[[optimal(t,s).choice,1]];
const randomExact=evaluate(randomPolicy),optimalExact=evaluate(adaptivePolicy);
assert.ok(Math.abs(optimal(0,INITIAL).value-optimalExact.success)<1e-10);
let best={rate:-1,path:[]},worst={rate:2,path:[]};
for(let n=0;n<729;n++){
  const path=Array.from({length:6},(_,t)=>Math.floor(n/(3**t))%3);
  const ending=evaluate(t=>[[path[t],1]]);
  if(ending.success>best.rate)best={rate:ending.success,path};
  if(ending.success<worst.rate)worst={rate:ending.success,path};
}
// A simple repeatable cautious policy; it does not react to state changes.
const cautiousPath=[1,1,2,1,1,1];
const cautiousExact=evaluate(t=>[[cautiousPath[t],1]]);
function mulberry32(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const runs=200000;
function simulate(policy,seed){
  const rng=mulberry32(seed),counts={success:0,unrecognized:0,stable:0,unfinished:0,ruin:0};
  for(let i=0;i<runs;i++){
    let stats={...INITIAL};
    for(let t=0;t<6;t++){
      const r=resolveTurn(stats,t,policy(t,stats,rng),rng);stats=r.after;
      if(r.ending){counts[r.ending]++;break;}
    }
  }
  assert.equal(Object.values(counts).reduce((a,b)=>a+b,0),runs);
  return Object.fromEntries(Object.entries(counts).map(([k,n])=>[k,n/runs]));
}
const simRandom=simulate((t,s,rng)=>Math.floor(rng()*3),15871633);
const simCautious=simulate(t=>cautiousPath[t],15921610);
const simOptimal=simulate((t,s)=>optimal(t,s).choice,16091616);
for(const [sim,exact]of [[simRandom,randomExact],[simCautious,cautiousExact],[simOptimal,optimalExact]]){
  const se=Math.sqrt(exact.success*(1-exact.success)/runs);
  assert.ok(Math.abs(sim.success-exact.success)<5*se+1/runs);
}
const model={runs,randomExact:randomExact.success,optimalExact:optimalExact.success,rows:[
  {label:'Uniform random choices',simulated:simRandom.success,exact:randomExact.success},
  {label:'Cautious fixed choices (B, B, C, B, B, B)',simulated:simCautious.success,exact:cautiousExact.success},
  {label:'Optimized choices using current stats',simulated:simOptimal.success,exact:optimalExact.success}
]};
const report={...model,notes:'Modeled game probabilities, not measured human or historical outcomes. Absorbing ruin is checked after choices and events. Recognition checked after last event. Exact enumeration checks all 729 fixed sequences. The adaptive policy maximizes Exceptional Success using complete state information.',seeds:[15871633,15921610,16091616],randomEndings:randomExact,optimalEndings:optimalExact,simulationEndings:{random:simRandom,cautious:simCautious,optimal:simOptimal},bestFixed:best,worstFixed:worst,statesInBellmanCache:cache.size};
await writeFile('src/model-results.js',`export const MODEL = ${JSON.stringify(model,null,2)};\n`);
await writeFile('tests/model-results.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
