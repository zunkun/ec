(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-41c6b41a"],{"1b38":function(a,t,e){"use strict";var r=e("1d89"),p=e.n(r);p.a},"1d89":function(a,t,e){},2083:function(a,t,e){"use strict";var r=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{attrs:{id:"approvaldetail"}},[e("div",{staticStyle:{padding:"10px 15px",color:"red"}},[a._v("\n    当前状态: "+a._s(a.approvalStatus[a.approval.status])+"\n  ")]),e("van-panel",{attrs:{title:"员工信息"}},[e("van-cell-group",[e("van-cell",{attrs:{title:"姓名",value:a.approval.userName}}),e("van-cell",{attrs:{title:"部门",value:a.approval.deptName}})],1)],1),e("van-panel",{attrs:{title:"出差申请",desc:"出差基本信息"}},[a.approval.trip?e("van-cell-group",[e("van-field",{attrs:{disabled:"",type:"textarea",label:"出差事由"},model:{value:a.approval.trip.cause,callback:function(t){a.$set(a.approval.trip,"cause",t)},expression:"approval.trip.cause"}})],1):a._e()],1),a._l(a.approval.itineraries,function(t,r){return e("van-panel",{key:"itinerary-"+r,attrs:{title:"行程列表 "+(r+1)}},[e("van-cell",{attrs:{title:"行程类型",value:a.tripWayMap[t.tripWay]}}),e("van-cell",{attrs:{title:"交通方式",value:a.trafficMap[t.trafficType]}}),e("van-cell",{attrs:{title:"出发城市",value:t.depCity}}),e("van-cell",{attrs:{title:"目的城市",value:t.arrCity}}),e("van-cell",{attrs:{title:"出发日期",value:a.parseDateStr(t.depDate)}}),e("van-cell",{attrs:{title:"出发日期",value:a.parseDateStr(t.arrDate)}})],1)}),a.approval.cotravelers&&a.approval.cotravelers.length?e("van-panel",{attrs:{title:"同行人员"}},a._l(a.approval.cotravelers,function(a,t){return e("van-cell",{key:"cotraveler-"+t,attrs:{title:"姓名",value:a.userName}})}),1):a._e()],2)},p=[],l=(e("ac4d"),e("8a81"),e("ac6a"),{name:"ApprovalDetail",props:["approval"],data:function(){return{approvalStatus:{10:"待审批",20:"审批中",30:"审批通过",40:"进入商旅",50:"已拒绝",60:"员工取消"},approvalStep:0,tripWayMap:{0:"单程",1:"往返"},trafficMap:{0:"飞机",1:"火车",2:"汽车",3:"其他"}}},methods:{parseDateStr:function(a){return a?(a=new Date(a),"".concat(a.getFullYear(),"年").concat(a.getMonth()+1,"月").concat(a.getDate(),"日").concat(a.getHours(),"时").concat(a.getMinutes(),"分")):""},getApprpvalUsers:function(a){if(a.approvalId){var t=!0,e=!1,r=void 0;try{for(var p,l=a.approvalDepts[Symbol.iterator]();!(t=(p=l.next()).done);t=!0){var n=p.value,o={users:"",approval:n.approval||!1};n.approvalTime&&(this.approvalStep+=1);var s=n.users||[];s.length>=2?o.users="".concat(s[0].userName,"、").concat(s[1].userName):o.users="".concat(s[0].userName),this.approvalUsers.push(o)}}catch(c){e=!0,r=c}finally{try{t||null==l.return||l.return()}finally{if(e)throw r}}40==a.status&&(this.approvalStep=a.approvalDepts.length+2)}}}}),n=l,o=(e("1b38"),e("2877")),s=Object(o["a"])(n,r,p,!1,null,null,null);t["a"]=s.exports},"71ff":function(a,t,e){"use strict";e.r(t);var r=function(){var a=this,t=a.$createElement,e=a._self._c||t;return a.approval.approvalId?e("div",{attrs:{id:"approval"}},[e("ApprovalDetail",{attrs:{approval:a.approval}}),e("div",{staticClass:"button-area"},[e("van-row",{attrs:{gutter:"20"}},[20===a.approval.status?e("van-col",{attrs:{span:"12"}},[e("van-button",{attrs:{block:"",type:"danger",plain:""},on:{click:a.rejectApproval}},[a._v("拒绝")])],1):a._e(),20===a.approval.status?e("van-col",{attrs:{span:"12"}},[e("van-button",{attrs:{block:"",type:"primary",plain:""},on:{click:a.passApproval}},[a._v("通过")])],1):a._e()],1)],1)],1):a._e()},p=[],l=e("2083"),n={name:"apply",components:{ApprovalDetail:l["a"]},data:function(){return{approvalId:"",approval:{}}},methods:{getApproval:function(){var a=this;this.$http.get("/ec/api/approvals/".concat(this.approvalId,"/detail")).then(function(t){var e=t.data;0===e.errcode?a.approval=e.data:a.$toast(e.errmsg)}).catch(function(){a.$toast("获取申请单失败")})},rejectApproval:function(){var a=this;this.$dialog.confirm({title:"拒绝申请单",message:"您确定要拒绝该出差申请？",showCancelButton:!0}).then(function(){return a.$http.post("/ec/api/approvals/".concat(a.approval.approvalId,"/reject")).then(function(t){var e=t.data;if(0===e.errcode)return a.$toast("拒绝成功"),void a.getApproval();a.$toast.fail("拒绝失败")})}).catch(function(){})},passApproval:function(){var a=this;this.$dialog.confirm({title:"确认申请单",message:"您确定要通过该出差申请？",showCancelButton:!0}).then(function(){return a.$http.post("/ec/api/approvals/".concat(a.approval.approvalId,"/pass")).then(function(t){var e=t.data;if(0===e.errcode)return a.$toast("通过该申请单成功"),void a.getApproval();a.$toast("通过该申请单失败")})}).catch(function(){})}},created:function(){this.approvalId=this.$route.query.id,this.getApproval()}},o=n,s=e("2877"),c=Object(s["a"])(o,r,p,!1,null,null,null);t["default"]=c.exports}}]);
//# sourceMappingURL=chunk-41c6b41a.f655db1e.js.map