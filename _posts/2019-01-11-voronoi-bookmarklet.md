---
layout: post
title: Voronoizer bookmarklet
date: 2019-01-11 12:00:00
tag: weird
---

As promised in my previous post on the ["voronoizer"]({% post_url 2019-01-10-voronoize-this-page %}), I have made the voronoizer into a bookmarklet that you can run on any page whose Content Security Policy permits.

Step 1.  Drag the following link into your bookmarks toolbar: <a href='javascript:var voronoize=function(t){var e={};function n(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(i,s,function(e){return t[e]}.bind(null,s));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);const i=Math.pow(2,-52);class s{static from(t,e,n){e||(e=d),n||(n=f);const i=t.length,r=new Float64Array(2*i);for(let s=0;s<i;s++){const i=t[s];r[2*s]=e(i),r[2*s+1]=n(i)}return new s(r)}constructor(t){let e=1/0,n=1/0,s=-1/0,d=-1/0;const f=t.length>>1,y=this.ids=new Uint32Array(f);if(f>0&&"number"!=typeof t[0])throw new Error("Expected coords to contain numbers.");this.coords=t;for(let i=0;i<f;i++){const r=t[2*i],o=t[2*i+1];r<e&&(e=r),o<n&&(n=o),r>s&&(s=r),o>d&&(d=o),y[i]=i}const g=(e+s)/2,x=(n+d)/2;let m,_,v,p=1/0;for(let e=0;e<f;e++){const n=r(g,x,t[2*e],t[2*e+1]);n<p&&(m=e,p=n)}const w=t[2*m],b=t[2*m+1];p=1/0;for(let e=0;e<f;e++){if(e===m)continue;const n=r(w,b,t[2*e],t[2*e+1]);n<p&&n>0&&(_=e,p=n)}let k=t[2*_],T=t[2*_+1],E=1/0;for(let e=0;e<f;e++){if(e===m||e===_)continue;const n=l(w,b,k,T,t[2*e],t[2*e+1]);n<E&&(v=e,E=n)}let M=t[2*v],P=t[2*v+1];if(E===1/0)throw new Error("No Delaunay triangulation exists for this input.");if(o(w,b,k,T,M,P)){const t=_,e=k,n=T;_=v,k=M,T=P,v=t,M=e,P=n}const S=function(t,e,n,i,s,r){const o=n-t,l=i-e,h=s-t,a=r-e,c=o*o+l*l,u=h*h+a*a,d=o*a-l*h;return{x:t+.5*(a*c-l*u)/d,y:e+.5*(o*u-h*c)/d}}(w,b,k,T,M,P);this._cx=S.x,this._cy=S.y,function t(e,n,i,s,r,o){let l,h,a;if(s-i<=20)for(l=i+1;l<=s;l++){for(a=e[l],h=l-1;h>=i&&c(n,e[h],a,r,o)>0;)e[h+1]=e[h--];e[h+1]=a}else{const d=i+s>>1;for(h=s,u(e,d,l=i+1),c(n,e[i],e[s],r,o)>0&&u(e,i,s),c(n,e[l],e[s],r,o)>0&&u(e,l,s),c(n,e[i],e[l],r,o)>0&&u(e,i,l),a=e[l];;){do{l++}while(c(n,e[l],a,r,o)<0);do{h--}while(c(n,e[h],a,r,o)>0);if(h<l)break;u(e,l,h)}e[i+1]=e[h],e[h]=a,s-l+1>=h-i?(t(e,n,l,s,r,o),t(e,n,i,h-1,r,o)):(t(e,n,i,h-1,r,o),t(e,n,l,s,r,o))}}(y,t,0,y.length-1,S.x,S.y),this._hashSize=Math.ceil(Math.sqrt(f)),this._hash=new Array(this._hashSize);let A=this.hull=h(t,m);this._hashEdge(A),A.t=0,A=h(t,_,A),this._hashEdge(A),A.t=1,A=h(t,v,A),this._hashEdge(A),A.t=2;const L=2*f-5,$=this.triangles=new Uint32Array(3*L),z=this.halfedges=new Int32Array(3*L);this.trianglesLen=0,this._addTriangle(m,_,v,-1,-1,-1);for(let e,n,s=0;s<y.length;s++){const r=y[s],l=t[2*r],c=t[2*r+1];if(s>0&&Math.abs(l-e)<=i&&Math.abs(c-n)<=i)continue;if(e=l,n=c,r===m||r===_||r===v)continue;const u=this._hashKey(l,c);let d,f=u;do{d=this._hash[f],f=(f+1)%this._hashSize}while((!d||d.removed)&&f!==u);for(A=d=d.prev;!o(l,c,A.x,A.y,A.next.x,A.next.y);)if((A=A.next)===d){A=null;break}if(!A)continue;const g=A===d;let x=this._addTriangle(A.i,r,A.next.i,-1,-1,A.t);A.t=x,(A=h(t,r,A)).t=this._legalize(x+2);let p=A.next;for(;o(l,c,p.x,p.y,p.next.x,p.next.y);)x=this._addTriangle(p.i,r,p.next.i,p.prev.t,-1,p.t),p.prev.t=this._legalize(x+2),this.hull=a(p),p=p.next;if(g)for(p=A.prev;o(l,c,p.prev.x,p.prev.y,p.x,p.y);)x=this._addTriangle(p.prev.i,r,p.i,-1,p.t,p.prev.t),this._legalize(x+2),p.prev.t=x,this.hull=a(p),p=p.prev;this._hashEdge(A),this._hashEdge(A.prev)}this.triangles=$.subarray(0,this.trianglesLen),this.halfedges=z.subarray(0,this.trianglesLen)}_hashEdge(t){this._hash[this._hashKey(t.x,t.y)]=t}_hashKey(t,e){return Math.floor(function(t,e){const n=t/(Math.abs(t)+Math.abs(e));return(e>0?3-n:1+n)/4}(t-this._cx,e-this._cy)*this._hashSize)%this._hashSize}_legalize(t){const{triangles:e,coords:n,halfedges:i}=this,s=i[t],r=t-t%3,o=s-s%3,l=r+(t+1)%3,h=r+(t+2)%3,a=o+(s+2)%3;if(-1===s)return h;const c=e[h],u=e[t],d=e[l],f=e[a];if(function(t,e,n,i,s,r,o,l){const h=t-o,a=e-l,c=n-o,u=i-l,d=s-o,f=r-l,y=c*c+u*u,g=d*d+f*f;return h*(u*g-y*f)-a*(c*g-y*d)+(h*h+a*a)*(c*f-u*d)<0}(n[2*c],n[2*c+1],n[2*u],n[2*u+1],n[2*d],n[2*d+1],n[2*f],n[2*f+1])){e[t]=f,e[s]=c;const n=i[a];if(-1===n){let e=this.hull;do{if(e.t===a){e.t=t;break}e=e.next}while(e!==this.hull)}this._link(t,n),this._link(s,i[h]),this._link(h,a);const r=o+(s+1)%3;return this._legalize(t),this._legalize(r)}return h}_link(t,e){this.halfedges[t]=e,-1!==e&&(this.halfedges[e]=t)}_addTriangle(t,e,n,i,s,r){const o=this.trianglesLen;return this.triangles[o]=t,this.triangles[o+1]=e,this.triangles[o+2]=n,this._link(o,i),this._link(o+1,s),this._link(o+2,r),this.trianglesLen+=3,o}}function r(t,e,n,i){const s=t-n,r=e-i;return s*s+r*r}function o(t,e,n,i,s,r){return(i-e)*(s-n)-(n-t)*(r-i)<0}function l(t,e,n,i,s,r){const o=n-t,l=i-e,h=s-t,a=r-e,c=o*o+l*l,u=h*h+a*a,d=o*a-l*h,f=.5*(a*c-l*u)/d,y=.5*(o*u-h*c)/d;return c&&u&&d&&f*f+y*y||1/0}function h(t,e,n){const i={i:e,x:t[2*e],y:t[2*e+1],t:0,prev:null,next:null,removed:!1};return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function a(t){return t.prev.next=t.next,t.next.prev=t.prev,t.removed=!0,t.prev}function c(t,e,n,i,s){return r(t[2*e],t[2*e+1],i,s)-r(t[2*n],t[2*n+1],i,s)||t[2*e]-t[2*n]||t[2*e+1]-t[2*n+1]}function u(t,e,n){const i=t[e];t[e]=t[n],t[n]=i}function d(t){return t[0]}function f(t){return t[1]}const y=1e-6;class g{constructor(){this._x0=this._y0=this._x1=this._y1=null,this._=""}moveTo(t,e){this._+=`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}`}closePath(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")}lineTo(t,e){this._+=`L${this._x1=+t},${this._y1=+e}`}arc(t,e,n){const i=(t=+t)+(n=+n),s=e=+e;if(n<0)throw new Error("negative radius");null===this._x1?this._+=`M${i},${s}`:(Math.abs(this._x1-i)>y||Math.abs(this._y1-s)>y)&&(this._+="L"+i+","+s),n&&(this._+=`A${n},${n},0,1,1,${t-n},${e}A${n},${n},0,1,1,${this._x1=i},${this._y1=s}`)}rect(t,e,n,i){this._+=`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}h${+n}v${+i}h${-n}Z`}value(){return this._||null}}class x{constructor(){this._=[]}moveTo(t,e){this._.push([t,e])}closePath(){this._.push(this._[0].slice())}lineTo(t,e){this._.push([t,e])}value(){return this._.length?this._:null}}class m{constructor(t,[e,n,i,s]=[0,0,960,500]){if(!((i=+i)>=(e=+e)&&(s=+s)>=(n=+n)))throw new Error("invalid bounds");const{points:r,hull:o,triangles:l}=this.delaunay=t,h=this.circumcenters=new Float64Array(l.length/3*2),a=this.vectors=new Float64Array(2*r.length);this.xmax=i,this.xmin=e,this.ymax=s,this.ymin=n;for(let t=0,e=0,n=l.length;t<n;t+=3,e+=2){const n=2*l[t],i=2*l[t+1],s=2*l[t+2],o=r[n],a=r[n+1],c=r[i],u=r[i+1],d=r[s],f=r[s+1],y=o-c,g=o-d,x=a-u,m=a-f,_=o*o+a*a,v=_-c*c-u*u,p=_-d*d-f*f,w=2*(g*x-y*m);h[e]=(x*p-m*v)/w,h[e+1]=(g*v-y*p)/w}let c,u,d,f=o,y=4*f.i,g=f.x,x=f.y;do{c=y,u=g,d=x,y=4*(f=f.next).i,g=f.x,x=f.y,a[c+2]=a[y]=d-x,a[c+3]=a[y+1]=g-u}while(f!==o)}render(t){const e=null==t?t=new g:void 0,{delaunay:{halfedges:n,hull:i},circumcenters:s,vectors:r}=this;for(let e=0,i=n.length;e<i;++e){const i=n[e];if(i<e)continue;const r=2*Math.floor(e/3),o=2*Math.floor(i/3),l=s[r],h=s[r+1],a=s[o],c=s[o+1];this._renderSegment(l,h,a,c,t)}let o=i;do{o=o.next;const e=2*Math.floor(o.t/3),n=s[e],i=s[e+1],l=4*o.i,h=this._project(n,i,r[l+2],r[l+3]);h&&this._renderSegment(n,i,h[0],h[1],t)}while(o!==i);return e&&e.value()}renderBounds(t){const e=null==t?t=new g:void 0;return t.rect(this.xmin,this.ymin,this.xmax-this.xmin,this.ymax-this.ymin),e&&e.value()}renderCell(t,e){const n=null==e?e=new g:void 0,i=this._clip(t);if(null!==i){e.moveTo(i[0],i[1]);for(let t=2,n=i.length;t<n;t+=2)e.lineTo(i[t],i[t+1]);return e.closePath(),n&&n.value()}}*cellPolygons(){const{delaunay:{points:t}}=this;for(let e=0,n=t.length/2;e<n;++e){const t=this.cellPolygon(e);t&&(yield t)}}cellPolygon(t){const e=new x;return this.renderCell(t,e),e.value()}_renderSegment(t,e,n,i,s){let r;const o=this._regioncode(t,e),l=this._regioncode(n,i);0===o&&0===l?(s.moveTo(t,e),s.lineTo(n,i)):(r=this._clipSegment(t,e,n,i,o,l))&&(s.moveTo(r[0],r[1]),s.lineTo(r[2],r[3]))}contains(t,e,n){return(e=+e)==e&&(n=+n)==n&&this.delaunay._step(t,e,n)===t}_cell(t){const{circumcenters:e,delaunay:{inedges:n,halfedges:i,triangles:s}}=this,r=n[t];if(-1===r)return null;const o=[];let l=r;do{const n=Math.floor(l/3);if(o.push(e[2*n],e[2*n+1]),s[l=l%3==2?l-2:l+1]!==t)break;l=i[l]}while(l!==r&&-1!==l);return o}_clip(t){const e=this._cell(t);if(null===e)return null;const{vectors:n}=this,i=4*t;return n[i]||n[i+1]?this._clipInfinite(t,e,n[i],n[i+1],n[i+2],n[i+3]):this._clipFinite(t,e)}_clipFinite(t,e){const n=e.length;let i,s,r,o,l,h=null,a=e[n-2],c=e[n-1],u=this._regioncode(a,c);for(let d=0;d<n;d+=2)if(i=a,s=c,a=e[d],c=e[d+1],r=u,u=this._regioncode(a,c),0===r&&0===u)o=l,l=0,h?h.push(a,c):h=[a,c];else{let e,n,d,f,y;if(0===r){if(null===(e=this._clipSegment(i,s,a,c,r,u)))continue;[n,d,f,y]=e}else{if(null===(e=this._clipSegment(a,c,i,s,u,r)))continue;[f,y,n,d]=e,o=l,l=this._edgecode(n,d),o&&l&&this._edge(t,o,l,h,h.length),h?h.push(n,d):h=[n,d]}o=l,l=this._edgecode(f,y),o&&l&&this._edge(t,o,l,h,h.length),h?h.push(f,y):h=[f,y]}if(h)o=l,l=this._edgecode(h[0],h[1]),o&&l&&this._edge(t,o,l,h,h.length);else if(this.contains(t,(this.xmin+this.xmax)/2,(this.ymin+this.ymax)/2))return[this.xmax,this.ymin,this.xmax,this.ymax,this.xmin,this.ymax,this.xmin,this.ymin];return h}_clipSegment(t,e,n,i,s,r){for(;;){if(0===s&&0===r)return[t,e,n,i];if(s&r)return null;let o,l,h=s||r;8&h?(o=t+(n-t)*(this.ymax-e)/(i-e),l=this.ymax):4&h?(o=t+(n-t)*(this.ymin-e)/(i-e),l=this.ymin):2&h?(l=e+(i-e)*(this.xmax-t)/(n-t),o=this.xmax):(l=e+(i-e)*(this.xmin-t)/(n-t),o=this.xmin),s?(t=o,e=l,s=this._regioncode(t,e)):(n=o,i=l,r=this._regioncode(n,i))}}_clipInfinite(t,e,n,i,s,r){let o,l=Array.from(e);if((o=this._project(l[0],l[1],n,i))&&l.unshift(o[0],o[1]),(o=this._project(l[l.length-2],l[l.length-1],s,r))&&l.push(o[0],o[1]),l=this._clipFinite(t,l))for(let e,n=0,i=l.length,s=this._edgecode(l[i-2],l[i-1]);n<i;n+=2)e=s,s=this._edgecode(l[n],l[n+1]),e&&s&&(n=this._edge(t,e,s,l,n),i=l.length);else this.contains(t,(this.xmin+this.xmax)/2,(this.ymin+this.ymax)/2)&&(l=[this.xmin,this.ymin,this.xmax,this.ymin,this.xmax,this.ymax,this.xmin,this.ymax]);return l}_edge(t,e,n,i,s){for(;e!==n;){let n,r;switch(e){case 5:e=4;continue;case 4:e=6,n=this.xmax,r=this.ymin;break;case 6:e=2;continue;case 2:e=10,n=this.xmax,r=this.ymax;break;case 10:e=8;continue;case 8:e=9,n=this.xmin,r=this.ymax;break;case 9:e=1;continue;case 1:e=5,n=this.xmin,r=this.ymin}i[s]===n&&i[s+1]===r||!this.contains(t,n,r)||(i.splice(s,0,n,r),s+=2)}return s}_project(t,e,n,i){let s,r,o,l=1/0;if(i<0){if(e<=this.ymin)return null;(s=(this.ymin-e)/i)<l&&(o=this.ymin,r=t+(l=s)*n)}else if(i>0){if(e>=this.ymax)return null;(s=(this.ymax-e)/i)<l&&(o=this.ymax,r=t+(l=s)*n)}if(n>0){if(t>=this.xmax)return null;(s=(this.xmax-t)/n)<l&&(r=this.xmax,o=e+(l=s)*i)}else if(n<0){if(t<=this.xmin)return null;(s=(this.xmin-t)/n)<l&&(r=this.xmin,o=e+(l=s)*i)}return[r,o]}_edgecode(t,e){return(t===this.xmin?1:t===this.xmax?2:0)|(e===this.ymin?4:e===this.ymax?8:0)}_regioncode(t,e){return(t<this.xmin?1:t>this.xmax?2:0)|(e<this.ymin?4:e>this.ymax?8:0)}}const _=2*Math.PI;class v{constructor(t){const{halfedges:e,hull:n,triangles:i}=new s(t);this.points=t,this.halfedges=e,this.hull=n,this.triangles=i;const r=this.inedges=new Int32Array(t.length/2).fill(-1),o=this.outedges=new Int32Array(t.length/2).fill(-1);for(let t=0,n=e.length;t<n;++t)r[i[t%3==2?t-2:t+1]]=t;let l,h=n;do{l=h,r[(h=h.next).i]=l.t,o[l.i]=h.t}while(h!==n)}voronoi(t){return new m(this,t)}*neighbors(t){const{inedges:e,outedges:n,halfedges:i,triangles:s}=this,r=e[t];if(-1===r)return;let o=r;do{if(yield s[o],s[o=o%3==2?o-2:o+1]!==t)return;if(-1===(o=i[o]))return yield s[n[t]]}while(o!==r)}find(t,e,n=0){if((t=+t)!=t||(e=+e)!=e)return-1;let i;for(;(i=this._step(n,t,e))>=0&&i!==n;)n=i;return i}_step(t,e,n){const{inedges:i,points:s}=this;if(-1===i[t])return-1;let r=t,o=(e-s[2*t])**2+(n-s[2*t+1])**2;for(const i of this.neighbors(t)){const t=(e-s[2*i])**2+(n-s[2*i+1])**2;t<o&&(o=t,r=i)}return r}render(t){const e=null==t?t=new g:void 0,{points:n,halfedges:i,triangles:s}=this;for(let e=0,r=i.length;e<r;++e){const r=i[e];if(r<e)continue;const o=2*s[e],l=2*s[r];t.moveTo(n[o],n[o+1]),t.lineTo(n[l],n[l+1])}return this.renderHull(t),e&&e.value()}renderPoints(t,e=2){const n=null==t?t=new g:void 0,{points:i}=this;for(let n=0,s=i.length;n<s;n+=2){const s=i[n],r=i[n+1];t.moveTo(s+e,r),t.arc(s,r,e,0,_)}return n&&n.value()}renderHull(t){const e=null==t?t=new g:void 0,{hull:n}=this;let i=n;for(t.moveTo(i.x,i.y);(i=i.next)!==n;)t.lineTo(i.x,i.y);return t.closePath(),e&&e.value()}hullPolygon(){const t=new x;return this.renderHull(t),t.value()}renderTriangle(t,e){const n=null==e?e=new g:void 0,{points:i,triangles:s}=this,r=2*s[t*=3],o=2*s[t+1],l=2*s[t+2];return e.moveTo(i[r],i[r+1]),e.lineTo(i[o],i[o+1]),e.lineTo(i[l],i[l+1]),e.closePath(),n&&n.value()}*trianglePolygons(){const{triangles:t}=this;for(let e=0,n=t.length/3;e<n;++e)yield this.trianglePolygon(e)}trianglePolygon(t){const e=new x;return this.renderTriangle(t,e),e.value()}}v.from=function(t,e=function(t){return t[0]},n=function(t){return t[1]},i){return new v("length"in t?function(t,e,n,i){const s=t.length,r=new Float64Array(2*s);for(let o=0;o<s;++o){const s=t[o];r[2*o]=e.call(i,s,o,t),r[2*o+1]=n.call(i,s,o,t)}return r}(t,e,n,i):Float64Array.from(function*(t,e,n,i){let s=0;for(const r of t)yield e.call(i,r,s,t),yield n.call(i,r,s,t),++s}(t,e,n,i)))},n.d(e,"showVoronoi",function(){return E}),n.d(e,"drawVoronoi",function(){return M}),n.d(e,"eraseVoronoi",function(){return P}),n.d(e,"toggleVoronoi",function(){return S});var p,w,b,k,T,E=!0;function M(){P();var t=document.createElement("div");t.setAttribute("id","attachedLinkOverlayForDelaunay"),t.style.outline="5px solid black",t.style.position="fixed",t.style.top="1em",t.style.right="10%",t.style.maxWidth="80%",t.style.overflowWrap="break-word",t.style["font-size"]="32px",t.style.zIndex="9999999999999999999999999999",t.style["background-color"]="white",document.body.appendChild(t);var e=document.querySelectorAll("a, input"),n=document.createElement("canvas");n.setAttribute("id","attachedCanvasOverlayForDelaunay");var i=document.documentElement.getBoundingClientRect(),s=document.documentElement.scrollHeight,r=document.documentElement.scrollWidth,o=s;n.style.position="absolute",n.setAttribute("width",r+"px"),n.setAttribute("height",o+"px"),n.style.left="0",n.style.top="0",n.style.zIndex="999999999999999999999999999",n.style["pointer-events"]="none";var l=n.width,h=n.height;document.body.appendChild(n);var a=n.getContext("2d");a.getImageData(0,0,l,h);function c(t,e){return{x:l*(t/r),y:h*(e/o)}}a.fillStyle="red";for(var u=[],d=[],f=0;f<e.length;f++){var y=e[f],g=y.getBoundingClientRect(),x=c((g.left+g.right)/2,(g.top+g.bottom)/2-i.top);E&&a.fillRect(x.x-2,x.y-2,5,5),u.push([x.x,x.y]),d.push([x.x,x.y,y])}var m=v.from(u),_=m.voronoi([1,1,l,h]);E&&(a.beginPath(),a.lineWidth=3,_.render(a),a.stroke());var S=new Map;d.forEach(function(t){var e=t[0],n=t[1],i=t[2],s=m.find(e,n);S.set(s,i)}),T=function(e){var n=c(e.layerX,e.layerY),i=m.find(n.x,n.y);if("touchstart"==e.type&&p==i&&S.get(i).click(),p!=i){void 0!==p&&(S.get(p).style.outline=b,E&&(a.strokeStyle="black",a.beginPath(),_.renderCell(p,a),a.stroke()));var s=S.get(i);w=s,b=s.style.outline||"none",s.style.outline="5px solid black","A"==s.tagName?t.innerHTML=s.href:"INPUT"==s.tagName&&(t.innerHTML=s.value),E&&(a.strokeStyle="red",a.beginPath(),_.renderCell(i,a),a.stroke())}p=i},k=function(t){var e=c(t.layerX,t.layerY),n=m.find(e.x,e.y);S.get(n).click()},window.addEventListener("resize",M),window.addEventListener("mousemove",T),window.addEventListener("touchstart",T),window.addEventListener("click",k)}function P(){window.removeEventListener("mousemove",T),window.removeEventListener("touchstart",T),window.removeEventListener("click",k),window.removeEventListener("resize",M),void 0!==w&&(w.style.outline=b);try{document.getElementById("attachedLinkOverlayForDelaunay").remove(),document.getElementById("attachedCanvasOverlayForDelaunay").remove()}catch(t){}}function S(){E=!E,M()}M(),window.addEventListener("load",M)}]);'>Voronoize</a>

Step 2. Press it to voronoize whatever page you are on!

For example, here is a screenshot of what happens when I voronoize [wikipedia.org](https://www.wikipedia.org):

<img src="/images/voronoi-wikipedia.png" style="width: 600px" alt="Wikipedia 'voronized'"/>

And here is [arxiv.org](https://arxiv.org) voronoized:
<img src="/images/voronoi-arxiv.png" style="width: 600px" alt="Arxiv 'voronized'"/> 

Again, the code for this is available on Github [here](https://github.com/samzhang111/html-voronoi).