(function(e){function t(t){for(var r,a,u=t[0],i=t[1],s=t[2],l=0,d=[];l<u.length;l++)a=u[l],o[a]&&d.push(o[a][0]),o[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);f&&f(t);while(d.length)d.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,a=1;a<n.length;a++){var u=n[a];0!==o[u]&&(r=!1)}r&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},o={app:0},c=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-31e2a98e":"1daf581e","chunk-3756ce02":"fee5f135","chunk-38d8204c":"a3ead6d6","chunk-6c5d9465":"165e3789","chunk-7f8f2c43":"de836729","chunk-c0b98ef2":"4509fe3d"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-31e2a98e":1,"chunk-3756ce02":1,"chunk-38d8204c":1,"chunk-6c5d9465":1,"chunk-7f8f2c43":1,"chunk-c0b98ef2":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise(function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-31e2a98e":"8a200c35","chunk-3756ce02":"f48086e6","chunk-38d8204c":"cbc95e9b","chunk-6c5d9465":"f48086e6","chunk-7f8f2c43":"a84da865","chunk-c0b98ef2":"9ae3adcb"}[e]+".css",o=i.p+r,c=document.getElementsByTagName("link"),u=0;u<c.length;u++){var s=c[u],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===o))return t()}var d=document.getElementsByTagName("style");for(u=0;u<d.length;u++){s=d[u],l=s.getAttribute("data-href");if(l===r||l===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||o,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete a[e],f.parentNode.removeChild(f),n(c)},f.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(f)}).then(function(){a[e]=0}));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise(function(t,n){r=o[e]=[t,n]});t.push(r[2]=c);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=u(e),s=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src,c=new Error("Loading chunk "+e+" failed.\n("+r+": "+a+")");c.type=r,c.request=a,n[1](c)}o[e]=void 0}};var d=setTimeout(function(){s({type:"timeout",target:l})},12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/ecpc/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var f=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),a=n.n(r);a.a},"0418":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"header"}},[n("el-header",[n("el-row",{staticClass:"header-wrapper"},[n("el-col",{attrs:{span:22}},[e._t("left")],2),n("el-col",{attrs:{span:2}},[e._t("right")],2)],1)],1)],1)},a=[],o={name:"Header"},c=o,u=(n("8baf"),n("2877")),i=Object(u["a"])(c,r,a,!1,null,null,null);t["a"]=i.exports},"56d7":function(e,t,n){"use strict";n.r(t);n("96cf");var r=n("3b8d"),a=(n("c5f6"),n("cadf"),n("551c"),n("f751"),n("097d"),n("2b0e")),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("el-container",[n("el-aside",{attrs:{width:"160px"}},[n("el-menu",{attrs:{"default-active":"groupfees",collapse:!1,"active-text-color":"#FF9900",router:!0}},[n("el-submenu",{attrs:{index:"budgets"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-s-platform"}),n("span",[e._v("预算管理")])]),n("el-menu-item-group",[n("el-menu-item",{attrs:{index:"groupfees"}},[e._v("费用预算")]),n("el-menu-item",{attrs:{index:"incomings"}},[e._v("收入目标")]),n("el-menu-item",{attrs:{index:"grouplists"}},[e._v("预算项目")]),n("el-menu-item",{attrs:{index:"typelists"}},[e._v("类型维护")]),n("el-menu-item",{attrs:{index:"exchange"}},[e._v("预算调整")])],1)],2)],1)],1),n("el-container",[n("el-main",{attrs:{id:"main"}},[n("router-view")],1)],1)],1)],1)},c=[],u={data:function(){return{}}},i=u,s=(n("034f"),n("2877")),l=Object(s["a"])(i,o,c,!1,null,null,null),d=l.exports,f=n("8c4f"),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"home"}},[n("Header",[n("el-breadcrumb",{attrs:{slot:"left","separator-class":"el-icon-arrow-right"},slot:"left"},[n("el-breadcrumb-item",[e._v("主页")]),n("el-breadcrumb-item",[e._v("项目")])],1)],1)],1)},m=[],h=n("0418"),g={name:"home",components:{Header:h["a"]}},b=g,v=Object(s["a"])(b,p,m,!1,null,null,null),k=v.exports,w=n("2f62");a["default"].use(w["a"]);var y=new w["a"].Store({state:{isSignin:"true"===window.localStorage.getItem("isSignin"),user:JSON.parse(window.localStorage.getItem("user")),exchanges:{count:0,records:[]}},mutations:{setSignin:function(e,t){e.isSignin=t,window.localStorage.setItem("isSignin",t)},setUser:function(e,t){e.user=t,window.localStorage.setItem("user",JSON.stringify(t))},setExchanges:function(e,t){e.exchanges.count=t.count,e.exchanges.records=t.records}}}),x=n("bc3a"),S=n.n(x);a["default"].use(f["a"]);var I=new f["a"]({base:"/ecpc/",routes:[{path:"/",name:"home",component:k,meta:{title:"首页",isAuth:!0}},{path:"/grouplists",name:"grouplists",component:function(){return n.e("chunk-31e2a98e").then(n.bind(null,"bfb6"))},meta:{title:"预算项目",isAuth:!0}},{path:"/groupfees",name:"groupfees",component:function(){return n.e("chunk-3756ce02").then(n.bind(null,"def2"))},meta:{title:"预算项目",isAuth:!0}},{path:"/incomings",name:"incomings",component:function(){return n.e("chunk-6c5d9465").then(n.bind(null,"3e83"))},meta:{title:"收入目标",isAuth:!0}},{path:"/typelists",name:"typelists",component:function(){return n.e("chunk-38d8204c").then(n.bind(null,"8132"))},meta:{title:"类型维护",isAuth:!0}},{path:"/exchange",name:"exchange",component:function(){return n.e("chunk-7f8f2c43").then(n.bind(null,"6bdf"))},meta:{title:"预算调整",isAuth:!0}},{path:"/staffprocess",name:"staffprocess",component:function(){return n.e("chunk-c0b98ef2").then(n.bind(null,"2a07"))},meta:{title:"员工出差流程",isAuth:!0}}]});I.beforeEach(function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,n,r){var a,o,c,u,i,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(a=Number(localStorage.getItem("expire"))||0,t.meta.title&&(document.title=t.meta.title),!t.matched.some(function(e){return e.meta.isAuth})){e.next=11;break}if(o=y.state.token||localStorage.getItem("token"),o&&!(a<Date.now())){e.next=11;break}if(!t.query.userId){e.next=11;break}return e.next=8,S.a.get("/ec/api/auth/login?userId=".concat(t.query.userId));case 8:c=e.sent,u=c.data,0===u.errcode&&(i=u.data.user,s=u.data.token,localStorage.setItem("user",JSON.stringify(i)),localStorage.setItem("token",s),localStorage.setItem("expire",Date.now()+864e5),y.commit("setUser",i),window.location.reload());case 11:r();case 12:case"end":return e.stop()}},e)}));return function(t,n,r){return e.apply(this,arguments)}}());var _=I,O={development:{corpId:"dingcbcbb63d3edd5478",corpName:"上海铭悦软件有限公司"},production:{corpId:"ding9f71dd70c3adb557",corpName:"海尔融资租赁股份有限公司"}},A=O,j=n("2c18"),E=n("5c96"),N=n.n(E);n("0fae"),n("ed2c");a["default"].use(N.a),a["default"].config.productionTip=!1,a["default"].prototype.GLOBAL=A,a["default"].prototype.$http=S.a;var P=localStorage.getItem("token"),C=Number(localStorage.getItem("expire"))||0;!P||C<Date.now()?j["ready"](function(){j["runtime"].permission.requestAuthCode({corpId:A["production"].corpId||"dingcbcbb63d3edd5478",onSuccess:function(e){S.a.get("/ec/api/auth/login?corpId=".concat(A.corpId,"&code=").concat(e.code)).then(function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var n,r,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.data,0===n.errcode&&(r=n.data.user,a=n.data.token,localStorage.setItem("user",JSON.stringify(r)),localStorage.setItem("token",a),localStorage.setItem("expire",Date.now()+864e5),y.commit("setUser",r),window.location.reload());case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()).catch(function(){})},onFail:function(){alert("获取用户信息失败")}})}):S.a.interceptors.request.use(function(e){return e.headers.Authorization=localStorage.getItem("token"),e},function(e){return Promise.reject(e)}),new a["default"]({router:_,store:y,render:function(e){return e(d)}}).$mount("#app")},"64a9":function(e,t,n){},"782e":function(e,t,n){},"8baf":function(e,t,n){"use strict";var r=n("782e"),a=n.n(r);a.a},ed2c:function(e,t,n){}});
//# sourceMappingURL=app.b37279fb.js.map