import{a as e,f as t,g as n,i as r,n as i,t as a,u as ee}from"./jsx-runtime-DdbilN7f.js";import{N as o}from"./app-cL_h_sq5.js";var s=o(`Camera`,[[`path`,{d:`M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z`,key:`1tc9qg`}],[`circle`,{cx:`12`,cy:`13`,r:`3`,key:`1vg3eu`}]]),te=o(`Globe`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20`,key:`13o1zl`}],[`path`,{d:`M2 12h20`,key:`9i4pu4`}]]),ne=i(),c=n(t(),1),l=a(),u=(0,c.createContext)({lang:`id`,t:{},setLang:()=>{}}),d={id:{nav:{home:`Beranda`,features:`Fitur`,analytics:`Analitik`,testimonials:`Testimoni`,pricing:`Harga`,login:`Masuk`,dashboard:`Dashboard`},footer:{rights:`Ctechbooth Management. Hak Cipta Dilindungi Undang-Undang. Dibuat dengan presisi.`}},en:{nav:{home:`Home`,features:`Features`,analytics:`Analytics`,testimonials:`Testimonials`,pricing:`Pricing`,login:`Log In`,dashboard:`Dashboard`},footer:{rights:`Ctechbooth Management. All rights reserved. Crafted with precision.`}}};function f(t){let n=(0,ne.c)(71),{children:i,title:a}=t,o=a===void 0?`Ctechbooth`:a,{auth:f}=ee().props,[p,m]=(0,c.useState)(!1),[h,g]=(0,c.useState)(`id`),_=d[h],v,y;n[0]===Symbol.for(`react.memo_cache_sentinel`)?(v=()=>{let e=()=>{m(window.scrollY>20)};return window.addEventListener(`scroll`,e),()=>window.removeEventListener(`scroll`,e)},y=[],n[0]=v,n[1]=y):(v=n[0],y=n[1]),(0,c.useEffect)(v,y);let b;n[2]!==h||n[3]!==_?(b={lang:h,setLang:g,t:_},n[2]=h,n[3]=_,n[4]=b):b=n[4];let x;n[5]===o?x=n[6]:(x=(0,l.jsx)(`title`,{children:o}),n[5]=o,n[6]=x);let S;n[7]===Symbol.for(`react.memo_cache_sentinel`)?(S=(0,l.jsx)(`style`,{children:`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                    
                    body {
                        font-family: 'Inter', sans-serif;
                        background-color: #0A0A0A;
                        color: #FFFFFF;
                        overflow-x: hidden;
                    }
                    
                    .glass-card {
                        background: rgba(22, 22, 22, 0.4);
                        backdrop-filter: blur(12px);
                        -webkit-backdrop-filter: blur(12px);
                        border: 1px solid rgba(255, 255, 255, 0.05);
                    }
                    
                    .gold-gradient-text {
                        background: linear-gradient(135deg, #F7D774 0%, #D4AF37 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                    
                    .gold-glow {
                        box-shadow: 0 0 40px rgba(212, 175, 55, 0.15);
                    }
                    
                    .gold-border {
                        position: relative;
                    }
                    
                    .gold-border::before {
                        content: '';
                        position: absolute;
                        inset: -1px;
                        border-radius: inherit;
                        padding: 1px;
                        background: linear-gradient(135deg, rgba(247,215,116,0.3) 0%, rgba(212,175,55,0.05) 100%);
                        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                        -webkit-mask-composite: xor;
                        mask-composite: exclude;
                        pointer-events: none;
                    }
                    
                    .hero-glow {
                        position: absolute;
                        top: 20%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 600px;
                        height: 600px;
                        background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(10, 10, 10, 0) 70%);
                        z-index: -1;
                        border-radius: 50%;
                        filter: blur(40px);
                    }

                    /* Hide scrollbar for smooth cards */
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }

                    .marquee-container {
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .marquee-content {
                        display: inline-block;
                        animation: marquee 20s linear infinite;
                    }
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    `}),n[7]=S):S=n[7];let C;n[8]===x?C=n[9]:(C=(0,l.jsxs)(r,{children:[x,S]}),n[8]=x,n[9]=C);let w;n[10]===Symbol.for(`react.memo_cache_sentinel`)?(w=(0,l.jsx)(`div`,{className:`hero-glow`}),n[10]=w):w=n[10];let T=`fixed top-0 w-full z-50 transition-all duration-300 ${p?`bg-[#0A0A0A]/80 backdrop-blur-lg border-b border-white/5 py-4`:`bg-transparent py-6`}`,E;n[11]===Symbol.for(`react.memo_cache_sentinel`)?(E=(0,l.jsxs)(e,{href:`/`,className:`flex items-center gap-2`,children:[(0,l.jsx)(`div`,{className:`w-8 h-8 rounded-lg bg-gradient-to-br from-[#F7D774] to-[#D4AF37] flex items-center justify-center`,children:(0,l.jsx)(s,{className:`text-black w-5 h-5`})}),(0,l.jsx)(`span`,{className:`font-semibold text-lg tracking-tight`,children:`Ctechbooth`})]}),n[11]=E):E=n[11];let D;n[12]===_.nav.home?D=n[13]:(D=(0,l.jsx)(e,{href:`/`,className:`hover:text-white transition-colors`,children:_.nav.home}),n[12]=_.nav.home,n[13]=D);let O;n[14]===_.nav.features?O=n[15]:(O=(0,l.jsx)(e,{href:`/features`,className:`hover:text-white transition-colors`,children:_.nav.features}),n[14]=_.nav.features,n[15]=O);let k;n[16]===_.nav.analytics?k=n[17]:(k=(0,l.jsx)(e,{href:`/analytics`,className:`hover:text-white transition-colors`,children:_.nav.analytics}),n[16]=_.nav.analytics,n[17]=k);let A;n[18]===_.nav.testimonials?A=n[19]:(A=(0,l.jsx)(e,{href:`/testimonials`,className:`hover:text-white transition-colors`,children:_.nav.testimonials}),n[18]=_.nav.testimonials,n[19]=A);let j;n[20]===_.nav.pricing?j=n[21]:(j=(0,l.jsx)(e,{href:`/pricing`,className:`hover:text-white transition-colors`,children:_.nav.pricing}),n[20]=_.nav.pricing,n[21]=j);let M;n[22]!==D||n[23]!==O||n[24]!==k||n[25]!==A||n[26]!==j?(M=(0,l.jsxs)(`nav`,{className:`hidden md:flex items-center gap-8 text-sm font-medium text-[#B8C0CC]`,children:[D,O,k,A,j]}),n[22]=D,n[23]=O,n[24]=k,n[25]=A,n[26]=j,n[27]=M):M=n[27];let N;n[28]===Symbol.for(`react.memo_cache_sentinel`)?(N=(0,l.jsx)(te,{className:`w-4 h-4`}),n[28]=N):N=n[28];let P;n[29]===h?P=n[30]:(P=(0,l.jsxs)(`button`,{className:`flex items-center gap-1.5 text-sm font-medium text-[#B8C0CC] hover:text-white transition-colors`,children:[N,(0,l.jsx)(`span`,{className:`uppercase`,children:h})]}),n[29]=h,n[30]=P);let F;n[31]===Symbol.for(`react.memo_cache_sentinel`)?(F=()=>g(`id`),n[31]=F):F=n[31];let I=`w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors ${h===`id`?`text-[#D4AF37]`:`text-white`}`,L;n[32]===I?L=n[33]:(L=(0,l.jsx)(`button`,{onClick:F,className:I,children:`Indonesia`}),n[32]=I,n[33]=L);let R;n[34]===Symbol.for(`react.memo_cache_sentinel`)?(R=()=>g(`en`),n[34]=R):R=n[34];let z=`w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors ${h===`en`?`text-[#D4AF37]`:`text-white`}`,B;n[35]===z?B=n[36]:(B=(0,l.jsx)(`button`,{onClick:R,className:z,children:`English`}),n[35]=z,n[36]=B);let V;n[37]!==L||n[38]!==B?(V=(0,l.jsxs)(`div`,{className:`absolute right-0 top-full mt-2 w-32 bg-[#161616] border border-white/10 rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200`,children:[L,B]}),n[37]=L,n[38]=B,n[39]=V):V=n[39];let H;n[40]!==P||n[41]!==V?(H=(0,l.jsxs)(`div`,{className:`relative group`,children:[P,V]}),n[40]=P,n[41]=V,n[42]=H):H=n[42];let U;n[43]!==f.user||n[44]!==_.nav.dashboard||n[45]!==_.nav.login?(U=f.user?(0,l.jsx)(e,{href:`/admin/dashboard`,className:`px-5 py-2 text-sm font-medium rounded-full bg-white/10 hover:bg-white/15 border border-white/5 transition-all text-white`,children:_.nav.dashboard}):(0,l.jsx)(e,{href:`/login`,className:`px-5 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F7D774] hover:opacity-90 transition-opacity text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]`,children:_.nav.login}),n[43]=f.user,n[44]=_.nav.dashboard,n[45]=_.nav.login,n[46]=U):U=n[46];let W;n[47]!==H||n[48]!==U?(W=(0,l.jsxs)(`div`,{className:`flex items-center gap-4`,children:[H,U]}),n[47]=H,n[48]=U,n[49]=W):W=n[49];let G;n[50]!==M||n[51]!==W?(G=(0,l.jsxs)(`div`,{className:`container mx-auto px-6 max-w-7xl flex items-center justify-between`,children:[E,M,W]}),n[50]=M,n[51]=W,n[52]=G):G=n[52];let K;n[53]!==G||n[54]!==T?(K=(0,l.jsx)(`header`,{className:T,children:G}),n[53]=G,n[54]=T,n[55]=K):K=n[55];let q;n[56]===i?q=n[57]:(q=(0,l.jsx)(`main`,{children:i}),n[56]=i,n[57]=q);let J;n[58]===Symbol.for(`react.memo_cache_sentinel`)?(J=(0,l.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,l.jsx)(`div`,{className:`w-8 h-8 rounded-lg bg-gradient-to-br from-[#F7D774] to-[#D4AF37] flex items-center justify-center`,children:(0,l.jsx)(s,{className:`text-black w-5 h-5`})}),(0,l.jsx)(`span`,{className:`font-semibold text-xl tracking-tight text-white`,children:`Ctechbooth`})]}),n[58]=J):J=n[58];let Y;n[59]===Symbol.for(`react.memo_cache_sentinel`)?(Y=(0,l.jsxs)(`div`,{className:`flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12`,children:[J,(0,l.jsxs)(`div`,{className:`flex gap-8 text-sm text-[#B8C0CC]`,children:[(0,l.jsx)(e,{href:`#`,className:`hover:text-white transition-colors`,children:`Privacy Policy`}),(0,l.jsx)(e,{href:`#`,className:`hover:text-white transition-colors`,children:`Terms of Service`}),(0,l.jsx)(e,{href:`#`,className:`hover:text-white transition-colors`,children:`Contact`})]})]}),n[59]=Y):Y=n[59];let X;n[60]===Symbol.for(`react.memo_cache_sentinel`)?(X=new Date().getFullYear(),n[60]=X):X=n[60];let Z;n[61]===_.footer.rights?Z=n[62]:(Z=(0,l.jsx)(`footer`,{className:`bg-[#050505] border-t border-white/10 pt-16 pb-8`,children:(0,l.jsxs)(`div`,{className:`container mx-auto px-6 max-w-7xl`,children:[Y,(0,l.jsxs)(`div`,{className:`text-center md:text-left text-xs text-[#B8C0CC]/50`,children:[`© `,X,` `,_.footer.rights]})]})}),n[61]=_.footer.rights,n[62]=Z);let Q;n[63]!==K||n[64]!==q||n[65]!==Z?(Q=(0,l.jsxs)(`div`,{className:`min-h-screen relative overflow-hidden bg-[#0A0A0A] selection:bg-[#D4AF37] selection:text-black text-white`,children:[w,K,q,Z]}),n[63]=K,n[64]=q,n[65]=Z,n[66]=Q):Q=n[66];let $;return n[67]!==Q||n[68]!==b||n[69]!==C?($=(0,l.jsxs)(u.Provider,{value:b,children:[C,Q]}),n[67]=Q,n[68]=b,n[69]=C,n[70]=$):$=n[70],$}export{u as n,s as r,f as t};