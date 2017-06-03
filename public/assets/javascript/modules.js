/**
 * @license
 * Fuse - Lightweight fuzzy-search
 *
 * Copyright (c) 2012-2016 Kirollos Risk <kirollos@gmail.com>.
 * All Rights Reserved. Apache Software License 2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!function(t){"use strict";function e(){console.log.apply(console,arguments)}function s(t,e){var s,n,i,o;for(this.list=t,this.options=e=e||{},s=0,o=["sort","shouldSort","verbose","tokenize"],n=o.length;n>s;s++)i=o[s],this.options[i]=i in e?e[i]:h[i];for(s=0,o=["searchFn","sortFn","keys","getFn","include"],n=o.length;n>s;s++)i=o[s],this.options[i]=e[i]||h[i]}function n(t,e,s){var o,r,h,a,c,p;if(e){if(h=e.indexOf("."),-1!==h?(o=e.slice(0,h),r=e.slice(h+1)):o=e,a=t[o],null!==a&&void 0!==a)if(r||"string"!=typeof a&&"number"!=typeof a)if(i(a))for(c=0,p=a.length;p>c;c++)n(a[c],r,s);else r&&n(a,r,s);else s.push(a)}else s.push(t);return s}function i(t){return"[object Array]"===Object.prototype.toString.call(t)}function o(t,e){e=e||{},this.options=e,this.options.location=e.location||o.defaultOptions.location,this.options.distance="distance"in e?e.distance:o.defaultOptions.distance,this.options.threshold="threshold"in e?e.threshold:o.defaultOptions.threshold,this.options.maxPatternLength=e.maxPatternLength||o.defaultOptions.maxPatternLength,this.pattern=e.caseSensitive?t:t.toLowerCase(),this.patternLen=t.length,this.patternLen<=this.options.maxPatternLength&&(this.matchmask=1<<this.patternLen-1,this.patternAlphabet=this._calculatePatternAlphabet())}var r=/ +/g,h={id:null,caseSensitive:!1,include:[],shouldSort:!0,searchFn:o,sortFn:function(t,e){return t.score-e.score},getFn:n,keys:[],verbose:!1,tokenize:!1};s.VERSION="2.2.0",s.prototype.set=function(t){return this.list=t,t},s.prototype.search=function(t){this.options.verbose&&e("\nSearch term:",t,"\n"),this.pattern=t,this.results=[],this.resultMap={},this._keyMap=null,this._prepareSearchers(),this._startSearch(),this._computeScore(),this._sort();var s=this._format();return s},s.prototype._prepareSearchers=function(){var t=this.options,e=this.pattern,s=t.searchFn,n=e.split(r),i=0,o=n.length;if(this.options.tokenize)for(this.tokenSearchers=[];o>i;i++)this.tokenSearchers.push(new s(n[i],t));this.fullSeacher=new s(e,t)},s.prototype._startSearch=function(){var t,e,s,n,i=this.options,o=i.getFn,r=this.list,h=r.length,a=this.options.keys,c=a.length,p=null;if("string"==typeof r[0])for(s=0;h>s;s++)this._analyze("",r[s],s,s);else for(this._keyMap={},s=0;h>s;s++)for(p=r[s],n=0;c>n;n++){if(t=a[n],"string"!=typeof t){if(e=1-t.weight||1,this._keyMap[t.name]={weight:e},t.weight<=0||t.weight>1)throw new Error("Key weight has to be > 0 and <= 1");t=t.name}else this._keyMap[t]={weight:1};this._analyze(t,o(p,t,[]),p,s)}},s.prototype._analyze=function(t,s,n,o){var h,a,c,p,l,u,f,d,g,m,y,v,b,S,k,_=this.options,M=!1;if(void 0!==s&&null!==s)if(a=[],"string"==typeof s){if(h=s.split(r),_.verbose&&e("---------\nKey:",t),_.verbose&&e("Record:",h),this.options.tokenize){for(c=this.tokenSearchers,p=c.length,S=0;S<this.tokenSearchers.length;S++){for(m=this.tokenSearchers[S],y=[],k=0;k<h.length;k++)v=h[k],b=m.search(v),b.isMatch?(M=!0,y.push(b.score),a.push(b.score)):(y.push(1),a.push(1));_.verbose&&e("Token scores:",y)}for(u=a[0],d=a.length,S=1;d>S;S++)u+=a[S];u/=d,_.verbose&&e("Token score average:",u)}g=this.fullSeacher.search(s),_.verbose&&e("Full text score:",g.score),f=g.score,void 0!==u&&(f=(f+u)/2),_.verbose&&e("Score average:",f),(M||g.isMatch)&&(l=this.resultMap[o],l?l.output.push({key:t,score:f,matchedIndices:g.matchedIndices}):(this.resultMap[o]={item:n,output:[{key:t,score:f,matchedIndices:g.matchedIndices}]},this.results.push(this.resultMap[o])))}else if(i(s))for(S=0;S<s.length;S++)this._analyze(t,s[S],n,o)},s.prototype._computeScore=function(){var t,s,n,i,o,r,h,a,c,p=this._keyMap,l=this.results;for(this.options.verbose&&e("\n\nComputing score:\n"),t=0;t<l.length;t++){for(n=0,i=l[t].output,o=i.length,a=1,s=0;o>s;s++)r=i[s].score,h=p?p[i[s].key].weight:1,c=r*h,1!==h?a=Math.min(a,c):(n+=c,i[s].nScore=c);1===a?l[t].score=n/o:l[t].score=a,this.options.verbose&&e(l[t])}},s.prototype._sort=function(){var t=this.options;t.shouldSort&&(t.verbose&&e("\n\nSorting...."),this.results.sort(t.sortFn))},s.prototype._format=function(){var t,s,n,i,o,r=this.options,h=r.getFn,a=[],c=this.results,p=r.include;for(r.verbose&&e("\n\nOutput:\n\n",c),i=r.id?function(t){c[t].item=h(c[t].item,r.id,[])[0]}:function(){},o=function(t){var e,s,n,i,o,r=c[t];if(p.length>0){if(e={item:r.item},-1!==p.indexOf("matches"))for(n=r.output,e.matches=[],s=0;s<n.length;s++)i=n[s],o={indices:i.matchedIndices},i.key&&(o.key=i.key),e.matches.push(o);-1!==p.indexOf("score")&&(e.score=c[t].score)}else e=r.item;return e},s=0,n=c.length;n>s;s++)i(s),t=o(s),a.push(t);return a},o.defaultOptions={location:0,distance:100,threshold:.6,maxPatternLength:32},o.prototype._calculatePatternAlphabet=function(){var t={},e=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]|=1<<this.pattern.length-e-1;return t},o.prototype._bitapScore=function(t,e){var s=t/this.patternLen,n=Math.abs(this.options.location-e);return this.options.distance?s+n/this.options.distance:n?1:s},o.prototype.search=function(t){var e,s,n,i,o,h,a,c,p,l,u,f,d,g,m,y,v,b,S,k,_,M,L=this.options;if(t=L.caseSensitive?t:t.toLowerCase(),this.pattern===t)return{isMatch:!0,score:0,matchedIndices:[[0,t.length-1]]};if(this.patternLen>L.maxPatternLength){if(v=t.match(new RegExp(this.pattern.replace(r,"|"))),b=!!v)for(k=[],e=0,_=v.length;_>e;e++)M=v[e],k.push([t.indexOf(M),M.length-1]);return{isMatch:b,score:b?.5:1,matchedIndices:k}}for(i=L.location,n=t.length,o=L.threshold,h=t.indexOf(this.pattern,i),S=[],e=0;n>e;e++)S[e]=0;for(-1!=h&&(o=Math.min(this._bitapScore(0,h),o),h=t.lastIndexOf(this.pattern,i+this.patternLen),-1!=h&&(o=Math.min(this._bitapScore(0,h),o))),h=-1,m=1,y=[],p=this.patternLen+n,e=0;e<this.patternLen;e++){for(a=0,c=p;c>a;)this._bitapScore(e,i+c)<=o?a=c:p=c,c=Math.floor((p-a)/2+a);for(p=c,l=Math.max(1,i-c+1),u=Math.min(i+c,n)+this.patternLen,f=Array(u+2),f[u+1]=(1<<e)-1,s=u;s>=l;s--)if(g=this.patternAlphabet[t.charAt(s-1)],g&&(S[s-1]=1),0===e?f[s]=(f[s+1]<<1|1)&g:f[s]=(f[s+1]<<1|1)&g|((d[s+1]|d[s])<<1|1)|d[s+1],f[s]&this.matchmask&&(m=this._bitapScore(e,s-1),o>=m)){if(o=m,h=s-1,y.push(h),!(h>i))break;l=Math.max(1,2*i-h)}if(this._bitapScore(e+1,i)>o)break;d=f}return k=this._getMatchedIndices(S),{isMatch:h>=0,score:0===m?.001:m,matchedIndices:k}},o.prototype._getMatchedIndices=function(t){for(var e,s=[],n=-1,i=-1,o=0,r=r=t.length;r>o;o++)e=t[o],e&&-1===n?n=o:e||-1===n||(i=o-1,s.push([n,i]),n=-1);return t[o-1]&&s.push([n,o-1]),s},"object"==typeof exports?module.exports=s:"function"==typeof define&&define.amd?define(function(){return s}):t.Fuse=s}(this);;/*! fuzzycomplete 2016-05-11 */
