import{T as U}from"./TitleofAPage-Fkba9hGH.js";import{_ as x,r as s,o as m,c as _,w as a,a as w,b as o,F as E,g as V,h as S,t as N,d as g,e as T,f as q,n as c}from"./index-OpCx98P7.js";const C={name:"PretvorbaNepredznacena",data:e=>({loading:!1,isFormValid:!1,n:"0",cpi:[],p:[],odgovor:"",postopek:"",rulesNum:[t=>Number(t)==t?!0:"Enter a valid number",t=>!!t||"Number is required"],timeout:0,panel:null,readonly:!0}),methods:{async submit(e){if(!this.isFormValid)return;this.loading=!0,this.readonly=!1,this.postopek="";let t=0;this.postopek+=`CPI = Σ (cpi[i] * p[i]) = 
`;for(let r=1;r<=Math.floor(Number(this.n));r++){let i=Number(this.cpi[r]),p=Number(this.p[r]);t+=i*p,this.postopek+=i.toString()+" * "+p.toString(),r<Math.floor(Number(this.n))&&(this.postopek+=" + ")}this.odgovor=t.toString(),console.log(this.odgovor),this.postopek+=`
 = `+this.odgovor.toString(),this.loading=!1}}},P=T("b",null,"Odgovor: ",-1),z={style:{"white-space":"pre-wrap"}};function L(e,t,r,i,p,h){const u=s("v-text-field"),b=s("v-btn"),d=s("v-form"),f=s("v-sheet"),v=s("v-expansion-panel-title"),$=s("v-expansion-panel-text"),k=s("v-expansion-panel"),y=s("v-expansion-panels"),F=s("v-container");return m(),_(F,{fluid:"",style:{display:"flex","align-items":"center","flex-direction":"column"}},{default:a(()=>[o(f,{width:"600",style:{"background-color":"transparent"}},{default:a(()=>[o(d,{modelValue:e.isFormValid,"onUpdate:modelValue":t[1]||(t[1]=n=>e.isFormValid=n),onSubmit:w(h.submit,["prevent"])},{default:a(()=>[o(u,{modelValue:e.n,"onUpdate:modelValue":t[0]||(t[0]=n=>e.n=n),rules:e.rulesNum,label:"N: Število vrts ukazov"},null,8,["modelValue","rules"]),(m(!0),V(E,null,S(Math.floor(Number(e.n)),n=>(m(),V("div",null,[(m(),_(u,{modelValue:e.cpi[n],"onUpdate:modelValue":l=>e.cpi[n]=l,label:"Število urinih period za ukaz vrste "+n.toString(),rules:e.rulesNum,key:n},null,8,["modelValue","onUpdate:modelValue","label","rules"])),(m(),_(u,{modelValue:e.p[n],"onUpdate:modelValue":l=>e.p[n]=l,label:"Pogostost ukaza vrste "+n.toString(),rules:e.rulesNum,key:n},null,8,["modelValue","onUpdate:modelValue","label","rules"]))]))),256)),o(b,{loading:e.loading,type:"submit",block:"",class:"mt-2",text:"Izracunaj"},null,8,["loading"])]),_:1},8,["modelValue","onSubmit"])]),_:1}),o(f,{width:"600",style:{"margin-top":"30px"}},{default:a(()=>[o(y,{modelValue:e.panel,"onUpdate:modelValue":t[2]||(t[2]=n=>e.panel=n),readonly:e.readonly},{default:a(()=>[o(k,null,{default:a(()=>[o(v,null,{default:a(()=>[P,g(" "+N(e.odgovor),1)]),_:1}),o($,null,{default:a(()=>[T("pre",z," "+N(e.postopek)+" ",1)]),_:1})]),_:1})]),_:1},8,["modelValue","readonly"])]),_:1})]),_:1})}const M=x(C,[["render",L]]),R={name:"PretvorbaNepredznacena",data:e=>({loading:!1,isFormValid:!1,tpcq:"",tmem:"",trfread:"",tmux:"",tale:"",tadd:"",tsetup:"",tgate:"",tse:"",format:"",formats:["Format R","LW","SW","BEQ","Format I"],odgovor:"",postopek:"",rulesNum:[t=>Number(t)==t?!0:"Enter a valid number"],timeout:0,panel:null,readonly:!0}),methods:{async submit(e){this.isFormValid&&(this.loading=!0,this.readonly=!1,this.postopek="",this.format=="Format R"&&(this.odgovor=(Number(this.tpcq)+Number(this.tmem)+Number(this.trfread)+Number(this.tmux)+Number(this.tale)+Number(this.tmux)+Number(this.tsetup)).toString(),this.postopek+=`T_CPE = T_pcq + T_mem + T_RFread + T_mux + T_ALE + T_mux + T_setup = 
`,this.postopek+=`${this.tpcq} + ${this.tmem} + ${this.trfread} + ${this.tmux} + ${this.tale} + ${this.tmux} + ${this.tsetup}`,this.postopek+=` = 
`+this.odgovor),this.format=="LW"&&(this.odgovor=(Number(this.tpcq)+Number(this.tmem)+Math.max(Number(this.trfread),Number(this.tse)+Number(this.tmux))+Number(this.tale)+Number(this.tmem)+Number(this.tmux)+Number(this.tsetup)).toString(),this.postopek+=`T_CPE = T_pcq + T_mem + max[T_RFread, T_se + T_mux] + T_ALE + T_mem + T_mux + T_setup = 
`,this.postopek+=`${this.tpcq} + ${this.tmem} + max[${this.trfread}, ${this.tse} + ${this.tmux}] + ${this.tale} + ${this.tmem} + ${this.tmux} + ${this.tsetup}`,this.postopek+=` = 
`+this.odgovor),this.format=="SW"&&(this.odgovor=(Number(this.tpcq)+Number(this.tmem)+Math.max(Number(this.trfread),Number(this.tse)+Number(this.tmux))+Number(this.tale)+Number(this.tmem)).toString(),this.postopek+=`T_CPE = T_pcq + T_mem + max(T_RFread, T_se + T_mux) + T_ALE + T_mem = 
`,this.postopek+=`${this.tpcq} + ${this.tmem} + max[${this.trfread}, ${this.tse} + ${this.tmux}] + ${this.tale} + ${this.tmem}`,this.postopek+=` = 
`+this.odgovor),this.format=="BEQ"&&(this.odgovor=(Number(this.tpcq)+Number(this.tmem)+Math.max(Number(this.trfread)+Number(this.tmux)+Number(this.tale)+Number(this.tgate),Number(this.tse)+Number(this.tadd))+Number(this.tmux)+Number(this.tsetup)).toString(),this.postopek+=`T_CPE = T_pcq + T_mem + max[T_RFread + T_mux + T_ALE + T_gate, T_se + T_add]+ T_mux + T_setup = 
`,this.postopek+=`${this.tpcq} + ${this.tmem} + max[${this.trfread} + ${this.tmux} + ${this.tale} + ${this.tgate}, ${this.tse} + ${this.tadd}] + ${this.tmux} + ${this.tsetup}`,this.postopek+=` = 
`+this.odgovor),this.format=="Format I"&&(this.odgovor=(Number(this.tpcq)+Number(this.tmem)+Math.max(Number(this.trfread),Number(this.tse)+Number(this.tmux))+Number(this.tale)+Number(this.tmux)+Number(this.tsetup)).toString(),this.postopek+=`T_CPE = T_pcq + T_mem + max[T_RFread, T_se + T_mux] + T_ALE + T_mux + T_setup = 
`,this.postopek+=`${this.tpcq} + ${this.tmem} + max[${this.trfread}, ${this.tse} + ${this.tmux}] + ${this.tale} + ${this.tmux} + ${this.tsetup}`,this.postopek+=` = 
`+this.odgovor),this.loading=!1)}}},A=T("b",null,"Odgovor: ",-1),I={style:{"white-space":"pre-wrap"}};function j(e,t,r,i,p,h){const u=s("v-text-field"),b=s("v-select"),d=s("v-btn"),f=s("v-form"),v=s("v-sheet"),$=s("v-expansion-panel-title"),k=s("v-expansion-panel-text"),y=s("v-expansion-panel"),F=s("v-expansion-panels"),n=s("v-container");return m(),_(n,{fluid:"",style:{display:"flex","align-items":"center","flex-direction":"column"}},{default:a(()=>[o(v,{width:"600",style:{"background-color":"transparent"}},{default:a(()=>[o(f,{modelValue:e.isFormValid,"onUpdate:modelValue":t[10]||(t[10]=l=>e.isFormValid=l),onSubmit:w(h.submit,["prevent"])},{default:a(()=>[o(u,{modelValue:e.tpcq,"onUpdate:modelValue":t[0]||(t[0]=l=>e.tpcq=l),rules:e.rulesNum,label:"T_pcq"},null,8,["modelValue","rules"]),o(u,{modelValue:e.tmem,"onUpdate:modelValue":t[1]||(t[1]=l=>e.tmem=l),rules:e.rulesNum,label:"T_mem"},null,8,["modelValue","rules"]),o(u,{modelValue:e.trfread,"onUpdate:modelValue":t[2]||(t[2]=l=>e.trfread=l),rules:e.rulesNum,label:"T_RFread"},null,8,["modelValue","rules"]),o(u,{modelValue:e.tmux,"onUpdate:modelValue":t[3]||(t[3]=l=>e.tmux=l),rules:e.rulesNum,label:"T_mux"},null,8,["modelValue","rules"]),o(u,{modelValue:e.tale,"onUpdate:modelValue":t[4]||(t[4]=l=>e.tale=l),rules:e.rulesNum,label:"T_ALE"},null,8,["modelValue","rules"]),o(u,{modelValue:e.tadd,"onUpdate:modelValue":t[5]||(t[5]=l=>e.tadd=l),rules:e.rulesNum,label:"T_add"},null,8,["modelValue","rules"]),o(u,{modelValue:e.tsetup,"onUpdate:modelValue":t[6]||(t[6]=l=>e.tsetup=l),rules:e.rulesNum,label:"T_setup"},null,8,["modelValue","rules"]),o(u,{modelValue:e.tgate,"onUpdate:modelValue":t[7]||(t[7]=l=>e.tgate=l),rules:e.rulesNum,label:"T_gate"},null,8,["modelValue","rules"]),o(u,{modelValue:e.tse,"onUpdate:modelValue":t[8]||(t[8]=l=>e.tse=l),rules:e.rulesNum,label:"T_se"},null,8,["modelValue","rules"]),o(b,{modelValue:e.format,"onUpdate:modelValue":t[9]||(t[9]=l=>e.format=l),items:e.formats,rules:[l=>!!l||"Format is required"],label:"Vrsta ukaza"},null,8,["modelValue","items","rules"]),o(d,{loading:e.loading,type:"submit",block:"",class:"mt-2",text:"Izracunaj"},null,8,["loading"])]),_:1},8,["modelValue","onSubmit"])]),_:1}),o(v,{width:"600",style:{"margin-top":"30px"}},{default:a(()=>[o(F,{modelValue:e.panel,"onUpdate:modelValue":t[11]||(t[11]=l=>e.panel=l),readonly:e.readonly},{default:a(()=>[o(y,null,{default:a(()=>[o($,null,{default:a(()=>[A,g(" "+N(e.odgovor),1)]),_:1}),o(k,null,{default:a(()=>[T("pre",I," "+N(e.postopek)+" ",1)]),_:1})]),_:1})]),_:1},8,["modelValue","readonly"])]),_:1})]),_:1})}const B=x(R,[["render",j]]),W={name:"CPE",data:e=>({tab:null,styleForTabs:"background-color: #D0CFCF; padding: 0px 40px;",loading:!1,timeout:0,panel:null,readonly:!0}),methods:{back(){window.history.back()}}},O=q({...W,setup(e){return(t,r)=>{const i=s("v-tab"),p=s("v-tabs"),h=s("v-window-item"),u=s("v-window"),b=s("v-card");return m(),V(E,null,[o(U,{title:"Zmogljivost CPE"}),o(b,{variant:"flat",style:{"background-color":"transparent"}},{default:a(()=>[o(p,{modelValue:t.tab,"onUpdate:modelValue":r[0]||(r[0]=d=>t.tab=d),"align-tabs":"center"},{default:a(()=>[o(i,{value:1,style:c(t.styleForTabs)},{default:a(()=>[g("CPI")]),_:1},8,["style"]),o(i,{value:2,style:c(t.styleForTabs)},{default:a(()=>[g("Trajanje operacije enociklene CPE")]),_:1},8,["style"])]),_:1},8,["modelValue"]),o(u,{modelValue:t.tab,"onUpdate:modelValue":r[1]||(r[1]=d=>t.tab=d)},{default:a(()=>[(m(),_(h,{key:1,value:1},{default:a(()=>[o(M)]),_:1})),(m(),_(h,{key:2,value:2},{default:a(()=>[o(B)]),_:1}))]),_:1},8,["modelValue"])]),_:1})],64)}}}),Z=q({__name:"CPEView",setup(e){return(t,r)=>(m(),V("main",null,[o(O)]))}});export{Z as default};