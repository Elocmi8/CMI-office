/*! For license information please see script.js.LICENSE.txt */
(()=>{"use strict";var e={910:(e,t,o)=>{o.r(t),o.d(t,{Properties:()=>r,VariableDescriptor:()=>n,bootstrapExtra:()=>X,findLayerBoundaries:()=>c,findLayersBoundaries:()=>p,getLayersMap:()=>l,getVariables:()=>i,initDoors:()=>z,initPropertiesTemplates:()=>M,initVariableActionLayer:()=>$});class r{constructor(e){this.properties=null!=e?e:[]}get(e){const t=this.properties.filter((t=>t.name===e)).map((e=>e.value));if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(0!==t.length)return t[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,t){const o=this.get(e);if(void 0!==o){if(typeof o!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return o}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,t){const o=this.get(e);if(void 0===o)throw new Error('Property "'+e+'" is missing');if(typeof o!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return o}getType(e){const t=this.properties.filter((t=>t.name===e)).map((e=>e.type));if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(0!==t.length)return t[0]}}class n{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new r(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return!e||WA.player.tags.includes(e)}get isWritable(){const e=this.properties.getString("writableBy");return!e||WA.player.tags.includes(e)}}async function i(e,t){const o=await WA.room.getTiledMap(),r=new Map;return a(o.layers,r,e,t),r}function a(e,t,o,r){for(const i of e)if("objectgroup"===i.type){for(const e of i.objects)if("variable"===e.type){if(o&&i.name!==o)continue;if(r&&!r.includes(e.name))continue;t.set(e.name,new n(e))}}else"group"===i.type&&a(i.layers,t,o,r)}let s;async function l(){return void 0===s&&(s=async function(){return function(e){const t=new Map;return u(e.layers,"",t),t}(await WA.room.getTiledMap())}()),s}function u(e,t,o){for(const r of e)"group"===r.type?u(r.layers,t+r.name+"/",o):(r.name=t+r.name,o.set(r.name,r))}function c(e){let t=1/0,o=1/0,r=0,n=0;const i=e.data;if("string"==typeof i)throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let a=0;a<e.height;a++)for(let s=0;s<e.width;s++)0!==i[s+a*e.width]&&(t=Math.min(t,s),n=Math.max(n,s),o=Math.min(o,a),r=Math.max(r,a));return{top:o,left:t,right:n+1,bottom:r+1}}function p(e){let t=1/0,o=1/0,r=0,n=0;for(const i of e){const e=c(i);e.left<t&&(t=e.left),e.top<o&&(o=e.top),e.right>n&&(n=e.right),e.bottom>r&&(r=e.bottom)}return{top:o,left:t,right:n,bottom:r}}var h=Object.prototype.toString,g=Array.isArray||function(e){return"[object Array]"===h.call(e)};function f(e){return"function"==typeof e}function d(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function y(e,t){return null!=e&&"object"==typeof e&&t in e}var m=RegExp.prototype.test,b=/\S/;var v={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},w=/\s*/,A=/\s+/,W=/\s*=/,S=/\s*\}/,B=/#|\^|\/|>|\{|&|=|!/;function C(e){this.string=e,this.tail=e,this.pos=0}function x(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function L(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}C.prototype.eos=function(){return""===this.tail},C.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var o=t[0];return this.tail=this.tail.substring(o.length),this.pos+=o.length,o},C.prototype.scanUntil=function(e){var t,o=this.tail.search(e);switch(o){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,o),this.tail=this.tail.substring(o)}return this.pos+=t.length,t},x.prototype.push=function(e){return new x(e,this)},x.prototype.lookup=function(e){var t,o,r,n=this.cache;if(n.hasOwnProperty(e))t=n[e];else{for(var i,a,s,l=this,u=!1;l;){if(e.indexOf(".")>0)for(i=l.view,a=e.split("."),s=0;null!=i&&s<a.length;)s===a.length-1&&(u=y(i,a[s])||(o=i,r=a[s],null!=o&&"object"!=typeof o&&o.hasOwnProperty&&o.hasOwnProperty(r))),i=i[a[s++]];else i=l.view[e],u=y(l.view,e);if(u){t=i;break}l=l.parent}n[e]=t}return f(t)&&(t=t.call(this.view)),t},L.prototype.clearCache=function(){void 0!==this.templateCache&&this.templateCache.clear()},L.prototype.parse=function(e,t){var o=this.templateCache,r=e+":"+(t||E.tags).join(":"),n=void 0!==o,i=n?o.get(r):void 0;return null==i&&(i=function(e,t){if(!e)return[];var o,r,n,i,a=!1,s=[],l=[],u=[],c=!1,p=!1,h="",f=0;function y(){if(c&&!p)for(;u.length;)delete l[u.pop()];else u=[];c=!1,p=!1}function v(e){if("string"==typeof e&&(e=e.split(A,2)),!g(e)||2!==e.length)throw new Error("Invalid tags: "+e);o=new RegExp(d(e[0])+"\\s*"),r=new RegExp("\\s*"+d(e[1])),n=new RegExp("\\s*"+d("}"+e[1]))}v(t||E.tags);for(var x,L,T,P,k,M,V=new C(e);!V.eos();){if(x=V.pos,T=V.scanUntil(o))for(var U=0,G=T.length;U<G;++U)i=P=T.charAt(U),function(e,t){return m.call(e,t)}(b,i)?(p=!0,a=!0,h+=" "):(u.push(l.length),h+=P),l.push(["text",P,x,x+1]),x+=1,"\n"===P&&(y(),h="",f=0,a=!1);if(!V.scan(o))break;if(c=!0,L=V.scan(B)||"name",V.scan(w),"="===L?(T=V.scanUntil(W),V.scan(W),V.scanUntil(r)):"{"===L?(T=V.scanUntil(n),V.scan(S),V.scanUntil(r),L="&"):T=V.scanUntil(r),!V.scan(r))throw new Error("Unclosed tag at "+V.pos);if(k=">"==L?[L,T,x,V.pos,h,f,a]:[L,T,x,V.pos],f++,l.push(k),"#"===L||"^"===L)s.push(k);else if("/"===L){if(!(M=s.pop()))throw new Error('Unopened section "'+T+'" at '+x);if(M[1]!==T)throw new Error('Unclosed section "'+M[1]+'" at '+x)}else"name"===L||"{"===L||"&"===L?p=!0:"="===L&&v(T)}if(y(),M=s.pop())throw new Error('Unclosed section "'+M[1]+'" at '+V.pos);return function(e){for(var t,o=[],r=o,n=[],i=0,a=e.length;i<a;++i)switch((t=e[i])[0]){case"#":case"^":r.push(t),n.push(t),r=t[4]=[];break;case"/":n.pop()[5]=t[2],r=n.length>0?n[n.length-1][4]:o;break;default:r.push(t)}return o}(function(e){for(var t,o,r=[],n=0,i=e.length;n<i;++n)(t=e[n])&&("text"===t[0]&&o&&"text"===o[0]?(o[1]+=t[1],o[3]=t[3]):(r.push(t),o=t));return r}(l))}(e,t),n&&o.set(r,i)),i},L.prototype.render=function(e,t,o,r){var n=this.getConfigTags(r),i=this.parse(e,n),a=t instanceof x?t:new x(t,void 0);return this.renderTokens(i,a,o,e,r)},L.prototype.renderTokens=function(e,t,o,r,n){for(var i,a,s,l="",u=0,c=e.length;u<c;++u)s=void 0,"#"===(a=(i=e[u])[0])?s=this.renderSection(i,t,o,r,n):"^"===a?s=this.renderInverted(i,t,o,r,n):">"===a?s=this.renderPartial(i,t,o,n):"&"===a?s=this.unescapedValue(i,t):"name"===a?s=this.escapedValue(i,t,n):"text"===a&&(s=this.rawValue(i)),void 0!==s&&(l+=s);return l},L.prototype.renderSection=function(e,t,o,r,n){var i=this,a="",s=t.lookup(e[1]);if(s){if(g(s))for(var l=0,u=s.length;l<u;++l)a+=this.renderTokens(e[4],t.push(s[l]),o,r,n);else if("object"==typeof s||"string"==typeof s||"number"==typeof s)a+=this.renderTokens(e[4],t.push(s),o,r,n);else if(f(s)){if("string"!=typeof r)throw new Error("Cannot use higher-order sections without the original template");null!=(s=s.call(t.view,r.slice(e[3],e[5]),(function(e){return i.render(e,t,o,n)})))&&(a+=s)}else a+=this.renderTokens(e[4],t,o,r,n);return a}},L.prototype.renderInverted=function(e,t,o,r,n){var i=t.lookup(e[1]);if(!i||g(i)&&0===i.length)return this.renderTokens(e[4],t,o,r,n)},L.prototype.indentPartial=function(e,t,o){for(var r=t.replace(/[^ \t]/g,""),n=e.split("\n"),i=0;i<n.length;i++)n[i].length&&(i>0||!o)&&(n[i]=r+n[i]);return n.join("\n")},L.prototype.renderPartial=function(e,t,o,r){if(o){var n=this.getConfigTags(r),i=f(o)?o(e[1]):o[e[1]];if(null!=i){var a=e[6],s=e[5],l=e[4],u=i;0==s&&l&&(u=this.indentPartial(i,l,a));var c=this.parse(u,n);return this.renderTokens(c,t,o,u,r)}}},L.prototype.unescapedValue=function(e,t){var o=t.lookup(e[1]);if(null!=o)return o},L.prototype.escapedValue=function(e,t,o){var r=this.getConfigEscape(o)||E.escape,n=t.lookup(e[1]);if(null!=n)return"number"==typeof n&&r===E.escape?String(n):r(n)},L.prototype.rawValue=function(e){return e[1]},L.prototype.getConfigTags=function(e){return g(e)?e:e&&"object"==typeof e?e.tags:void 0},L.prototype.getConfigEscape=function(e){return e&&"object"==typeof e&&!g(e)?e.escape:void 0};var E={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){T.templateCache=e},get templateCache(){return T.templateCache}},T=new L;E.clearCache=function(){return T.clearCache()},E.parse=function(e,t){return T.parse(e,t)},E.render=function(e,t,o,r){if("string"!=typeof e)throw new TypeError('Invalid template! Template should be a "string" but "'+(g(n=e)?"array":typeof n)+'" was given as the first argument for mustache#render(template, view, partials)');var n;return T.render(e,t,o,r)},E.escape=function(e){return String(e).replace(/[&<>"'`=\/]/g,(function(e){return v[e]}))},E.Scanner=C,E.Context=x,E.Writer=L;const P=E;class k{constructor(e,t){this.template=e,this.state=t,this.ast=P.parse(e)}getValue(){return void 0===this.value&&(this.value=P.render(this.template,this.state)),this.value}onChange(e){const t=[];for(const o of this.getUsedVariables().values())t.push(this.state.onVariableChange(o).subscribe((()=>{const t=P.render(this.template,this.state);t!==this.value&&(this.value=t,e(this.value))})));return{unsubscribe:()=>{for(const e of t)e.unsubscribe()}}}isPureString(){return 0===this.ast.length||1===this.ast.length&&"text"===this.ast[0][0]}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,t){for(const o of e){const e=o[0],r=o[1],n=o[4];["name","&","#","^"].includes(e)&&t.add(r),void 0!==n&&"string"!=typeof n&&this.recursiveGetUsedVariables(n,t)}}}async function M(){var e;const t=await l();for(const[o,r]of t.entries()){const t=null!==(e=r.properties)&&void 0!==e?e:[];for(const e of t){if("int"===e.type||"bool"===e.type||"object"===e.type||"string"!=typeof e.value)continue;const t=new k(e.value,WA.state);if(t.isPureString())continue;const r=t.getValue();V(o,e.name,r),t.onChange((t=>{V(o,e.name,t)}))}}}function V(e,t,o){WA.room.setProperty(e,t,o),"visible"===t&&(o?WA.room.showLayer(e):WA.room.hideLayer(e))}const U="https://unpkg.com/@workadventure/scripting-api-extra@1.2.0/dist";let G,j,I=0,O=0;function R(e){if(WA.state[e.name]){let t=e.properties.mustGetString("openLayer");for(const e of t.split("\n"))WA.room.showLayer(e);t=e.properties.mustGetString("closeLayer");for(const e of t.split("\n"))WA.room.hideLayer(e)}else{let t=e.properties.mustGetString("openLayer");for(const e of t.split("\n"))WA.room.hideLayer(e);t=e.properties.mustGetString("closeLayer");for(const e of t.split("\n"))WA.room.showLayer(e)}}function N(e){return e.map((e=>G.get(e))).filter((e=>"tilelayer"===(null==e?void 0:e.type)))}function D(e){const t=p(N(e)),o=32*((t.right-t.left)/2+t.left),r=32*((t.bottom-t.top)/2+t.top);return Math.sqrt(Math.pow(I-o,2)+Math.pow(O-r,2))}function _(e){WA.state.onVariableChange(e.name).subscribe((()=>{WA.state[e.name]?function(e){const t=e.properties.getString("openSound"),o=e.properties.getNumber("soundRadius");let r=1;if(o){const t=D(e.properties.mustGetString("openLayer").split("\n"));if(t>o)return;r=1-t/o}t&&WA.sound.loadSound(t).play({volume:r})}(e):function(e){const t=e.properties.getString("closeSound"),o=e.properties.getNumber("soundRadius");let r=1;if(o){const t=D(e.properties.mustGetString("closeLayer").split("\n"));if(t>o)return;r=1-t/o}t&&WA.sound.loadSound(t).play({volume:r})}(e),R(e)})),R(e)}function F(e,t,o,r){const n=e.name;let i,a,s=!1;const l=o.getString("tag");let u=!0;l&&!WA.player.tags.includes(l)&&(u=!1);const c=!!l;function h(){var e;i&&i.remove(),i=WA.ui.displayActionMessage({message:null!==(e=o.getString("closeTriggerMessage"))&&void 0!==e?e:"Press SPACE to close the door",callback:()=>{WA.state[t.name]=!1,g()}})}function g(){var e;i&&i.remove(),i=WA.ui.displayActionMessage({message:null!==(e=o.getString("openTriggerMessage"))&&void 0!==e?e:"Press SPACE to open the door",callback:()=>{WA.state[t.name]=!0,h()}})}function f(){a&&(WA.room.website.delete(a.name),a=void 0)}WA.room.onEnterLayer(n).subscribe((()=>{s=!0,o.getBoolean("autoOpen")&&u?WA.state[t.name]=!0:WA.state[t.name]||(!c||u)&&c||!o.getString("code")&&!o.getString("codeVariable")?u&&(WA.state[t.name]?h():g()):function(e){const o=p(N(t.properties.mustGetString("closeLayer").split("\n")));a=WA.room.website.create({name:"doorKeypad"+e,url:r+"/keypad.html#"+encodeURIComponent(e),position:{x:32*o.right,y:32*o.top,width:96,height:128},allowApi:!0})}(n)})),WA.room.onLeaveLayer(n).subscribe((()=>{s=!1,o.getBoolean("autoClose")&&(WA.state[t.name]=!1),i&&i.remove(),f()})),WA.state.onVariableChange(t.name).subscribe((()=>{s&&(o.getBoolean("autoClose")||!0!==WA.state[t.name]||h(),a&&!0===WA.state[t.name]&&f(),o.getBoolean("autoOpen")||!1!==WA.state[t.name]||g())}))}function Z(e){void 0===WA.state[e.name]&&(WA.state[e.name]=0),WA.state.onVariableChange(e.name).subscribe((()=>{WA.state[e.name]&&function(e){const t=e.properties.mustGetString("bellSound"),o=e.properties.getNumber("soundRadius");let r=1;if(o){const t=Math.sqrt(Math.pow(e.x-I,2)+Math.pow(e.y-O,2));if(t>o)return;r=1-t/o}WA.sound.loadSound(t).play({volume:r})}(e)}))}function q(e,t,o){let r;const n=t.getString("bellPopup");WA.room.onEnterLayer(o).subscribe((()=>{var o;n?r=WA.ui.openPopup(n,"",[{label:null!==(o=t.getString("bellButtonText"))&&void 0!==o?o:"Ring",callback:()=>{WA.state[e]=WA.state[e]+1}}]):WA.state[e]=WA.state[e]+1})),WA.room.onLeaveLayer(o).subscribe((()=>{r&&(r.close(),r=void 0)}))}async function z(e){e=null!=e?e:U;const t=await i();G=await l();for(const e of t.values())e.properties.get("door")&&_(e),e.properties.get("bell")&&Z(e);for(const o of G.values()){const n=new r(o.properties),i=n.getString("doorVariable");if(i&&"tilelayer"===o.type){const r=t.get(i);if(void 0===r)throw new Error('Cannot find variable "'+i+'" referred in the "doorVariable" property of layer "'+o.name+'"');F(o,r,n,e)}const a=n.getString("bellVariable");a&&q(a,n,o.name)}WA.player.onPlayerMove((e=>{I=e.x,O=e.y}))}function $(e,t){const o=e.getString("bindVariable");o&&function(e,t,o,r,n,i){i&&!WA.player.tags.includes(i)||(void 0!==o&&WA.room.onEnterLayer(t).subscribe((()=>{n||(WA.state[e]=o)})),void 0!==r&&WA.room.onLeaveLayer(t).subscribe((()=>{WA.state[e]=r})))}(o,t,e.get("enterValue"),e.get("leaveValue"),e.getString("triggerMessage"),e.getString("tag"))}function H(e,t){let o;const r=t.getString("zone");if(!r)throw new Error('Missing "zone" property');const n=t.getString("openConfigAdminTag");let i=!0;function a(){WA.nav.closeCoWebSite()}n&&!WA.player.tags.includes(n)&&(i=!1),WA.room.onEnterZone(r,(()=>{const r=t.getString("openConfigTrigger");var n;i&&(r&&"onaction"===r?(o&&o.remove(),o=WA.ui.displayActionMessage({message:null!==(n=t.getString("openConfigTriggerMessage"))&&void 0!==n?n:"Press SPACE or touch here to configure",callback:()=>K(e)})):K(e))})),WA.room.onLeaveZone(r,(()=>{o?(o.remove(),a()):a()}))}function K(e){const t=e?"#"+e:"";WA.nav.openCoWebSite(U+"/configuration.html"+t,!0)}const J=[{lowerBound:0,uppperBound:.5,config:{width:250,height:390,scale:1}},{lowerBound:.5,uppperBound:.8,config:{width:224,height:350,scale:.9}},{lowerBound:.8,uppperBound:1.25,config:{width:132,height:211,scale:.53}},{lowerBound:1.25,uppperBound:2.28,config:{width:64,height:99,scale:.25}},{lowerBound:1.25,config:{width:39,height:63,scale:.16}}],Q=[{lowerBound:0,uppperBound:1,config:{width:427,height:270,scale:1}},{lowerBound:1,uppperBound:1.9,config:{width:300,height:188,scale:.7}},{lowerBound:1.9,uppperBound:3.5,config:{width:150,height:94,scale:.35}},{lowerBound:3.5,uppperBound:5,config:{width:93,height:58,scale:.21}},{lowerBound:4,config:{width:75,height:46,scale:.17}}];function X(){return WA.onInit().then((()=>{z().catch((e=>console.error(e))),async function(){const e=await l();for(const t of e.values())$(new r(t.properties),t.name)}().catch((e=>console.error(e))),async function(e){const t=await WA.room.getTiledMap();e=null!=e?e:U,j=await l();const o=t.layers.find((e=>"configuration"===e.name));if(o){const t=new r(o.properties).getString("tag");t&&!WA.player.tags.includes(t)||WA.ui.registerMenuCommand("Configure the room",(()=>{WA.nav.openCoWebSite(e+"/configuration.html",!0)}));for(const e of j.values()){const t=new r(e.properties),o=t.getString("openConfig");o&&"tilelayer"===e.type&&H(o,t)}}}().catch((e=>console.error(e))),M().catch((e=>console.error(e))),async function(){var e,t;const o=WA.player.state.tutorialDone,r=/Mobi|Android/i.test(navigator.userAgent),n=await WA.room.getTiledMap(),i=null!==(t=(await(null===(e=n.properties)||void 0===e?void 0:e.find((e=>"tutorial"===e.name)))).value)&&void 0!==t&&t;if(!o&&i){!function(e){let t={allow:"",name:"tutorial",url:"/tutorial.html",position:{height:224,width:407,x:16,y:-112},visible:!0,allowApi:!0,origin:"player",scale:.9};e&&(t={...t,position:{x:32,y:-225,height:390,width:250},scale:1}),WA.room.website.create(t)}(r);let e,t=await WA.player.getPosition();const o=await WA.room.website.get("tutorial"),n=()=>{const r=t.x+o.x+o.width>e.x+e.width,n=t.x+o.x<e.x,i=t.y+o.y+o.height>e.y+e.height,a=t.y+o.y<e.y;r?o.x=-o.width-24:n&&(o.x=24),i?o.y=-o.height:a&&(o.y=16)},i=e=>{o.width=e.width,o.height=e.height,o.scale=e.scale},a=e=>{const t=(r?J:Q).filter((t=>{if(t.lowerBound&&t.uppperBound)return t.lowerBound<e&&e<=t.uppperBound;if(t.lowerBound&&!t.uppperBound)return t.lowerBound<e;if(!t.lowerBound&&t.uppperBound)return e<=t.uppperBound;throw new Error(`Zoom level of: ${e} could not fit in any of the desktopConfig's ranges.`)}));i(t[0].config)},s=()=>{if(void 0===e)return;const t=e.zoom;a(t),n()};WA.player.onPlayerMove((e=>{t=e,s()})),WA.camera.onCameraUpdate().subscribe((t=>{e=t,s()})),WA.player.state.tutorialDone=!0}}().catch((e=>console.error(e)))})).catch((e=>console.error(e)))}}},t={};function o(r){var n=t[r];if(void 0!==n)return n.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,o),i.exports}o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{let e;(0,o(910).bootstrapExtra)().catch((e=>console.error(e)));const t=new Date,r=t.getHours()+":"+t.getMinutes();function n(){void 0!==e&&(e.close(),e=void 0)}WA.room.onEnterLayer("clockZone").subscribe((()=>{console.log("toto"),e=WA.ui.openPopup("clockPopup","It's "+r,[])})),WA.room.onLeaveLayer("clockZone").subscribe(n),WA.room.onEnterLayer("FollowUs").subscribe((()=>{e=WA.ui.openPopup("socialmedia","Follow us on",[{label:"Facebook",className:"primary",callback:()=>WA.nav.openTab("https://www.facebook.com/CMIRennes")},{label:"Insta",className:"error",callback:()=>WA.nav.openTab("https://www.instagram.com/cmirennes/")},{label:"Twitter",className:"primary",callback:()=>WA.nav.openTab("https://twitter.com/CMIRennes")}])})),WA.room.onLeaveLayer("FollowUs").subscribe(n),WA.room.onEnterLayer("attenteBureau1").subscribe((()=>{e=WA.ui.openPopup("bureau1","If there is already 2 people inside, please wait here.",[])})),WA.room.onLeaveLayer("attenteBureau1").subscribe(n),WA.room.onEnterLayer("attenteBureau2").subscribe((()=>{e=WA.ui.openPopup("bureau2","If there is already 2 people inside, please wait here.",[])})),WA.room.onLeaveLayer("attenteBureau2").subscribe(n),WA.room.onEnterLayer("attenteBureau3").subscribe((()=>{e=WA.ui.openPopup("bureau3","If there is already 2 people inside, please wait here.",[])})),WA.room.onLeaveLayer("attenteBureau3").subscribe(n),WA.room.onEnterLayer("attenteBureau4").subscribe((()=>{e=WA.ui.openPopup("bureau4","If there is already 2 people inside, please wait here.",[])})),WA.room.onLeaveLayer("attenteBureau4").subscribe(n)})()})();
//# sourceMappingURL=script.js.map