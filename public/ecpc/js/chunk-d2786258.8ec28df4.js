(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d2786258"],{"07c8":function(e,t,a){},"34e8":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"types"}},[a("Header",[a("el-breadcrumb",{attrs:{slot:"left","separator-class":"el-icon-arrow-right"},slot:"left"},[a("el-breadcrumb-item",[e._v("基本设置")]),a("el-breadcrumb-item",[e._v("预算导入")])],1),a("div",{attrs:{slot:"right"},slot:"right"})],1),a("div",{staticClass:"content"},[a("el-row",[a("el-col",{attrs:{span:14}},[a("Upload")],1),a("el-col",{attrs:{span:10}},[a("h4",[e._v("Excel文件模板")]),a("a",{attrs:{href:"/ec/api/files/template",download:"模板.zip"}},[a("el-button",{attrs:{type:"success",plain:"",size:"small"}},[e._v("模板下载")])],1),a("p",{staticStyle:{color:"red"}},[e._v("点击下载预算模板")])])],1)],1)],1)},r=[],s=a("0418"),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-form",{ref:"form",attrs:{model:e.type,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"年 份",prop:"year"}},[a("el-date-picker",{attrs:{type:"year",placeholder:"选择年",format:"yyyy年","value-format":"yyyy"},model:{value:e.type.year,callback:function(t){e.$set(e.type,"year",t)},expression:"type.year"}})],1),a("el-form-item",{attrs:{label:"预算/收入",prop:"type"}},[a("el-select",{attrs:{placeholder:"请选择文件类型"},model:{value:e.type.type,callback:function(t){e.$set(e.type,"type",t)},expression:"type.type"}},[a("el-option",{attrs:{label:"部门预算",value:"budgets"}}),a("el-option",{attrs:{label:"收入目标",value:"incomings"}})],1)],1),a("el-form-item",{attrs:{label:"上传文件"}},[a("el-upload",{ref:"upload",attrs:{drag:"",action:"/ec/api/files/upload",limit:1,accept:".xlsx","file-list":e.fileList,"auto-upload":!1,data:e.type,"with-credentials":!0}},[a("i",{staticClass:"el-icon-upload"}),a("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),a("em",[e._v("点击上传")])]),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("*请先下载相应的预算模板，输入内容后再上传文件")])])],1),a("el-form-item",[a("el-button",{attrs:{type:"success",plain:"",size:"small"},on:{click:function(t){return e.submitForm()}}},[e._v("上 传")])],1)],1)],1)},o=[],n={name:"upload",data:function(){return{type:{type:"budgets",year:new Date,userId:null},rules:{year:[{required:!0,message:"请选择年份",trigger:"change"}],type:[{required:!0,message:"请选择文件类型",trigger:"change"}]},fileList:[]}},methods:{submitForm:function(){var e=this;this.$refs.form.validate(function(t){t&&e.$refs.upload.submit()})}},created:function(){var e=JSON.parse(localStorage.getItem("user"));this.type.userId=e.userId}},c=n,p=(a("9b2f"),a("2877")),u=Object(p["a"])(c,i,o,!1,null,"57adc8e5",null),d=u.exports,m={name:"files",components:{Header:s["a"],Upload:d},data:function(){return{}}},f=m,y=Object(p["a"])(f,l,r,!1,null,null,null);t["default"]=y.exports},"9b2f":function(e,t,a){"use strict";var l=a("07c8"),r=a.n(l);r.a}}]);
//# sourceMappingURL=chunk-d2786258.8ec28df4.js.map