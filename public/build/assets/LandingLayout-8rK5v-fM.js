import{a as e,f as t,i as n,n as r,t as i,u as ee,y as a}from"./jsx-runtime-BtleXR7s.js";import{N as o}from"./app-DK2vxHLO.js";var s=o(`Camera`,[[`path`,{d:`M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z`,key:`1tc9qg`}],[`circle`,{cx:`12`,cy:`13`,r:`3`,key:`1vg3eu`}]]),te=o(`Globe`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20`,key:`13o1zl`}],[`path`,{d:`M2 12h20`,key:`9i4pu4`}]]),ne=r(),c=a(t(),1),l=i(),u=(0,c.createContext)({lang:`id`,t:{},setLang:()=>{}}),d={id:{nav:{home:`Beranda`,features:`Fitur`,analytics:`Analitik`,testimonials:`Testimoni`,pricing:`Harga`,login:`Masuk`,dashboard:`Dashboard`},footer:{rights:`Ctechbooth Management. Hak Cipta Dilindungi Undang-Undang. Dibuat dengan presisi.`}},en:{nav:{home:`Home`,features:`Features`,analytics:`Analytics`,testimonials:`Testimonials`,pricing:`Pricing`,login:`Log In`,dashboard:`Dashboard`},footer:{rights:`Ctechbooth Management. All rights reserved. Crafted with precision.`}}};function f(t){let r=(0,ne.c)(71),{children:i,title:a}=t,o=a===void 0?`Ctechbooth`:a,{auth:f}=ee().props,[p,m]=(0,c.useState)(!1),[h,g]=(0,c.useState)(`id`),_=d[h],v,y;r[0]===Symbol.for(`react.memo_cache_sentinel`)?(v=()=>{let e=()=>{m(window.scrollY>20)};return window.addEventListener(`scroll`,e),()=>window.removeEventListener(`scroll`,e)},y=[],r[0]=v,r[1]=y):(v=r[0],y=r[1]),(0,c.useEffect)(v,y);let b;r[2]!==h||r[3]!==_?(b={lang:h,setLang:g,t:_},r[2]=h,r[3]=_,r[4]=b):b=r[4];let x;r[5]===o?x=r[6]:(x=(0,l.jsx)(`title`,{children:o}),r[5]=o,r[6]=x);let S;r[7]===Symbol.for(`react.memo_cache_sentinel`)?(S=(0,l.jsx)(`style`,{children:`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                    
                    body {
                        font-family: 'Inter', sans-serif;
                        background-color: #FFFFFF;
                        color: #1A1A1A;
                        overflow-x: hidden;
                    }
                    
                    .glass-card {
                        background: #FFFFFF;
                        border: 1px solid #E5E7EB;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    }
                    
                    .blue-gradient-text {
                        background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                    
                    .blue-glow {
                        box-shadow: 0 0 40px rgba(59, 130, 246, 0.15);
                    }
                    
                    .gold-border {
                        position: relative;
                    }
                    
                    .blue-border::before {
                        content: '';
                        position: absolute;
                        inset: -1px;
                        border-radius: inherit;
                        padding: 1px;
                        background: linear-gradient(135deg, rgba(59,130,246,0.3) 0%, rgba(30,64,175,0.05) 100%);
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
                        background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(255, 255, 255, 0) 70%);
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
                    `}),r[7]=S):S=r[7];let C;r[8]===x?C=r[9]:(C=(0,l.jsxs)(n,{children:[x,S]}),r[8]=x,r[9]=C);let w;r[10]===Symbol.for(`react.memo_cache_sentinel`)?(w=(0,l.jsx)(`div`,{className:`hero-glow`}),r[10]=w):w=r[10];let T=`fixed top-0 w-full z-50 transition-all duration-300 ${p?`bg-[#FFFFFF]/90 backdrop-blur-lg border-b border-gray-200 py-4`:`bg-transparent py-6`}`,E;r[11]===Symbol.for(`react.memo_cache_sentinel`)?(E=(0,l.jsxs)(e,{href:`/`,className:`flex items-center gap-2`,children:[(0,l.jsx)(`div`,{className:`w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center`,children:(0,l.jsx)(s,{className:`text-white w-5 h-5`})}),(0,l.jsx)(`span`,{className:`font-semibold text-lg tracking-tight`,children:`Ctechbooth`})]}),r[11]=E):E=r[11];let D;r[12]===_.nav.home?D=r[13]:(D=(0,l.jsx)(e,{href:`/`,className:`hover:text-[#1A1A1A] transition-colors`,children:_.nav.home}),r[12]=_.nav.home,r[13]=D);let O;r[14]===_.nav.features?O=r[15]:(O=(0,l.jsx)(e,{href:`/features`,className:`hover:text-[#1A1A1A] transition-colors`,children:_.nav.features}),r[14]=_.nav.features,r[15]=O);let k;r[16]===_.nav.analytics?k=r[17]:(k=(0,l.jsx)(e,{href:`/analytics`,className:`hover:text-[#1A1A1A] transition-colors`,children:_.nav.analytics}),r[16]=_.nav.analytics,r[17]=k);let A;r[18]===_.nav.testimonials?A=r[19]:(A=(0,l.jsx)(e,{href:`/testimonials`,className:`hover:text-[#1A1A1A] transition-colors`,children:_.nav.testimonials}),r[18]=_.nav.testimonials,r[19]=A);let j;r[20]===_.nav.pricing?j=r[21]:(j=(0,l.jsx)(e,{href:`/pricing`,className:`hover:text-[#1A1A1A] transition-colors`,children:_.nav.pricing}),r[20]=_.nav.pricing,r[21]=j);let M;r[22]!==D||r[23]!==O||r[24]!==k||r[25]!==A||r[26]!==j?(M=(0,l.jsxs)(`nav`,{className:`hidden md:flex items-center gap-8 text-sm font-medium text-gray-600`,children:[D,O,k,A,j]}),r[22]=D,r[23]=O,r[24]=k,r[25]=A,r[26]=j,r[27]=M):M=r[27];let N;r[28]===Symbol.for(`react.memo_cache_sentinel`)?(N=(0,l.jsx)(te,{className:`w-4 h-4`}),r[28]=N):N=r[28];let P;r[29]===h?P=r[30]:(P=(0,l.jsxs)(`button`,{className:`flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#1A1A1A] transition-colors`,children:[N,(0,l.jsx)(`span`,{className:`uppercase`,children:h})]}),r[29]=h,r[30]=P);let F;r[31]===Symbol.for(`react.memo_cache_sentinel`)?(F=()=>g(`id`),r[31]=F):F=r[31];let I=`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${h===`id`?`text-[#3B82F6]`:`text-[#1A1A1A]`}`,L;r[32]===I?L=r[33]:(L=(0,l.jsx)(`button`,{onClick:F,className:I,children:`Indonesia`}),r[32]=I,r[33]=L);let R;r[34]===Symbol.for(`react.memo_cache_sentinel`)?(R=()=>g(`en`),r[34]=R):R=r[34];let z=`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${h===`en`?`text-[#3B82F6]`:`text-[#1A1A1A]`}`,B;r[35]===z?B=r[36]:(B=(0,l.jsx)(`button`,{onClick:R,className:z,children:`English`}),r[35]=z,r[36]=B);let V;r[37]!==L||r[38]!==B?(V=(0,l.jsxs)(`div`,{className:`absolute right-0 top-full mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200`,children:[L,B]}),r[37]=L,r[38]=B,r[39]=V):V=r[39];let H;r[40]!==P||r[41]!==V?(H=(0,l.jsxs)(`div`,{className:`relative group`,children:[P,V]}),r[40]=P,r[41]=V,r[42]=H):H=r[42];let U;r[43]!==f.user||r[44]!==_.nav.dashboard||r[45]!==_.nav.login?(U=f.user?(0,l.jsx)(e,{href:`/admin/dashboard`,className:`px-5 py-2 text-sm font-medium rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-all text-[#1A1A1A]`,children:_.nav.dashboard}):(0,l.jsx)(e,{href:`/login`,className:`px-5 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] hover:opacity-90 transition-opacity text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]`,children:_.nav.login}),r[43]=f.user,r[44]=_.nav.dashboard,r[45]=_.nav.login,r[46]=U):U=r[46];let W;r[47]!==H||r[48]!==U?(W=(0,l.jsxs)(`div`,{className:`flex items-center gap-4`,children:[H,U]}),r[47]=H,r[48]=U,r[49]=W):W=r[49];let G;r[50]!==M||r[51]!==W?(G=(0,l.jsxs)(`div`,{className:`container mx-auto px-6 max-w-7xl flex items-center justify-between`,children:[E,M,W]}),r[50]=M,r[51]=W,r[52]=G):G=r[52];let K;r[53]!==G||r[54]!==T?(K=(0,l.jsx)(`header`,{className:T,children:G}),r[53]=G,r[54]=T,r[55]=K):K=r[55];let q;r[56]===i?q=r[57]:(q=(0,l.jsx)(`main`,{children:i}),r[56]=i,r[57]=q);let J;r[58]===Symbol.for(`react.memo_cache_sentinel`)?(J=(0,l.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,l.jsx)(`div`,{className:`w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center`,children:(0,l.jsx)(s,{className:`text-white w-5 h-5`})}),(0,l.jsx)(`span`,{className:`font-semibold text-xl tracking-tight text-[#1A1A1A]`,children:`Ctechbooth`})]}),r[58]=J):J=r[58];let Y;r[59]===Symbol.for(`react.memo_cache_sentinel`)?(Y=(0,l.jsxs)(`div`,{className:`flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12`,children:[J,(0,l.jsxs)(`div`,{className:`flex gap-8 text-sm text-gray-600`,children:[(0,l.jsx)(e,{href:`#`,className:`hover:text-[#1A1A1A] transition-colors`,children:`Privacy Policy`}),(0,l.jsx)(e,{href:`#`,className:`hover:text-[#1A1A1A] transition-colors`,children:`Terms of Service`}),(0,l.jsx)(e,{href:`#`,className:`hover:text-[#1A1A1A] transition-colors`,children:`Contact`})]})]}),r[59]=Y):Y=r[59];let X;r[60]===Symbol.for(`react.memo_cache_sentinel`)?(X=new Date().getFullYear(),r[60]=X):X=r[60];let Z;r[61]===_.footer.rights?Z=r[62]:(Z=(0,l.jsx)(`footer`,{className:`bg-gray-50 border-t border-gray-200 pt-16 pb-8`,children:(0,l.jsxs)(`div`,{className:`container mx-auto px-6 max-w-7xl`,children:[Y,(0,l.jsxs)(`div`,{className:`text-center md:text-left text-xs text-gray-500`,children:[`© `,X,` `,_.footer.rights]})]})}),r[61]=_.footer.rights,r[62]=Z);let Q;r[63]!==K||r[64]!==q||r[65]!==Z?(Q=(0,l.jsxs)(`div`,{className:`min-h-screen relative overflow-hidden bg-[#FFFFFF] selection:bg-[#3B82F6] selection:text-white text-[#1A1A1A]`,children:[w,K,q,Z]}),r[63]=K,r[64]=q,r[65]=Z,r[66]=Q):Q=r[66];let $;return r[67]!==Q||r[68]!==b||r[69]!==C?($=(0,l.jsxs)(u.Provider,{value:b,children:[C,Q]}),r[67]=Q,r[68]=b,r[69]=C,r[70]=$):$=r[70],$}export{u as n,f as t};