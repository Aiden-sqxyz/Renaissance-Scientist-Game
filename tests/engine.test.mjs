import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL, KEYS, RULES, apply, ruined, eligible, recognitionChance, classify, newGame, resolveTurn, choose, advance, validSave, transitions } from '../src/engine.js';
import { INTRO, CHAPTERS, reflection } from '../src/content.js';
import '../src/history.js';
const sequence=(values)=>{let i=0;return()=>{assert.ok(i<values.length,'unexpected random draw');return values[i++];};};
const key=s=>KEYS.map(k=>s[k]).join(',');

test('the 18 numerical choices match the finalized specification',()=>{
  assert.deepEqual(INITIAL,{money:3,research:0,reputation:1,safety:3});
  assert.deepEqual(RULES,[
    [{money:2},{money:1,research:1},{money:-1,research:2}],
    [{chance:.6,success:{money:2,reputation:1},failure:{money:-1}},{money:1,research:1},{money:-1,research:2}],
    [{money:-2,research:2},{chance:.5,success:{money:-1,research:2},failure:{money:-1,research:1}},{research:1}],
    [{chance:.65,success:{money:2,reputation:2},failure:{reputation:-1}},{money:1,reputation:1},{money:-1,research:2}],
    [{reputation:2,safety:-2},{research:1,reputation:1},{research:2}],
    [{reputation:2,safety:-2},{reputation:1,safety:1},{money:-1,research:1,reputation:1}]
  ]);
});
test('chance boundaries, independence, and a uniform selection of all four stats',()=>{
  const base={money:3,research:2,reputation:2,safety:3};
  for(const [t,c,p] of [[1,0,.6],[2,1,.5],[3,0,.65]]){
    assert.equal(resolveTurn(base,t,c,sequence([p-Number.EPSILON,.1])).success,true);
    assert.equal(resolveTurn(base,t,c,sequence([p,.1])).success,false);
  }
  assert.equal(resolveTurn(base,0,0,sequence([.6-Number.EPSILON])).event.kind,'none');
  for(let i=0;i<4;i++){
    assert.deepEqual(resolveTurn(base,0,0,sequence([.6,(i+.5)/4])).event,{kind:'setback',stat:KEYS[i],amount:-1});
    assert.deepEqual(resolveTurn(base,0,0,sequence([.85,(i+.5)/4])).event,{kind:'opportunity',stat:KEYS[i],amount:1});
  }
  assert.equal(resolveTurn(base,0,0,sequence([.85-Number.EPSILON,.1])).event.kind,'setback');
});
test('stats cap after each stage; terminal zero cannot be rescued',()=>{
  const s={money:1,research:5,reputation:0,safety:1};
  const e=resolveTurn(s,0,2,sequence([]));
  assert.equal(e.ending,'ruin');assert.equal(e.event.kind,'skipped');assert.equal(e.after.money,0);assert.equal(e.after.research,5);
  const r=resolveTurn({...s,money:4},4,0,sequence([]));
  assert.equal(r.ending,'ruin');assert.equal(r.after.safety,0);
  const cap=resolveTurn({...s,money:4,safety:3},0,0,sequence([.7,.1]));
  assert.equal(cap.afterChoice.money,5);assert.equal(cap.after.money,4,'cap applies before the event, not after netting');
  assert.equal(resolveTurn({...s,money:4,safety:3},0,0,sequence([.95,.1])).after.money,5);
  assert.equal(resolveTurn({...s,money:1,safety:3},0,0,sequence([.7,.6])).after.reputation,0);
});
test('all 1,296 stat combinations obey mutually exclusive ending priority',()=>{
  const seen=new Set();
  for(let m=0;m<6;m++)for(let r=0;r<6;r++)for(let p=0;p<6;p++)for(let s=0;s<6;s++){
    const stats={money:m,research:r,reputation:p,safety:s};
    for(const pass of [false,true]){
      const expected=(m===0||s===0)?'ruin':r>=4&&p>=4&&pass?'success':r>=4?'unrecognized':m>=3&&p>=2?'stable':'unfinished';
      assert.equal(classify(stats,pass),expected);seen.add(expected);
    }
  }
  assert.equal(seen.size,5);
});
test('recognition is conditional, evaluated after the last event, and drawn once',()=>{
  assert.equal(recognitionChance({money:1,research:4,reputation:4,safety:1}),.15);
  assert.equal(recognitionChance({money:1,research:4,reputation:5,safety:1}),.25);
  assert.equal(recognitionChance({money:1,research:3,reputation:5,safety:1}),0);
  for(const [p,chance] of [[3,.15],[4,.25]]){
    const stats={money:3,research:4,reputation:p,safety:2};
    assert.equal(resolveTurn(stats,5,1,sequence([.1,chance-Number.EPSILON])).ending,'success');
    assert.equal(resolveTurn(stats,5,1,sequence([.1,chance])).ending,'unrecognized');
  }
  const e=resolveTurn({money:1,research:4,reputation:3,safety:1},5,1,sequence([.6,.1]));
  assert.equal(e.ending,'ruin');assert.equal(e.recognition,null);
  assert.equal(resolveTurn({money:2,research:3,reputation:4,safety:1},5,1,sequence([.85,.3,.2])).ending,'success');
  assert.equal(resolveTurn({money:2,research:3,reputation:4,safety:1},5,1,sequence([.1])).recognition.chance,0);
});
test('turn navigation, replay, save validation, and duplicate clicks are safe',()=>{
  let g=newGame();assert.ok(validSave(g));
  g=choose(g,1,sequence([.1]));assert.ok(validSave(g));
  assert.deepEqual(choose(g,2,sequence([])),g);
  assert.deepEqual(JSON.parse(JSON.stringify(g)),g);
  g=advance(g);assert.equal(g.turn,1);assert.ok(validSave(g));
  assert.deepEqual(advance(g),g);
  assert.ok(!validSave(null));assert.ok(!validSave({version:1}));
  assert.ok(!validSave({...g,turn:6}));assert.ok(!validSave({...g,stats:{...g.stats,money:12}}));
  assert.ok(!validSave({...g,history:[]}));
  assert.deepEqual(newGame().stats,INITIAL);
  let early=choose(newGame(),2,sequence([.1]));early=advance(early);early=choose(early,2,sequence([.6,.1]));
  assert.equal(early.ending,'ruin');early=advance(early);assert.equal(early.screen,'ending');assert.equal(early.turn,1);
});
test('every reachable state and probabilistic branch matches the actual turn resolver',()=>{
  let reachable=new Map([[key(INITIAL),INITIAL]]);let cases=0;
  for(let t=0;t<6;t++){
    const next=new Map();
    for(const s of reachable.values())for(let choice=0;choice<3;choice++){
      const rule=RULES[t][choice];
      const attempts=rule.chance==null?[{p:1,rolls:[],effect:rule}]:[{p:rule.chance,rolls:[0],effect:rule.success},{p:1-rule.chance,rolls:[.999999],effect:rule.failure}];
      const observed=new Map();
      for(const a of attempts){
        const immediate=apply(s,a.effect);
        const events=ruined(immediate)?[{p:1,rolls:[]}]:[{p:.6,rolls:[.1]},...KEYS.flatMap((_,i)=>[{p:.25/4,rolls:[.7,(i+.5)/4]},{p:.15/4,rolls:[.9,(i+.5)/4]}])];
        for(const ev of events){
          const result=resolveTurn(s,t,choice,sequence([...a.rolls,...ev.rolls,.999999]));
          cases++;
          for(const k of KEYS)assert.ok(Number.isInteger(result.after[k])&&result.after[k]>=0&&result.after[k]<=5);
          const str=key(result.after);observed.set(str,(observed.get(str)||0)+a.p*ev.p);
          if(!ruined(result.after))next.set(str,result.after);
        }
      }
      const exact=new Map();for(const b of transitions(s,t,choice))exact.set(key(b.stats),(exact.get(key(b.stats))||0)+b.p);
      assert.equal(observed.size,exact.size);for(const [k,p]of exact)assert.ok(Math.abs(p-observed.get(k))<1e-12);
      assert.ok(Math.abs([...observed.values()].reduce((a,b)=>a+b,0)-1)<1e-12);
    }
    reachable=next;
  }
  console.log(`Verified ${cases.toLocaleString()} reachable probabilistic branches.`);
});
test('educational content meets requested lengths and all decisions offer three choices',()=>{
  const words=s=>s.trim().split(/\s+/).length;
  assert.ok(words(INTRO)>=60&&words(INTRO)<=90);
  for(const c of CHAPTERS){assert.equal(c.choices.length,3);assert.ok(words(c.insight)>=25&&words(c.insight)<=45,`Insight ${c.year}`);assert.ok(words(c.note)>=80&&words(c.note)<=120,`Note ${c.year}`);assert.ok(c.sources.length>0);}
  for(const ending of ['success','unrecognized','stable','unfinished','ruin']){
    const game={ending,stats:{money:ending==='ruin'?0:3,research:4,reputation:3,safety:3},history:[]};
    assert.ok(words(reflection(game))>=100&&words(reflection(game))<=150,`${ending} reflection: ${words(reflection(game))}`);
  }
});
