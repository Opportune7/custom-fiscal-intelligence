/* Deterministic synthetic records. Not official rates, policy instruments or Customs data. */
(function(root){
'use strict';
const products=[['100630','10','Cereals','Milled rice',.20],['270900','27','Mineral fuels','Crude petroleum',.05],['300490','30','Pharmaceuticals','Medicaments',.05],['390120','39','Plastics','Polyethylene',.10],['720839','72','Iron & steel','Flat-rolled steel',.10],['840890','84','Machinery','Industrial engines',.05],['850440','85','Electrical','Static converters',.10],['870323','87','Vehicles','Passenger vehicles',.35],['180100','18','Cocoa','Cocoa beans',.05],['520100','52','Cotton','Raw cotton',.05]];
const ports=['Apapa','Tin Can Island','Onne','Port Harcourt','Kano','Lagos Airport'];
const countries=['China','India','Netherlands','United States','Germany','Ghana'];
const procedures=['Home use','Bonded warehouse','Temporary admission','Free zone'];
const schemes=['None','Industrial concession','Medical relief','Regional preference'];
const components=['ID','VAT','Levy','EXC'];
let seed=20261121;
function random(){seed=(Math.imul(1664525,seed)+1013904223)>>>0;return seed/4294967296;}
const db={headers:[],lines:[],assessments:[],payments:[],approvals:[],audits:[],rules:[],meta:{snapshot:'DEMO-001',version:'synthetic-v1',cutoff:'2026-10-31',seed:20261121}};
for(let i=0;i<products.length;i++) db.rules.push({id:'RULE-'+products[i][0],hs:products[i][0],start:'2022-01-01',end:'2026-12-31',duty:products[i][4],vat:.075,levy:.02,excise:i===7?.05:0,status:'Illustrative; not legally validated'});
for(let i=1;i<=36;i++) db.approvals.push({id:'APR-'+String(i).padStart(3,'0'),scheme:schemes[1+(i%3)],trader:'TR-'+String(i).padStart(4,'0'),ceiling:0,expiry:'2026-12-31',legalBasis:'DEMO instrument / policy validation required'});
function createRow(y,m,i,live=false){
 const idx=Math.floor(random()*products.length),p=products[idx];
 const id=(live?'LIVE-':'DEC-')+y+String(m+1).padStart(2,'0')+'-'+String(i).padStart(4,'0');
 const flow=random()<.19?'Export':'Import',port=ports[Math.floor(random()*ports.length)],country=countries[Math.floor(random()*countries.length)];
 const trader='TR-'+String(1+Math.floor(random()*120)).padStart(4,'0');
 const value=Math.round((60e6+random()*1300e6)*(1+(y-2022)*.13)*(1+.12*Math.sin((m-2)*Math.PI/6))*(idx===1?2.3:1));
 const scheme=flow==='Import'&&random()<.3?schemes[1+Math.floor(random()*3)]:'None';
 const approval=scheme==='None'?null:db.approvals.filter(a=>a.scheme===scheme)[Math.floor(random()*12)];
 const header={id,date:`${y}-${String(m+1).padStart(2,'0')}-${String(1+Math.floor(random()*28)).padStart(2,'0')}`,year:y,month:m+1,flow,port,country,trader:approval?approval.trader:trader,cohort:parseInt((approval?approval.trader:trader).slice(3))<50?'Established':'Emerging',procedure:flow==='Export'?'Export':procedures[Math.floor(random()*procedures.length)],status:'Accepted'};
 const line={id:id+'-1',declarationId:id,hs:p[0],chapter:p[1],section:p[2],description:p[3],value,weight:Math.round(value/(500+idx*270)),unit:'kg',scheme,approvalId:approval?.id||null,band:Math.round(p[4]*100)+'%',policy:idx===5?'Machinery pilot':'Baseline'};
 db.headers.push(header);db.lines.push(line);
 const rule=db.rules[idx];let total=0;
 components.forEach((component,k)=>{
  const rate=flow==='Export'?0:[rule.duty,rule.vat,rule.levy,rule.excise][k];
  // Simplified independent bases; no assertion about Nigeria's statutory tax waterfall.
  const benchmark=Math.round(value*rate), relief=Math.round(benchmark*(scheme==='None'?0:scheme==='Regional preference'?.2:scheme==='Medical relief'?.8:.45));
  const assessed=benchmark-relief,assessmentId=line.id+'-'+component;
  db.assessments.push({id:assessmentId,lineId:line.id,component,base:value,rate,benchmark,relief,assessed,ruleId:rule.id});total+=assessed;
  const paid=Math.round(assessed*(.89+random()*.105)),refund=Math.round(paid*(random()<.12?.015:0));
  db.payments.push({id:'PAY-'+assessmentId,assessmentId,date:header.date,gross:paid,refund,reversal:0,net:paid-refund});
 });
 const flagged=random()<.13,overdue=['Bonded warehouse','Temporary admission'].includes(header.procedure)&&random()<.28;
 db.audits.push({lineId:line.id,flag:flagged?['Valuation review','Classification review','Origin review'][Math.floor(random()*3)]:'No flag',overdue,open:overdue||random()<.22,bond:header.procedure==='Home use'||flow==='Export'?0:Math.round(total*1.1),additional:flagged?Math.round(total*.06):0,recovery:flagged?Math.round(total*.04):0,exportSupport:flow==='Export'&&random()<.3?Math.round(value*.025):0});
 return id;
}
for(let y=2022;y<=2026;y++)for(let m=0;m<(y===2026?10:12);m++)for(let i=0;i<84;i++)createRow(y,m,i);
function refreshCeilings(){const use=new Map();db.lines.forEach(l=>{if(l.approvalId) use.set(l.id,l.approvalId);});const totals={};db.assessments.forEach(a=>{const id=use.get(a.lineId);if(id)totals[id]=(totals[id]||0)+a.relief;});db.approvals.forEach(a=>a.ceiling=Math.ceil((totals[a.id]||1)*1.3));}
refreshCeilings();
function join(){const h=new Map(db.headers.map(x=>[x.id,x])),p=new Map(db.payments.map(x=>[x.assessmentId,x])),a=new Map(),u=new Map(db.audits.map(x=>[x.lineId,x]));db.assessments.forEach(x=>{if(!a.has(x.lineId))a.set(x.lineId,[]);a.get(x.lineId).push({...x,payment:p.get(x.id)});});return db.lines.map(l=>({...h.get(l.declarationId),...l,audit:u.get(l.id),taxes:a.get(l.id)||[]}));}
let tick=0;const initialSeed=seed,initialLengths=Object.fromEntries(Object.entries(db).filter(([,v])=>Array.isArray(v)).map(([k,v])=>[k,v.length]));
root.FiscalData={db,products,ports,countries,procedures,schemes,components,join,get streamCount(){return tick;},append(){tick++;createRow(2026,9,84+tick,true);db.meta.snapshot='DEMO-'+String(tick+1).padStart(3,'0');return join();},reset(){Object.entries(initialLengths).forEach(([k,n])=>db[k].length=n);seed=initialSeed;tick=0;db.meta.snapshot='DEMO-001';return join();},restore(count){this.reset();for(let i=0;i<count;i++)this.append();return join();}};
if(typeof module!=='undefined')module.exports=root.FiscalData;
})(typeof window!=='undefined'?window:globalThis);