!function(a){return"undefined"==typeof jQuery?void console.warn("fuzzyComplete plugin requires jQuery"):"undefined"==typeof Fuse?void console.warn("fuzzyComplete plugin requires Fuse.js"):void(a.fn.fuzzyComplete=function(b,c){return this.each(function(){function d(){h.val(g.children(".selected").first().data("id")),f.val(g.children(".selected").first().text())}"undefined"==typeof c&&(c={display:Object.keys(b[0])[0],key:Object.keys(b[0])[0],fuseOptions:{keys:Object.keys(b[0])}});var e=new Fuse(b,c.fuseOptions),f=a(this),g=a("<div>").addClass("fuzzyResults");f.after(g);var h=a("<select>").attr("name",f.attr("name")).hide();f.after(h),f.removeAttr("name");var i=f.position();i.left+=parseInt(f.css("marginLeft"),10),i.top+=parseInt(f.css("marginTop"),10),g.css({left:i.left,top:i.top+f.outerHeight(),width:f.outerWidth()}),f.keydown(function(a){switch(a.which){case 13:return a.preventDefault(),g.hide(),void d();case 9:return g.hide(),void d()}}),f.keyup(function(b){switch(b.which){case 38:var f=g.find(".selected").first();return f.length?(f.removeClass("selected"),f.prev().length?f.prev().addClass("selected"):g.children().last().addClass("selected")):g.children().last().addClass("selected"),void d();case 40:var f=g.find(".selected").first();return f.length?(f.removeClass("selected"),f.next().length?f.next().addClass("selected"):g.children().first().addClass("selected")):g.children().first().addClass("selected"),void d();case 13:return}var i=e.search(a(this).val());g.empty(),0===i.length&&h.val(null),i.forEach(function(b,e){e>=4||(0===e&&h.val(b.id),g.append(a("<div>").text(b[c.display]).data("id",b[c.key]).addClass("__autoitem").on("mousedown",function(a){a.preventDefault()}).click(function(){g.find(".selected").removeClass("selected"),a(this).addClass("selected"),d(),g.hide()})))}),g.children().length?(g.show(),g.children().first().addClass("selected")):g.hide()}),f.blur(function(){g.hide()}),f.focus(function(){g.children().length&&g.show()}),h.append(a("<option>",{value:"",text:"(None Selected)"})),b.forEach(function(b,d){h.append(a("<option>",{value:b[c.key],text:b[c.display]}))}),f.val()&&(f.keyup(),f.blur())})})}(jQuery);;this["Template"] = this["Template"] || {};

