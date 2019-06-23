(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{174:function(e,t,o){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}o.d(t,"a",function(){return r})},175:function(e,t,o){"use strict";o.d(t,"a",function(){return r});var r={data:function(){return{urlAPI:"https://arcane-sea-21496.herokuapp.com/"}}}},178:function(e,t,o){"use strict";o.d(t,"a",function(){return n});var r=o(174),n=function e(data){if(Object(r.a)(this,e),!data)return{label:null,code:"#ffffff"};this.id=data.id,this.code=data.code?data.code:null,this.label=data.label?data.label:null}},179:function(e,t,o){var content=o(190);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(35).default)("70e25e98",content,!0,{sourceMap:!1})},183:function(e,t,o){"use strict";var r=o(13),n={props:{colorData:{type:Object,required:!0},editable:{type:Boolean,required:!1,default:!0},preview:{type:Boolean,required:!1,default:!1}},data:function(){return{color:this.colorData,colorEdit:Object(r.a)({},this.colorData),editing:!1}},watch:{colorData:function(e){this.color=e}},methods:{cancelEditing:function(){this.color=Object(r.a)({},this.colorEdit),this.editing=!1},updateColor:function(){this.$emit("update",this.color),this.editing=!1,this.colorEdit=Object(r.a)({},this.color)},deleteColor:function(){this.$emit("delete",this.color.id)}}},l=o(19),component=Object(l.a)(n,function(){var e=this,t=e.$createElement,o=e._self._c||t;return e.preview?o("div",{staticClass:"inline-flex"},[o("div",{staticClass:"h-8 w-8 rounded m-2",style:e.color.code?"background-color:"+e.color.code:"red",attrs:{title:e.color.label}})]):o("div",[o("div",{staticClass:"bg-white w-full inline-flex flex-col border-solid border-2 border-gray-500 rounded-lg"},[o("div",{staticClass:"w-full h-24 rounded-t-lg border-b-2",style:e.color.code?"background-color:"+e.color.code:"red"}),e._v(" "),o("span",{staticClass:"border-solid border-2 rounded-lg text-center -mt-6 mx-2 p-2 bg-gray-400"},[e._v(e._s(e.color.label||"No name"))]),e._v(" "),!e.editing&&e.editable?o("button",{staticClass:"bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer",on:{click:function(t){e.editing=!0}}},[e._v("Edit")]):e._e(),e._v(" "),e.editing?o("div",{staticClass:"px-2"},[o("label",{staticClass:"md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2"},[e._v("\n        Label\n        "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.color.label,expression:"color.label"}],staticClass:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",attrs:{type:"text",placeholder:"Name for the color"},domProps:{value:e.color.label},on:{input:function(t){t.target.composing||e.$set(e.color,"label",t.target.value)}}})]),e._v(" "),o("label",{staticClass:"md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2"},[e._v("\n        Color\n        "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.color.code,expression:"color.code"}],staticClass:"shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline",attrs:{type:"color",placeholder:"Name for the color"},domProps:{value:e.color.code},on:{input:function(t){t.target.composing||e.$set(e.color,"code",t.target.value)}}})]),e._v(" "),o("button",{staticClass:"bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer",on:{click:e.updateColor}},[e._v("OK")]),e._v(" "),o("button",{staticClass:"bg-red-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer",on:{click:e.cancelEditing}},[e._v("Cancel")])]):e._e(),e._v(" "),e.editable?o("button",{staticClass:"bg-red-700 hover:bg-red-800 text-white p-2 rounded m-2",on:{click:e.deleteColor}},[e._v("Delete this color")]):e._e()])])},[],!1,null,null,null);t.a=component.exports},189:function(e,t,o){"use strict";var r=o(179);o.n(r).a},190:function(e,t,o){(e.exports=o(34)(!1)).push([e.i,".color-list{display:grid;grid-gap:1rem;-webkit-box-pack:center;justify-content:center;grid-template-columns:repeat(auto-fit,minmax(10rem,20rem))}",""])},202:function(e,t,o){"use strict";o.r(t);var r=o(13),n=(o(52),o(53),o(38),o(37),o(5)),l=o(68),c=o.n(l),d=o(178),f=o(183),h={mixins:[o(175).a],components:{Color:f.a},data:function(){return{colors:[],newColor:new d.a}},computed:{colorMessage:function(){return this.colors.length>0?"These are the colors available":"There are no colors yet! Start creating some 👇"}},mounted:function(){this.getColors()},methods:{getColors:function(){var e=Object(n.a)(regeneratorRuntime.mark(function e(){var t,o,r,n,l,f,h;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.get("".concat(this.urlAPI,"colors"));case 2:for(t=e.sent,o=!0,r=!1,n=void 0,e.prev=6,l=t.data.results[Symbol.iterator]();!(o=(f=l.next()).done);o=!0)h=f.value,this.colors.push(new d.a(h));e.next=14;break;case 10:e.prev=10,e.t0=e.catch(6),r=!0,n=e.t0;case 14:e.prev=14,e.prev=15,o||null==l.return||l.return();case 17:if(e.prev=17,!r){e.next=20;break}throw n;case 20:return e.finish(17);case 21:return e.finish(14);case 22:case"end":return e.stop()}},e,this,[[6,10,14,22],[15,,17,21]])}));return function(){return e.apply(this,arguments)}}(),createColor:function(){var e=Object(n.a)(regeneratorRuntime.mark(function e(){var t,o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={code:this.newColor.code,label:this.newColor.label},e.next=3,c.a.post("".concat(this.urlAPI,"colors"),{params:t});case 3:o=e.sent,console.log(o),o.data.success&&(this.colors.push(new d.a(Object(r.a)({},t,{id:o.data.id}))),this.newColor=new d.a);case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),updateColor:function(){var e=Object(n.a)(regeneratorRuntime.mark(function e(t){var o,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o={code:t.code,label:t.label},e.next=3,c.a.put("".concat(this.urlAPI,"color/").concat(t.id),o);case 3:r=e.sent,console.log(r);case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),deleteColor:function(){var e=Object(n.a)(regeneratorRuntime.mark(function e(t){var o,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.delete("".concat(this.urlAPI,"color/").concat(t));case 2:for(o=e.sent,console.log(o),i=0;i<this.colors.length;i++)this.colors[i].id===t&&this.colors.splice(i,1);case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}},m=(o(189),o(19)),v={data:function(){return{}},components:{"color-list":Object(m.a)(h,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"container mx-auto my-8 px-4"},[o("h2",{staticClass:"bg-blue-200 my-2 text-center text-xl rounded-lg p-2 font-bold"},[e._v(e._s(e.colorMessage))]),e._v(" "),o("section",{staticClass:"color-list"},e._l(e.colors,function(t){return o("color",{key:t.id,attrs:{"color-data":t},on:{delete:e.deleteColor,update:e.updateColor}})}),1),e._v(" "),o("p",{staticClass:"bg-blue-200 my-2 text-center rounded-lg p-2 font-bold"},[e._v("✔️ Add a new color")]),e._v(" "),o("div",{staticClass:"my-2 flex flex-wrap"},[o("div",{staticClass:"px-2 md:w-1/2"},[o("form",{staticClass:"p-2 bg-white rounded-lg",on:{submit:function(t){return t.preventDefault(),e.createColor(t)}}},[o("label",{staticClass:"md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2"},[e._v("\n          Name\n          "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.newColor.label,expression:"newColor.label"}],staticClass:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",attrs:{required:"",type:"text",placeholder:"Name",maxlength:"25"},domProps:{value:e.newColor.label},on:{input:function(t){t.target.composing||e.$set(e.newColor,"label",t.target.value)}}})]),e._v(" "),o("label",{staticClass:"md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2"},[e._v("\n          Color\n          "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.newColor.code,expression:"newColor.code"}],staticClass:"w-full h-6 my-2",attrs:{required:"",type:"color"},domProps:{value:e.newColor.code},on:{input:function(t){t.target.composing||e.$set(e.newColor,"code",t.target.value)}}})]),e._v(" "),o("input",{staticClass:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer",attrs:{type:"submit",value:"Add"}})])]),e._v(" "),o("div",{staticClass:"md:w-1/2"},[o("color",{attrs:{"color-data":e.newColor,editable:!1}})],1)])])},[],!1,null,null,null).exports}},w=Object(m.a)(v,function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("color-list")],1)},[],!1,null,null,null);t.default=w.exports}}]);