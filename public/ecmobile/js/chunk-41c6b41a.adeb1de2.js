(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-41c6b41a"],{"1b38":function(a,t,e){"use strict";var r=e("1d89"),l=e.n(r);l.a},"1d89":function(a,t,e){},2083:function(a,t,e){"use strict";var r=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{attrs:{id:"approvaldetail"}},[e("div",{staticStyle:{padding:"10px 15px",color:"red"}},[a._v("\n    当前状态: "+a._s(a.approvalStatus[a.approval.status])+"\n  ")]),e("van-panel",{attrs:{title:"员工信息"}},[e("van-cell-group",[e("van-cell",{attrs:{title:"姓名",value:a.approval.userName}}),e("van-cell",{attrs:{title:"部门",value:a.approval.deptName}}),e("van-cell",{attrs:{title:"预算余额",value:a.approval.balance}})],1)],1),e("van-panel",{attrs:{title:"出差申请"}},[a.approval.trip?e("van-cell-group",[e("van-field",{attrs:{disabled:"",type:"textarea",label:"出差事由"},model:{value:a.approval.trip.cause,callback:function(t){a.$set(a.approval.trip,"cause",t)},expression:"approval.trip.cause"}})],1):a._e()],1),a._l(a.approval.itineraries,function(t,r){return e("van-panel",{key:"itinerary-"+r,attrs:{title:"行程("+(r+1)+")"}},[e("van-cell",{attrs:{title:"行程类型",value:a.tripWayMap[t.tripWay]}}),e("van-cell",{attrs:{title:"交通方式",value:a.trafficMap[t.trafficType]}}),e("van-cell",{attrs:{title:"出发城市",value:t.depCity}}),e("van-cell",{attrs:{title:"目的城市",value:t.arrCity}}),e("van-cell",{attrs:{title:"开始时间",value:a.parseDateStr(t.depDate)}}),e("van-cell",{attrs:{title:"结束时间",value:a.parseDateStr(t.arrDate)}}),e("van-cell",{attrs:{title:"时长(天)"}},[a._v("\n      "+a._s(t.day)+"\n    ")])],1)}),e("van-panel",{attrs:{title:"成本中心/发票抬头"}},[a.approval.trip?e("van-cell",{attrs:{title:"出差时长",value:a.approval.trip.day}}):a._e(),a.approval.costcenter?e("van-cell",{attrs:{title:"成本中心"}},[a._v("\n      "+a._s(a.approval.costcenter.title)+"\n    ")]):a._e(),a.approval.invoice?e("van-cell",{attrs:{title:"发票抬头"}},[a._v("\n      "+a._s(a.approval.invoice.title)+"\n    ")]):a._e()],1),a.approval.trip&&a.approval.trip.remark?e("van-panel",{attrs:{title:"出差备注"}},[e("van-field",{attrs:{type:"textarea",readonly:""},model:{value:a.approval.trip.remark,callback:function(t){a.$set(a.approval.trip,"remark",t)},expression:"approval.trip.remark"}})],1):a._e(),a.approval.cotravelers&&a.approval.cotravelers.length?e("van-panel",{attrs:{title:"同行人员"}},a._l(a.approval.cotravelers,function(a,t){return e("van-cell",{key:"cotraveler-"+t,attrs:{title:"姓名",value:a.userName}})}),1):a._e(),e("van-panel",{attrs:{title:"审批流程"}},[e("van-steps",{attrs:{direction:"vertical"}},a._l(a.approvalLists,function(t,r){return e("van-step",{key:"listItem-"+r},[e("h3",[a._v(a._s(t.title))]),e("p",[a._v(a._s(t.users.join("、")))])])}),1)],1)],2)},l=[],p=(e("ac4d"),e("8a81"),e("ac6a"),e("c5f6"),{name:"ApprovalDetail",props:["approval"],data:function(){return{approvalStatus:{10:"审批中",20:"审批中",30:"审批通过",40:"审批通过",50:"拒绝",60:"撤销"},approvalStep:0,tripWayMap:{0:"单程",1:"往返"},trafficMap:{0:"飞机",1:"火车",2:"汽车",3:"其他"},approvalLists:[]}},methods:{parseDateStr:function(a){return a?(a=new Date(a),"".concat(a.getFullYear(),"年").concat(a.getMonth()+1,"月").concat(a.getDate(),"日")):""},setApprovalDepts:function(a){for(var t in a){var e={title:"",users:[]};"0"!==t&&0!==t||a[t].deptId!==Number(this.approval.deptId)?e.title="第".concat(Number(t)+1,"级主管"):e.title="直接主管";var r=a[t].users||[],l=!0,p=!1,n=void 0;try{for(var o,s=r[Symbol.iterator]();!(l=(o=s.next()).done);l=!0){var v=o.value;e.users.push(v.userName)}}catch(i){p=!0,n=i}finally{try{l||null==s.return||s.return()}finally{if(p)throw n}}this.approvalLists.push(e)}},getApprpvalUsers:function(a){if(a.approvalId){var t=!0,e=!1,r=void 0;try{for(var l,p=a.approvalDepts[Symbol.iterator]();!(t=(l=p.next()).done);t=!0){var n=l.value,o={users:"",approval:n.approval||!1};n.approvalTime&&(this.approvalStep+=1);var s=n.users||[];s.length>=2?o.users="".concat(s[0].userName,"、").concat(s[1].userName):o.users="".concat(s[0].userName),this.approvalUsers.push(o)}}catch(v){e=!0,r=v}finally{try{t||null==p.return||p.return()}finally{if(e)throw r}}40==a.status&&(this.approvalStep=a.approvalDepts.length+2)}}},created:function(){var a=this,t=setInterval(function(){a.approval&&(a.setApprovalDepts(a.approval.approvalDepts),clearInterval(t))},500)}}),n=p,o=(e("1b38"),e("2877")),s=Object(o["a"])(n,r,l,!1,null,null,null);t["a"]=s.exports},"71ff":function(a,t,e){"use strict";e.r(t);var r=function(){var a=this,t=a.$createElement,e=a._self._c||t;return a.approval.approvalId?e("div",{attrs:{id:"approval"}},[e("ApprovalDetail",{attrs:{approval:a.approval}}),e("div",{staticClass:"button-area"},[e("van-row",{attrs:{gutter:"20"}},[20===a.approval.status?e("van-col",{attrs:{span:"12"}},[e("van-button",{attrs:{block:"",type:"danger",plain:""},on:{click:a.rejectApproval}},[a._v("拒绝")])],1):a._e(),20===a.approval.status?e("van-col",{attrs:{span:"12"}},[e("van-button",{attrs:{block:"",type:"primary",plain:""},on:{click:a.passApproval}},[a._v("通过")])],1):a._e()],1)],1)],1):a._e()},l=[],p=e("2083"),n={name:"apply",components:{ApprovalDetail:p["a"]},data:function(){return{approvalId:"",approval:{}}},methods:{getApproval:function(){var a=this;this.$http.get("/ec/api/approvals/".concat(this.approvalId,"/detail")).then(function(t){var e=t.data;0===e.errcode?a.approval=e.data:a.$toast(e.errmsg)}).catch(function(){a.$toast("获取申请单失败")})},rejectApproval:function(){var a=this;this.$dialog.confirm({title:"拒绝申请单",message:"您确定要拒绝该出差申请？",showCancelButton:!0}).then(function(){return a.$http.post("/ec/api/approvals/".concat(a.approval.approvalId,"/reject")).then(function(t){var e=t.data;if(0===e.errcode)return a.$toast("拒绝成功"),void a.getApproval();a.$toast.fail("拒绝失败")})}).catch(function(){})},passApproval:function(){var a=this;this.$dialog.confirm({title:"确认申请单",message:"您确定要通过该出差申请？",showCancelButton:!0}).then(function(){return a.$http.post("/ec/api/approvals/".concat(a.approval.approvalId,"/pass")).then(function(t){var e=t.data;if(0===e.errcode)return a.$toast("通过该申请单成功"),void a.getApproval();a.$toast("通过该申请单失败")})}).catch(function(){})}},created:function(){this.approvalId=this.$route.query.id,this.getApproval()}},o=n,s=e("2877"),v=Object(s["a"])(o,r,l,!1,null,null,null);t["default"]=v.exports}}]);
//# sourceMappingURL=chunk-41c6b41a.adeb1de2.js.map