this["Template"]["express"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <div class=\"card\">\n    <div class=\"card-header-search\" role=\"tab\" id=\"express-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "-header\">\n      <h5 class=\"mb-0\">\n        <a data-toggle=\"collapse\" data-parent=\"#accordion-express\" href=\"#express-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" aria-expanded=\"true\" aria-controls=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\">\n          "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n        </a>\n      </h5>\n    </div>\n\n    <div id=\"express-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\"express-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "-header\">\n      <div class=\"card-block doc-item\">\n        "
    + ((stack1 = ((helper = (helper = helpers.detail || (depth0 != null ? depth0.detail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"detail","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n      </div>\n    </div>\n  </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"accordion-express\" class=\"express-list\" role=\"tablist\" aria-multiselectable=\"true\">\n  <label id=\"doc-method-listing-head\" data-toggle=\"collapse\" data-target=\"#express-method-list\"> <h2> Express Methods </h2></label>\n  <div id=\"doc-query-result\"></div>\n  <div id=\"express-method-list\" class=\"collapse show\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.express : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n</div>\n";
},"useData":true});

this["Template"]["index"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- Insert server side handlebars template here -->\n";
},"useData":true});

this["Template"]["jquery_answer"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <div class=\"card\">\n    <div class=\"card-header\" role=\"tab\" id=\"jquery-"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "-header\">\n      <!-- <h5 class=\"mb-0\"> -->\n        <!-- <a data-toggle=\"collapse\" data-parent=\"#accordion-jquery\" href=\"#jquery-"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" aria-expanded=\"true\" aria-controls=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"> -->\n          "
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + "\n        <!-- </a> -->\n      <!-- </h5> -->\n    </div>\n  </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div id=\"jquery-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\"jquery-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "-header\">\n      <div class=\"card-block doc-item\">\n        <ul>\n          <li>\n            "
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + "\n          </li>\n        </ul>\n      </div>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div>\n<div>\n    <h2>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " </h2>\n    <p> "
    + alias4(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data}) : helper)))
    + " </p>\n</div>\n<hr />\n<div class=\"long-desc\">\n  "
    + ((stack1 = ((helper = (helper = helpers.longDesc || (depth0 != null ? depth0.longDesc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"longDesc","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n</div>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.examples : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.signatures : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

this["Template"]["jquery_example"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "  <div class=\"card\">\n    <div class=\"card-header\" role=\"tab\" id=\"example-header-"
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n      "
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + "\n    </div>\n  </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.examples : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["Template"]["jquery"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "      <div class=\"card\">\n\n        <div class=\"card-header-search\" role=\"tab\" id=\"jquery-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "-header\">\n          <h5 class=\"mb-0\">\n            <a data-toggle=\"collapse\" data-parent=\"#accordion-jquery\" href=\"#accordion-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n              "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n            </a>\n          </h5>\n        </div>\n\n        <div id=\"accordion-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"collapse\" role=\"tabpanel\">\n          <div class=\"card-block doc-item\">\n            <h2> "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " </h2>\n            <p> "
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " </p>\n            <h3>\n              <label class=\"btn btn-primary detail-link\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"> Details </label>\n              <label class=\"btn btn-primary example-link\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"> Examples </label>\n            </h3>\n            <div id=\"detail-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"collapse hidden\">\n            <!-- Detail inserted here by front-end click handler-->\n            </div>\n\n            <div id=\"examples-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"collapse hidden\">\n\n            </div>\n\n          </div>\n\n        </div>\n      </div>\n  </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"accordion-jquery\" class=\"doc-list\" role=\"tablist\">\n  <label id=\"jquery-list-head\" data-toggle=\"collapse\" data-target=\"#jquery-list\">\n    <h2> JQuery Methods </h2>\n  </label>\n\n  <div id=\"doc-query-result\"></div>\n\n  <div id=\"jquery-list\" class=\"collapse show\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.jquery : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

this["Template"]["mdn"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <div class=\"card\">\n    <div class=\"card-header-search\" role=\"tab\" id=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "-header\">\n      <h5 class=\"mb-0\">\n        <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#"
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\" aria-expanded=\"true\" aria-controls=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\">\n          "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n        </a>\n      </h5>\n    </div>\n\n    <div id=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "-header\">\n      <div class=\"card-block rightDiv\">\n        "
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n      </div>\n    </div>\n  </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"accordion\"  role=\"tablist\" aria-multiselectable=\"true\">\n  <label id=\"mdn-result-listing-head\" data-toggle=\"collapse\" data-target=\"#mdn-result-list\"> <h2> Express Methods </h2></label>\n  <div id=\"mdn-page-result\"></div>\n  <div id=\"mdn-result-list\" class=\"collapse show\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.results : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n</div>\n";
},"useData":true});

this["Template"]["stack_answers"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <div class=\"card\">\n    <div class=\"card-header-search\" role=\"tab\" id=\"header-"
    + alias4(((helper = (helper = helpers.answer_id || (depth0 != null ? depth0.answer_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"answer_id","hash":{},"data":data}) : helper)))
    + "\">\n      <h5 class=\"mb-0\">\n        <a data-toggle=\"collapse\" data-parent=\"#answers-"
    + alias4(((helper = (helper = helpers.parent || (depth0 != null ? depth0.parent : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parent","hash":{},"data":data}) : helper)))
    + "\" href=\"#body-"
    + alias4(((helper = (helper = helpers.answer_id || (depth0 != null ? depth0.answer_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"answer_id","hash":{},"data":data}) : helper)))
    + "\" aria-expanded=\"true\" aria-controls=\"#"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "-header\">\n          User: "
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1.display_name : stack1), depth0))
    + " - score: "
    + alias4(((helper = (helper = helpers.score || (depth0 != null ? depth0.score : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"score","hash":{},"data":data}) : helper)))
    + " - last activity: "
    + alias4(((helper = (helper = helpers.last_activity_date || (depth0 != null ? depth0.last_activity_date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"last_activity_date","hash":{},"data":data}) : helper)))
    + "\n        </a>\n      </h5>\n    </div>\n    <div id=\"body-"
    + alias4(((helper = (helper = helpers.answer_id || (depth0 != null ? depth0.answer_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"answer_id","hash":{},"data":data}) : helper)))
    + "\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\"header-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n      <div class=\"card-block leftDiv\">\n        "
    + ((stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"body","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n      </div>\n    </div>\n  </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "\n<div id=\"answers-"
    + container.escapeExpression(((helper = (helper = helpers.parent_id || (depth0 != null ? depth0.parent_id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"parent_id","hash":{},"data":data}) : helper)))
    + "\" role=\"tablist\" aria-multiselectable=\"true\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.answers : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

this["Template"]["stack"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <div class=\"card\">\n    <div class=\"card-header-search\" role=\"tab\" id=\"header-"
    + alias4(((helper = (helper = helpers.question_id || (depth0 != null ? depth0.question_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question_id","hash":{},"data":data}) : helper)))
    + "\">\n      <h5 class=\"mb-0\">\n        <a data-toggle=\"collapse\" data-parent=\"#accordion-stack-questions\" href=\"#body-"
    + alias4(((helper = (helper = helpers.question_id || (depth0 != null ? depth0.question_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question_id","hash":{},"data":data}) : helper)))
    + "\" aria-expanded=\"true\" aria-controls=\"#header-"
    + alias4(((helper = (helper = helpers.question_id || (depth0 != null ? depth0.question_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question_id","hash":{},"data":data}) : helper)))
    + "\">\n          "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n        </a>\n      </h5>\n    </div>\n    <div id=\"body-"
    + alias4(((helper = (helper = helpers.question_id || (depth0 != null ? depth0.question_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question_id","hash":{},"data":data}) : helper)))
    + "\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\"header-"
    + alias4(((helper = (helper = helpers.question_id || (depth0 != null ? depth0.question_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question_id","hash":{},"data":data}) : helper)))
    + "\">\n      <div class=\"card-block leftDiv\">\n        "
    + ((stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"body","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        <div id=\"answers-"
    + alias4(((helper = (helper = helpers.question_id || (depth0 != null ? depth0.question_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question_id","hash":{},"data":data}) : helper)))
    + "\">\n          <button class=\"btn btn-primary stack-question\" data-id=\""
    + alias4(((helper = (helper = helpers.question_id || (depth0 != null ? depth0.question_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question_id","hash":{},"data":data}) : helper)))
    + "\">See Answers</button>\n        </div>\n      </div>\n\n      </div>\n    </div>\n  </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"accordion-stack-questions\" role=\"tablist\" aria-multiselectable=\"true\">\n  <h2>Stack Questions</h2>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.questions : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});