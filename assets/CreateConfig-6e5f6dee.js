import{u as m,N as l,a as k,b as C,_ as v}from"./_plugin-vue_export-helper-53731843.js";import{d as E,r as N,c as S,a as f,w as B,u as y,o as I,b as T,n as w,h as s}from"./index-49f4485d.js";function D(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(o){const a=Math.random()*16|0;return(o=="x"?a:a&3|8).toString(16)})}const K={class:"wrapper"},L=E({__name:"CreateConfig",setup(o){const a=(e,r)=>{const t=D();e.push(i({key:t,parentKey:r,isEdit:!0,label:""}))},c=(e,r)=>{for(let t=0;t<e.length;t++){if(e[t].key===r)return e[t].children;if(e[t].children)return c(e[t].children,r)}return[]},p=(e,r)=>{if(!r)return;const t=c(n,r),d=t.findIndex(h=>h.key===e);d!==-1&&t.splice(d,1)},i=e=>({label:e.label,key:e.key,isEdit:e.isEdit,parentKey:e.parentKey,children:[]}),n=N([(()=>i({key:"root",isEdit:!1,label:"根节点"}))()]),u=localStorage.getItem("config");if(u){const e=JSON.parse(u);n.length=0,n.push(...e)}const _=({option:e})=>e.isEdit?(w(()=>{document.querySelectorAll("input")[0].focus()}),s(C,{autofocus:!0,value:e.label,size:"small",onUpdateValue:r=>{e.label=r},onChange:()=>{e.label&&(e.isEdit=!1)},onBlur:()=>{e.label&&(e.isEdit=!1)}})):s("div",{"data-id":e.key,onClick:()=>{e.isEdit=!0}},e.label),g=({option:e})=>{const r=e.children||[],t=e.key;return s("div",{},[s(l,{text:!0,type:"primary",style:"marginLeft: 10px;",onClick:()=>a(r,t)},{default:()=>"新增"}),t!=="root"&&s(l,{text:!0,type:"error",style:"marginLeft: 10px;",onClick:()=>p(t,e.parentKey)},{default:()=>"删除"})])},x=m(),b=()=>{try{localStorage.setItem("config",JSON.stringify(n)),x.success("保存成功")}catch{x.error("保存失败")}};return(e,r)=>(I(),S("div",K,[f(y(l),{type:"primary",onClick:b,class:"save-button"},{default:B(()=>[T("保存")]),_:1}),f(y(k),{"block-line":"",data:n,selectable:!1,"render-label":_,"render-suffix":g,"default-expand-all":!0},null,8,["data"])]))}});const M=v(L,[["__scopeId","data-v-bfdcd2cc"]]);export{M as default};