(function(t){function e(e){for(var r,n,c=e[0],s=e[1],l=e[2],p=0,u=[];p<c.length;p++)n=c[p],i[n]&&u.push(i[n][0]),i[n]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r]);d&&d(e);while(u.length)u.shift()();return o.push.apply(o,l||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],r=!0,n=1;n<a.length;n++){var c=a[n];0!==i[c]&&(r=!1)}r&&(o.splice(e--,1),t=s(s.s=a[0]))}return t}var r={},n={app:0},i={app:0},o=[];function c(t){return s.p+"js/"+({}[t]||t)+"."+{"chunk-0713ad52":"a598d983","chunk-212b9999":"b87d8ebb","chunk-23a003cd":"098dfa96","chunk-2d221fc5":"444bb48f","chunk-40619d94":"ac566a6d","chunk-488ce972":"6fe27624","chunk-60db0316":"c77dcaa7","chunk-7c1ffe43":"8182d36d","chunk-b76331ce":"849c9a48","chunk-d35dcd80":"2a599b37"}[t]+".js"}function s(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.e=function(t){var e=[],a={"chunk-0713ad52":1,"chunk-212b9999":1,"chunk-23a003cd":1,"chunk-40619d94":1,"chunk-488ce972":1,"chunk-60db0316":1,"chunk-7c1ffe43":1,"chunk-b76331ce":1};n[t]?e.push(n[t]):0!==n[t]&&a[t]&&e.push(n[t]=new Promise(function(e,a){for(var r="css/"+({}[t]||t)+"."+{"chunk-0713ad52":"0f51ee7f","chunk-212b9999":"84ffe056","chunk-23a003cd":"82adff3e","chunk-2d221fc5":"31d6cfe0","chunk-40619d94":"0f51ee7f","chunk-488ce972":"af36894e","chunk-60db0316":"82adff3e","chunk-7c1ffe43":"8bc83bd3","chunk-b76331ce":"a228320a","chunk-d35dcd80":"31d6cfe0"}[t]+".css",i=s.p+r,o=document.getElementsByTagName("link"),c=0;c<o.length;c++){var l=o[c],p=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(p===r||p===i))return e()}var u=document.getElementsByTagName("style");for(c=0;c<u.length;c++){l=u[c],p=l.getAttribute("data-href");if(p===r||p===i)return e()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=e,d.onerror=function(e){var r=e&&e.target&&e.target.src||i,o=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete n[t],d.parentNode.removeChild(d),a(o)},d.href=i;var h=document.getElementsByTagName("head")[0];h.appendChild(d)}).then(function(){n[t]=0}));var r=i[t];if(0!==r)if(r)e.push(r[2]);else{var o=new Promise(function(e,a){r=i[t]=[e,a]});e.push(r[2]=o);var l,p=document.createElement("script");p.charset="utf-8",p.timeout=120,s.nc&&p.setAttribute("nonce",s.nc),p.src=c(t),l=function(e){p.onerror=p.onload=null,clearTimeout(u);var a=i[t];if(0!==a){if(a){var r=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src,o=new Error("Loading chunk "+t+" failed.\n("+r+": "+n+")");o.type=r,o.request=n,a[1](o)}i[t]=void 0}};var u=setTimeout(function(){l({type:"timeout",target:p})},12e4);p.onerror=p.onload=l,document.head.appendChild(p)}return Promise.all(e)},s.m=t,s.c=r,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(a,r,function(e){return t[e]}.bind(null,r));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/ecmobile/",s.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],p=l.push.bind(l);l.push=e,l=l.slice();for(var u=0;u<l.length;u++)e(l[u]);var d=p;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("96cf");var r=a("3b8d"),n=(a("c5f6"),a("cadf"),a("551c"),a("f751"),a("097d"),a("2b0e")),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view"),a("div",{staticStyle:{"margin-bottom":"70px"}}),a("van-tabbar",{model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[a("van-tabbar-item",{attrs:{icon:"orders-o",to:{name:"home"}}},[t._v("出差")]),t.$store.state.user.isLeader?a("van-tabbar-item",{attrs:{icon:"sign",info:t.$store.state.approvalCount,to:{name:"approvals",query:{type:0}}}},[t._v("审批")]):t._e(),a("van-tabbar-item",{attrs:{icon:"user-o",to:{name:"manage"}}},[t._v("我")])],1)],1)},o=[],c={data:function(){return{active:0}}},s=c,l=a("2877"),p=Object(l["a"])(s,i,o,!1,null,null,null),u=p.exports,d=a("8c4f"),h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"home"}},[a("van-panel",{attrs:{title:"员工信息"}},[a("van-cell-group",[a("van-cell",{attrs:{title:"姓名",value:t.approval.userName}}),a("van-cell",{attrs:{title:"部门"},on:{click:t.showSelectDept}},[t._v("\n        "+t._s(t.approval.deptName)+"\n      ")])],1)],1),t.approval.id||t.approval.balance?t._e():a("div",{staticStyle:{padding:"4px 15px"}},[a("p",[t._v("当前部门没有预算，是否申请预算")]),a("van-button",{attrs:{block:"",type:"primary",plain:"",to:{name:"applybudget",query:{deptId:t.approval.deptId}}}},[t._v("申请预算")])],1),t.approval.id||t.approval.balance?a("div",[a("van-panel",{attrs:{title:"出差申请"}},[a("van-field",{attrs:{type:"textarea",label:"出差事由",placeholder:"请输入出差事由",required:""},model:{value:t.approval.trip.cause,callback:function(e){t.$set(t.approval.trip,"cause",e)},expression:"approval.trip.cause"}})],1),t._l(t.approval.itineraries,function(e,r){return a("van-panel",{key:"itinerary-"+r},[a("div",{staticClass:"panel-head",attrs:{slot:"header"},slot:"header"},[a("van-row",[a("van-col",{staticClass:"title",attrs:{span:"22"}},[t._v("\n            "+t._s("行程("+(r+1)+")")+"\n          ")]),a("van-col",{staticClass:"handle",attrs:{span:"2"}},[a("van-icon",{attrs:{name:"delete",color:"red",size:"20px"},on:{click:function(e){return t.deleteItinerary(r)}}})],1)],1)],1),a("van-cell",{attrs:{title:"行程类型",required:""},on:{click:function(e){return t.showSelectTripWay(r)}}},[t._v("\n        "+t._s(t.tripWayMap[e.tripWay])+"\n      ")]),a("van-cell",{attrs:{title:"交通方式",required:""},on:{click:function(e){return t.showSelectTraffic(r)}}},[t._v("\n        "+t._s(t.trafficMap[e.trafficType])+"\n      ")]),a("van-cell",{attrs:{title:"出发城市",required:""},on:{click:function(e){return t.showCity(r,"depCity")}}},[t._v("\n        "+t._s(t.approval.itineraries[r].depCity)+"\n      ")]),a("van-cell",{attrs:{title:"目的城市",required:""},on:{click:function(e){return t.showCity(r,"arrCity")}}},[t._v("\n        "+t._s(t.approval.itineraries[r].arrCity)+"\n      ")]),a("van-cell",{attrs:{title:"开始时间",required:""},on:{click:function(e){return t.showDatePicker(r,"depDate")}}},[t._v("\n        "+t._s(t.parseDateStr(e.depDate))+"\n      ")]),a("van-cell",{attrs:{title:"结束时间",required:""},on:{click:function(e){return t.showDatePicker(r,"arrDate")}}},[t._v("\n        "+t._s(t.parseDateStr(e.arrDate))+"\n      ")]),a("van-cell",{attrs:{title:"时长(天)",required:"",label:"自动计算时长"}},[t._v("\n        "+t._s(e.day)+"\n      ")])],1)}),a("div",{staticClass:"button-area"},[a("van-button",{attrs:{block:"",type:"warning",plain:""},on:{click:t.addItinerary}},[a("span",{staticClass:"icon-btn"},[t._v("+")]),t._v(" 增加行程")])],1),a("van-panel",[a("van-field",{attrs:{label:"出差天数",required:"",readonly:""},model:{value:t.approval.trip.day,callback:function(e){t.$set(t.approval.trip,"day",e)},expression:"approval.trip.day"}}),a("van-field",{attrs:{label:"成本中心",readonly:""},on:{click:function(e){t.costcenterShow=!0}},model:{value:t.approval.costcenter.title,callback:function(e){t.$set(t.approval.costcenter,"title",e)},expression:"approval.costcenter.title"}}),a("van-field",{attrs:{label:"发票抬头",readonly:""},on:{click:function(e){t.invoiceShow=!0}},model:{value:t.approval.invoice.title,callback:function(e){t.$set(t.approval.invoice,"title",e)},expression:"approval.invoice.title"}})],1),a("van-panel",{attrs:{title:"出差备注"}},[a("van-field",{attrs:{type:"textarea",placeholder:"请输入具体的出差备注（选填，少于500字）"},model:{value:t.approval.trip.remark,callback:function(e){t.$set(t.approval.trip,"remark",e)},expression:"approval.trip.remark"}})],1),a("van-panel",{staticClass:"traveler-head",attrs:{title:"同行人员"}},[a("van-cell-group",[t._l(t.approval.cotravelers,function(e,r){return a("van-row",{key:"cotraveler-"+r,staticClass:"traveler-row"},[a("van-col",{attrs:{span:"22"}},[a("van-cell",{attrs:{title:"姓名",value:e.userName},on:{click:function(e){return t.selectTraveler(r)}}})],1),a("van-col",{attrs:{span:"2"}},[a("van-icon",{staticClass:"traveler-icon",attrs:{name:"delete"},on:{click:function(e){return t.deleteTraveler(r,"delete")}}})],1)],1)}),a("div",{staticClass:"button-area"},[a("van-button",{attrs:{block:"",type:"warning",plain:""},on:{click:t.addCotraveler}},[a("span",{staticClass:"icon-btn"},[t._v("+")]),t._v("增加同行人员")])],1)],2)],1),a("van-panel",{attrs:{title:"审批流程"}},[a("van-steps",{attrs:{direction:"vertical"}},t._l(t.approvalLists,function(e,r){return a("van-step",{key:"listItem-"+r},[a("h3",[t._v(t._s(e.title))]),a("p",[t._v(t._s(e.users.join("、")))])])}),1)],1),t.approval.balance?a("div",{staticClass:"button-area"},[t.approval.id?a("van-button",{attrs:{block:"",type:"warning",plain:""},on:{click:t.saveApproval}},[t._v("修改申请单")]):a("van-button",{attrs:{block:"",type:"primary",plain:""},on:{click:t.saveApproval}},[t._v("申请出差")])],1):t._e()],2):t._e(),a("van-popup",{attrs:{position:"bottom"},model:{value:t.deptSelectShow,callback:function(e){t.deptSelectShow=e},expression:"deptSelectShow"}},[a("van-picker",{attrs:{columns:t.departments,"show-toolbar":!0},on:{cancel:function(e){t.deptSelectShow=!1},confirm:t.selectDept}})],1),a("van-popup",{attrs:{position:"bottom"},model:{value:t.tripWaySelectShow,callback:function(e){t.tripWaySelectShow=e},expression:"tripWaySelectShow"}},[a("van-picker",{attrs:{columns:t.tripWayLists,"default-index":1,"show-toolbar":!0,title:"行程类别"},on:{cancel:function(e){t.tripWaySelectShow=!1},confirm:t.selectTripWay}})],1),a("van-popup",{attrs:{position:"bottom"},model:{value:t.trafficShow,callback:function(e){t.trafficShow=e},expression:"trafficShow"}},[a("van-picker",{attrs:{columns:t.trafficLists,"default-index":0,"show-toolbar":!0,title:"交通方式"},on:{cancel:function(e){t.trafficShow=!1},confirm:t.selectTraffic}})],1),a("van-popup",{attrs:{position:"bottom"},model:{value:t.datePickerShow,callback:function(e){t.datePickerShow=e},expression:"datePickerShow"}},[a("van-datetime-picker",{attrs:{"show-toolbar":!0,type:"date"},on:{cancel:function(e){t.datePickerShow=!1},confirm:t.pickDate},model:{value:t.timeSelected,callback:function(e){t.timeSelected=e},expression:"timeSelected"}})],1),a("van-popup",{staticClass:"traverer-wrapper",attrs:{position:"center"},model:{value:t.areaShow,callback:function(e){t.areaShow=e},expression:"areaShow"}},[a("van-tree-select",{attrs:{items:t.areaList,title:"区域选择",height:t.treeHeight,"main-active-index":t.areaActiveIndex,"active-id":t.activeArea},on:{navclick:t.navArea,itemclick:t.pickCity}})],1),a("van-popup",{staticClass:"traverer-wrapper",attrs:{position:"center"},model:{value:t.travelerShow,callback:function(e){t.travelerShow=e},expression:"travelerShow"}},[a("van-tree-select",{attrs:{items:t.staffLists,title:"同行人",height:t.treeHeight,"main-active-index":t.travelActiveIndex,"active-id":t.activeId},on:{navclick:t.onNavClick,itemclick:t.pickTraveler}})],1),a("van-popup",{attrs:{position:"bottom"},model:{value:t.costcenterShow,callback:function(e){t.costcenterShow=e},expression:"costcenterShow"}},[a("van-picker",{attrs:{columns:t.costcenters,"show-toolbar":!0,title:"成本中心"},on:{cancel:function(e){t.costcenterShow=!1},confirm:t.pickCostCenter}})],1),a("van-popup",{attrs:{position:"bottom"},model:{value:t.invoiceShow,callback:function(e){t.invoiceShow=e},expression:"invoiceShow"}},[a("van-picker",{attrs:{columns:t.invoices,"show-toolbar":!0,title:"发票抬头"},on:{cancel:function(e){t.invoiceShow=!1},confirm:t.pickInvoice}})],1)],1)},v=[],f=(a("ac4d"),a("8a81"),a("ac6a"),{name:"home",data:function(){return{apprvalProcess:0,deptSelectShow:!1,departmentLists:[],departments:[],approval:{id:"",trip:{},invoice:{},costcenter:{},itineraries:[]},defaultArea:{0:"421000",1:"401000",2:"310100",3:"310100"},itineraryIndex:0,tripWaySelectShow:!1,tripWayMap:{0:"单程",1:"往返"},tripWayLists:["单程","往返"],trafficType:0,trafficShow:!1,trafficMap:{0:"飞机",1:"火车",2:"汽车",3:"其他"},trafficAreaMap:{0:0,1:1,2:2,3:2},trafficLists:["飞机","火车","汽车","其他"],datePickerShow:!1,datePickType:"depDate",timeSelected:new Date,areaShow:!1,areaList:[],areaPickType:"depCity",travelerShow:!1,areaActiveIndex:0,activeArea:"",treeHeight:550,travelerIndex:0,travelActiveIndex:0,activeId:1,staffLists:[],costcenterShow:!1,costcenters:[],invoiceShow:!1,invoices:[],approvalLists:[]}},methods:{getBalance:function(t){var e=this;this.$http.get("/ec/api/fees/count?deptId=".concat(t||this.approval.deptId)).then(function(t){var a=t.data;0===a.errcode&&(e.approval.balance=a.data.balance||0)}).catch()},initApproval:function(){this.approval={deptId:null,deptName:null,balance:1,trip:{day:1,title:"",cause:"",remark:""},itineraries:[{tripWay:1,trafficType:0,depCity:"上海",depCityCode:"",depCityProvince:{code:"",name:"",index:""},arrCity:"上海",arrCityCode:"",arrCityProvince:{code:"",name:"",index:""},depDate:null,arrDate:null,day:1}],costcenter:{id:"",title:""},invoice:{id:"",title:""},cotravelers:[],approvalDepts:[]},this.departmentLists.length&&(this.approval.deptId=this.departmentLists[0].deptId,this.approval.deptName=this.departmentLists[0].deptName)},showSelectDept:function(){this.departments.length<=1||(this.deptSelectShow=!0)},selectDept:function(t,e){this.approval.deptId=this.departmentLists[e].deptId,this.approval.deptName=this.departmentLists[e].deptName,this.deptSelectShow=!1,this.getApprovalDepts(),this.getBalance(this.approval.deptId)},showSelectTripWay:function(t){this.itineraryIndex=t||0,this.tripWaySelectShow=!0},selectTripWay:function(t,e){this.approval.itineraries[this.itineraryIndex].tripWay=e,this.tripWaySelectShow=!1},showSelectTraffic:function(t){this.itineraryIndex=t||0,this.trafficShow=!0},selectTraffic:function(t,e){this.approval.itineraries[this.itineraryIndex].trafficType=e,this.trafficShow=!1,this.trafficType=e,this.approval.itineraries[this.itineraryIndex].depCity="",this.approval.itineraries[this.itineraryIndex].arrCity="",this.getAreaLists()},getAreaLists:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var a,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$http.get("/ec/api/area?type=".concat(e||this.trafficType));case 2:a=t.sent,r=a.data,0===r.errcode&&(this.areaList=r.data);case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),showCity:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var a,r,n=arguments;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(a=n.length>1&&void 0!==n[1]?n[1]:"depCity",this.itineraryIndex=e||0,this.areaPickType=a,r=this.approval.itineraries[e],this.activeArea=r["".concat(a,"Code")]||this.defaultArea[this.trafficType],r.trafficType===this.trafficType){t.next=8;break}return t.next=8,this.getAreaLists(r.trafficType);case 8:this.areaShow=!0;case 9:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),pickCity:function(t){var e=this.approval.itineraries[this.itineraryIndex];e[this.areaPickType]=t.text,e["".concat(this.areaPickType,"Code")]=t.id,this.areaShow=!1},showDatePicker:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"depDate";this.itineraryIndex=t||0,this.datePickType=e,this.datePickerShow=!0},pickDate:function(){var t=new Date(this.timeSelected),e=this.approval.itineraries[this.itineraryIndex];e[this.datePickType]=t,e.arrDate&&e.arrDate<e.depDate&&(this.$toast("结束时间不得小于开始时间"),e.arrDate=e.depDate),this.datePickerShow=!1,e.day=this.parseTripDay(this.itineraryIndex),this.computeTripDay()},parseDateStr:function(t){return t?(t=new Date(t),"".concat(t.getFullYear(),"年").concat(t.getMonth()+1,"月").concat(t.getDate(),"日")):""},parseTripDay:function(t){var e=this.approval.itineraries[t];return e.depDate&&e.arrDate?Math.abs(Math.ceil((e.arrDate.setHours(23)-e.depDate.setHours(0))/864e5)):1},addItinerary:function(){this.approval.itineraries.push({tripWay:1,trafficType:0,depCity:"上海",depCityCode:"",arrCity:"上海",arrCityCode:"",depDate:null,arrDate:null,day:1})},deleteItinerary:function(t){this.$delete(this.approval.itineraries,t),this.computeTripDay()},computeTripDay:function(){var t=null,e=null,a=!0,r=!1,n=void 0;try{for(var i,o=this.approval.itineraries[Symbol.iterator]();!(a=(i=o.next()).done);a=!0){var c=i.value;t||(t=c.depDate),e||(e=c.depDate),c.depDate&&c.depDate<t&&(t=c.depDate),c.arrDate&&c.arrDate<t&&(t=c.arrDate),c.depDate&&c.depDate>e&&(e=c.depDate),c.arrDate&&c.arrDate>e&&(e=c.arrDate)}}catch(s){r=!0,n=s}finally{try{a||null==o.return||o.return()}finally{if(r)throw n}}this.approval.trip.day=e&&t?Math.abs(Math.ceil((e.setHours(23)-t.setHours(0))/864e5)):1},addCotraveler:function(){this.approval.cotravelers.push({userId:"",userName:"",deptId:"",deptName:""})},deleteTraveler:function(t){this.$delete(this.approval.cotravelers,t)},selectTraveler:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var a,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(this.travelerIndex=e||0,this.staffLists.length){t.next=9;break}return t.next=4,this.$http.get("/ec/api/staffs/depts");case 4:if(a=t.sent,r=a.data,0===r.errcode){t.next=8;break}return t.abrupt("return");case 8:this.staffLists=r.data||[];case 9:this.travelerShow=!0;case 10:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),onNavClick:function(t){this.travelActiveIndex=t},pickTraveler:function(t){this.approval.cotravelers[this.travelerIndex]=t,this.travelerShow=!1},navArea:function(t){this.areaActiveIndex=t},appendBudget:function(){var t=this;this.$http.post("/ec/api/approvals/append",this.approval).then(function(e){if(0===e.data.errcode)return t.$toast("已提交追加部门预算申请"),void t.initApproval();t.$toast("追加部门预算申请失败，请联系管理员")})},saveApproval:function(){var t=!0,e=this.approval;if(e.deptId||(t=!1),!e.trip.cause)return t=!1,void this.$toast("出差原因未填写");if(!e.trip.day)return t=!1,void this.$toast("请选择出差开始结束日期");var a=e.itineraries||[];if(!a.length)return t=!1,void this.$toast("行程列表未填写");var r=!0,n=!1,i=void 0;try{for(var o,c=a[Symbol.iterator]();!(r=(o=c.next()).done);r=!0){var s=o.value;if(s.depCity&&s.arrCity&&s.depDate&&s.arrDate||(t=!1),!t)break}}catch(l){n=!0,i=l}finally{try{r||null==c.return||c.return()}finally{if(n)throw i}}t?e.costcenter.id?e.invoice.id?this.approval.id?this.updateApproval():this.createApproval():this.$toast("申请失败，您没有商旅发票抬头"):this.$toast("申请失败，您没有商旅成本中心"):this.$toast("请正确填写行程列表")},updateApproval:function(){var t=this;this.$http.put("/ec/api/approvals/".concat(this.approval.id),this.approval).then(function(e){var a=e.data;0!==a.errcode?t.$toast("出差申请修改失败，请重新填写或者联系管理员"):t.$toast("出差申请单修改成功")})},createApproval:function(){var t=this,e=this;this.approval.balance<=0?this.$dialog.confirm({message:"部门预算不足，是否申请追加预算"}).then(function(){return t.appendBudget()}).catch(function(){t.$toast("已取消申请追加预算")}):this.$http.post("/ec/api/approvals",this.approval).then(function(a){var r=a.data;if(0===r.errcode)return t.$toast("出差申请单填写成功，请等待领导审批"),void e.$router.push({name:"apply",query:{id:r.data.id}});t.$toast("出差申请单填写失败，请重新申请或者联系管理员")})},pickCostCenter:function(t,e){var a=this.$store.state.user.costcenters;this.approval.costcenter={id:a[e].id,title:a[e].title},this.costcenterShow=!1},pickInvoice:function(t,e){var a=this.$store.state.user.invoices;this.approval.invoice={id:a[e].id,title:a[e].title},this.invoiceShow=!1},getApprovalDepts2:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var a,r,n,i,o,c,s,l,p;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:t.t0=regeneratorRuntime.keys(e);case 1:if((t.t1=t.t0()).done){t.next=28;break}for(a=t.t1.value,r={title:"",users:[]},"0"!==a&&0!==a||e[a].deptId!==Number(this.approval.deptId)?r.title="第".concat(Number(a)+1,"级主管"):r.title="直接主管",n=e[a].users||[],i=!0,o=!1,c=void 0,t.prev=9,s=n[Symbol.iterator]();!(i=(l=s.next()).done);i=!0)p=l.value,r.users.push(p.userName);t.next=17;break;case 13:t.prev=13,t.t2=t["catch"](9),o=!0,c=t.t2;case 17:t.prev=17,t.prev=18,i||null==s.return||s.return();case 20:if(t.prev=20,!o){t.next=23;break}throw c;case 23:return t.finish(20);case 24:return t.finish(17);case 25:this.approvalLists.push(r),t.next=1;break;case 28:case"end":return t.stop()}},t,this,[[9,13,17,25],[18,,20,24]])}));function e(e){return t.apply(this,arguments)}return e}(),getApprovalDepts:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(){var e=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(this.approval.deptId){t.next=2;break}return t.abrupt("return");case 2:this.$http.get("/ec/api/staffs/process").then(function(t){var a=t.data,r=[];for(var n in 0===a.errcode&&(r=a.data||[]),e.approval.approvalDepts=r,r){var i={title:"",users:[]};"0"!==n&&0!==n||r[n].deptId!==Number(e.approval.deptId)?i.title="第".concat(Number(n)+1,"级主管"):i.title="直接主管";var o=r[n].users||[],c=!0,s=!1,l=void 0;try{for(var p,u=o[Symbol.iterator]();!(c=(p=u.next()).done);c=!0){var d=p.value;i.users.push(d.userName)}}catch(h){s=!0,l=h}finally{try{c||null==u.return||u.return()}finally{if(s)throw l}}e.approvalLists.push(i)}}).catch(function(){});case 3:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),getApproval:function(t){var e=this;this.$http.get("/ec/api/approvals/".concat(t)).then(function(t){var a=t.data;0===a.errcode?(e.approval=a.data,e.getApprovalDepts2(e.approval.approvalDepts)):e.$toast(a.errmsg)}).catch(function(){})}},created:function(){if(this.$store.state.user){var t=this.$store.state.user,e=t.departments||[],a=!0,r=!1,n=void 0;try{for(var i,o=e[Symbol.iterator]();!(a=(i=o.next()).done);a=!0){var c=i.value;this.departments.push(c.deptName)}}catch(w){r=!0,n=w}finally{try{a||null==o.return||o.return()}finally{if(r)throw n}}this.departmentLists=e;var s=!0,l=!1,p=void 0;try{for(var u,d=(t.costcenters||[])[Symbol.iterator]();!(s=(u=d.next()).done);s=!0){var h=u.value;this.costcenters.push(h.title)}}catch(w){l=!0,p=w}finally{try{s||null==d.return||d.return()}finally{if(l)throw p}}var v=!0,f=!1,m=void 0;try{for(var y,b=(t.invoices||[])[Symbol.iterator]();!(v=(y=b.next()).done);v=!0){var k=y.value;this.invoices.push(k.title)}}catch(w){f=!0,m=w}finally{try{v||null==b.return||b.return()}finally{if(f)throw m}}this.$route.query.id?(this.approval.id=this.$route.query.id,this.getApproval(this.$route.query.id)):(this.initApproval(),this.getBalance(),this.approval.userId=t.userId,this.approval.userName=t.userName,this.approval.deptId=e[0].deptId,this.approval.deptName=e[0].deptName,t.costcenters.length&&(this.approval.costcenter={id:t.costcenters[0].id,title:t.costcenters[0].title}),t.invoices.length&&(this.approval.invoice={id:t.invoices[0].id,title:t.invoices[0].title}),this.getApprovalDepts()),this.getAreaLists()}else this.$router.push({name:"me"})}}),m=f,y=(a("cccb"),Object(l["a"])(m,h,v,!1,null,null,null)),b=y.exports,k=a("2f62");n["a"].use(k["a"]);var w=new k["a"].Store({state:{approvalCount:null,user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{}},mutations:{setUser:function(t,e){t.user=e},setApprovalCount:function(t,e){t.approvalCount=e||null}}}),g=a("bc3a"),S=a.n(g);n["a"].use(d["a"]);var x=new d["a"]({base:"/ecmobile/",routes:[{path:"/",name:"home",component:b,meta:{title:"出差申请",isAuth:!0}},{path:"/manage",name:"manage",component:function(){return a.e("chunk-488ce972").then(a.bind(null,"7e21"))},meta:{title:"我的管理",isAuth:!0}},{path:"/applylists",name:"applylists",component:function(){return a.e("chunk-40619d94").then(a.bind(null,"6a86"))},meta:{title:"我的出差",isAuth:!0}},{path:"/apply",name:"apply",component:function(){return a.e("chunk-60db0316").then(a.bind(null,"bc131"))},meta:{title:"申请单明细",isAuth:!0}},{path:"/approvals",name:"approvals",component:function(){return a.e("chunk-0713ad52").then(a.bind(null,"0ac9"))},meta:{title:"出差审批",isAuth:!0}},{path:"/approval",name:"approval",component:function(){return a.e("chunk-23a003cd").then(a.bind(null,"f008"))},meta:{title:"出差审批",isAuth:!0}},{path:"/approvaledit",name:"approvaledit",component:function(){return a.e("chunk-2d221fc5").then(a.bind(null,"cd4b"))},meta:{title:"出差修改",isAuth:!0}},{path:"/applybudget",name:"applybudget",component:function(){return a.e("chunk-d35dcd80").then(a.bind(null,"62b9"))},meta:{title:"预算申请",isAuth:!0}},{path:"/applybudgetdetil",name:"applybudgetdetil",component:function(){return a.e("chunk-212b9999").then(a.bind(null,"0cd8"))},meta:{title:"预算申请",isAuth:!0}},{path:"/budgetlists",name:"budgetlists",component:function(){return a.e("chunk-b76331ce").then(a.bind(null,"ad1c"))},meta:{title:"预算申请列表",isAuth:!0}},{path:"/budget",name:"budget",component:function(){return a.e("chunk-7c1ffe43").then(a.bind(null,"583c"))},meta:{title:"预算审批",isAuth:!0}}]});x.beforeEach(function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e,a,r){var n,i,o,c,s,l;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(n=Number(localStorage.getItem("expire"))||0,e.meta.title&&(document.title=e.meta.title),!e.matched.some(function(t){return t.meta.isAuth})){t.next=11;break}if(i=w.state.token||localStorage.getItem("token"),i&&!(n<Date.now())){t.next=11;break}if(!e.query.userId){t.next=11;break}return t.next=8,S.a.get("/ec/api/auth/login?userId=".concat(e.query.userId));case 8:o=t.sent,c=o.data,0===c.errcode&&(s=c.data.user,l=c.data.token,localStorage.setItem("user",JSON.stringify(s)),localStorage.setItem("token",l),localStorage.setItem("expire",Date.now()+864e5),w.commit("setUser",s),window.location.reload());case 11:r();case 12:case"end":return t.stop()}},t)}));return function(e,a,r){return t.apply(this,arguments)}}());var I=x,D={development:{corpId:"dingcbcbb63d3edd5478",corpName:"上海铭悦软件有限公司"},production:{corpId:"ding9f71dd70c3adb557",corpName:"海尔融资租赁股份有限公司"}},C=D,A=a("2c18"),_=a("b970");a("157a");n["a"].use(_["a"]),n["a"].config.productionTip=!1,n["a"].prototype.GLOBAL=C,n["a"].prototype.$http=S.a;var $=localStorage.getItem("token"),T=Number(localStorage.getItem("expire"))||0;!$||T<Date.now()?A["ready"](function(){A["runtime"].permission.requestAuthCode({corpId:C["production"].corpId||"dingcbcbb63d3edd5478",onSuccess:function(t){S.a.get("/ec/api/auth/login?corpId=".concat(C.corpId,"&code=").concat(t.code)).then(function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var a,r,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:a=e.data,0===a.errcode&&(r=a.data.user,n=a.data.token,localStorage.setItem("user",JSON.stringify(r)),localStorage.setItem("token",n),localStorage.setItem("expire",Date.now()+864e5),w.commit("setUser",r),window.location.reload());case 2:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()).catch(function(){})},onFail:function(){alert("获取用户信息失败")}})}):S.a.interceptors.request.use(function(t){return t.headers.Authorization=localStorage.getItem("token"),t},function(t){return Promise.reject(t)}),new n["a"]({router:I,store:w,render:function(t){return t(u)}}).$mount("#app")},cccb:function(t,e,a){"use strict";var r=a("d563"),n=a.n(r);n.a},d563:function(t,e,a){}});
//# sourceMappingURL=app.81540009.js.map