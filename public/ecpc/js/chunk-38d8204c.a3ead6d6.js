(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38d8204c"],{"09f0":function(e,t,a){"use strict";var s=a("8a7c"),r=a.n(s);r.a},"0a49":function(e,t,a){var s=a("9b43"),r=a("626a"),i=a("4bf8"),n=a("9def"),l=a("cd1c");e.exports=function(e,t){var a=1==e,o=2==e,c=3==e,u=4==e,p=6==e,d=5==e||p,f=t||l;return function(t,l,y){for(var m,b,v=i(t),g=r(v),h=s(l,y,3),w=n(g.length),_=0,x=a?f(t,w):o?f(t,0):void 0;w>_;_++)if((d||_ in g)&&(m=g[_],b=h(m,_,v),e))if(a)x[_]=b;else if(b)switch(e){case 3:return!0;case 5:return m;case 6:return _;case 2:x.push(m)}else if(u)return!1;return p?-1:c||u?u:x}}},1169:function(e,t,a){var s=a("2d95");e.exports=Array.isArray||function(e){return"Array"==s(e)}},"20d6":function(e,t,a){"use strict";var s=a("5ca1"),r=a("0a49")(6),i="findIndex",n=!0;i in[]&&Array(1)[i](function(){n=!1}),s(s.P+s.F*n,"Array",{findIndex:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),a("9c6c")(i)},"41f3":function(e,t,a){"use strict";var s=a("bd16"),r=a.n(s);r.a},6440:function(e,t,a){},8132:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"types"}},[a("Header",[a("el-breadcrumb",{attrs:{slot:"left","separator-class":"el-icon-arrow-right"},slot:"left"},[a("el-breadcrumb-item",[e._v("预算管理")]),a("el-breadcrumb-item",[e._v("类型维护")])],1),a("div",{attrs:{slot:"right"},slot:"right"})],1),a("div",{staticClass:"inner"},[a("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"预算类型",name:"budgets"}},[a("TypeViews",{attrs:{grouptype:"budgets"}})],1),a("el-tab-pane",{attrs:{label:"收入目标",name:"incomings",lazy:!0}},[a("TypeViews",{attrs:{grouptype:"incomings"}})],1),a("el-tab-pane",{attrs:{label:"文件上传",name:"files",lazy:!0}},[a("Upload")],1)],1)],1)],1)},r=[],i=a("0418"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"types"}},[a("el-row",[a("el-col",{attrs:{span:16}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.typeLists,border:""}},[a("el-table-column",{attrs:{prop:"code",label:"编码",width:"180"}}),a("el-table-column",{attrs:{prop:"name",label:"名称",width:"180"}}),a("el-table-column",{attrs:{label:"类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(e.typeMap[t.row.catalog])+"\n          ")]}}])}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return 1===t.row.catalog?[a("el-button",{attrs:{type:"danger",size:"small",plain:""},on:{click:function(a){return e.deleteType(t.row)}}},[e._v("删除")]),a("el-button",{attrs:{type:"warning",size:"small",plain:""},on:{click:function(a){return e.editType(t.row)}}},[e._v("编辑")])]:void 0}}],null,!0)})],1),a("div",{staticClass:"type-btns"},[a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:e.showTypeEdit}},[e._v("新 增 类 型")])],1)],1)],1),a("el-dialog",{attrs:{title:"类型编辑",visible:e.editShow,width:"50%"},on:{"update:visible":function(t){e.editShow=t}}},[a("div",[a("el-form",{ref:"typeform",attrs:{model:e.typeData,rules:e.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"编码",prop:"code"}},[a("el-input",{model:{value:e.typeData.code,callback:function(t){e.$set(e.typeData,"code",t)},expression:"typeData.code"}})],1),a("el-form-item",{attrs:{label:"名称",prop:"name"}},[a("el-input",{model:{value:e.typeData.name,callback:function(t){e.$set(e.typeData,"name",t)},expression:"typeData.name"}})],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.editShow=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"success"},on:{click:e.save}},[e._v("保 存")])],1)])],1)},l=[],o=(a("20d6"),{name:"typeviews",props:["grouptype"],data:function(){return{typeLists:[],typeMap:{0:"系统定义",1:"用户自建"},editShow:!1,typeData:{},rules:{code:[{required:!0,message:"请输入编码",trigger:"blur"},{min:2,message:"最少输入2个字符",trigger:"blur"}],name:[{required:!0,message:"请输入名称",trigger:"blur"},{min:2,message:"最少输入2个字符",trigger:"blur"}]}}},methods:{getTypeLists:function(){var e=this;this.$http.get("/ec/api/types?type=".concat(this.grouptype||"budgets")).then(function(t){var a=t.data;0===a.errcode&&(e.typeLists=a.data||[])})},showTypeEdit:function(){this.typeData={code:"",name:"",type:this.grouptype,catalog:1},this.editShow=!0},editType:function(e){this.typeData=e,this.editShow=!0},deleteType:function(e){var t=this;this.typeData=e,this.$http({url:"/ec/api/types",method:"DELETE",data:this.typeData}).then(function(e){0===e.data.errcode&&(t.$message({message:"删除成功",type:"success"}),t.getTypeLists(),t.editShow=!1)})},save:function(){var e=this;this.$refs.typeform.validate(function(t){if(t){var a="POST";if(e.typeData._id&&(a="PUT"),"POST"===a){var s=e.typeLists.findIndex(function(t){return t.code===e.typeData.code});if(s>-1)return e.$message({message:"已经存在编码为 ".concat(e.typeData.code,"的类型")})}else{var r=e.typeLists.findIndex(function(t){return t.code===e.typeData.code&&t._id!==e.typeData._id});if(r>-1)return e.$message({message:"已经存在编码为 ".concat(e.typeData.code,"的类型")})}e.$http({url:"/ec/api/types",method:a,data:e.typeData}).then(function(t){0===t.data.errcode&&(e.$message({message:"保存成功",type:"success"}),e.getTypeLists(),e.editShow=!1)})}else e.$message({message:"请正确填写类型信息",type:"warning"})})}},created:function(){this.getTypeLists()}}),c=o,u=(a("09f0"),a("2877")),p=Object(u["a"])(c,n,l,!1,null,null,null),d=p.exports,f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{"margin-left":"20px"}},[a("el-form",{ref:"form",attrs:{model:e.type,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"年 份",prop:"year"}},[a("el-date-picker",{attrs:{type:"year",placeholder:"选择年",format:"yyyy年","value-format":"yyyy"},model:{value:e.type.year,callback:function(t){e.$set(e.type,"year",t)},expression:"type.year"}})],1),a("el-form-item",{attrs:{label:"预算/收入",prop:"type"}},[a("el-select",{attrs:{placeholder:"请选择文件类型"},model:{value:e.type.type,callback:function(t){e.$set(e.type,"type",t)},expression:"type.type"}},[a("el-option",{attrs:{label:"部门预算",value:"budgets"}})],1)],1),a("el-form-item",{attrs:{label:"上传文件"}},[a("el-upload",{ref:"upload",attrs:{drag:"",action:"/ec/api/files/upload",limit:1,accept:".xlsx","file-list":e.fileList,"auto-upload":!1,data:e.type,"with-credentials":!0}},[a("i",{staticClass:"el-icon-upload"}),a("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),a("em",[e._v("点击上传")])]),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("*只能上传指定格式的xlxs文件")])])],1),a("el-form-item",[a("el-button",{attrs:{type:"success"},on:{click:function(t){return e.submitForm()}}},[e._v("上 传")])],1)],1)],1)},y=[],m={name:"upload",data:function(){return{type:{type:"budgets",year:new Date},rules:{year:[{required:!0,message:"请选择年份",trigger:"change"}],type:[{required:!0,message:"请选择文件类型",trigger:"change"}]},fileList:[]}},methods:{submitForm:function(){var e=this;this.$refs.form.validate(function(t){t&&e.$refs.upload.submit()})}}},b=m,v=(a("41f3"),Object(u["a"])(b,f,y,!1,null,null,null)),g=v.exports,h={name:"types",components:{Header:i["a"],TypeViews:d,Upload:g},data:function(){return{activeName:"files"}}},w=h,_=(a("be76"),Object(u["a"])(w,s,r,!1,null,null,null));t["default"]=_.exports},"8a7c":function(e,t,a){},bd16:function(e,t,a){},be76:function(e,t,a){"use strict";var s=a("6440"),r=a.n(s);r.a},cd1c:function(e,t,a){var s=a("e853");e.exports=function(e,t){return new(s(e))(t)}},e853:function(e,t,a){var s=a("d3f4"),r=a("1169"),i=a("2b4c")("species");e.exports=function(e){var t;return r(e)&&(t=e.constructor,"function"!=typeof t||t!==Array&&!r(t.prototype)||(t=void 0),s(t)&&(t=t[i],null===t&&(t=void 0))),void 0===t?Array:t}}}]);
//# sourceMappingURL=chunk-38d8204c.a3ead6d6.js.map