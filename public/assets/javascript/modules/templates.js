this["Template"] = this["Template"] || {};

this["Template"]["express"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <div class=\"card\">\n    <div class=\"card-header\" role=\"tab\" id=\"express-"
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
    + ((stack1 = ((helper = (helper = helpers.html || (depth0 != null ? depth0.html : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"html","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n      </div>\n    </div>\n  </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"accordion-express\" class=\"express-list\" role=\"tablist\" aria-multiselectable=\"true\">\n  <label id=\"doc-method-listing-head\" data-toggle=\"collapse\" data-target=\"#express-method-list\"> <h2> Express Methods </h2></label>\n  <div id=\"express-query-result\"></div>\n  <div id=\"express-method-list\" class=\"collapse show\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.express : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n</div>\n";
},"useData":true});

this["Template"]["index"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- Insert server side handlebars template here -->\n";
},"useData":true});

this["Template"]["jquery"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <div class=\"card\">\n    <div class=\"card-header\" role=\"tab\" id=\"jquery-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "-header\">\n      <h5 class=\"mb-0\">\n        <a data-toggle=\"collapse\" data-parent=\"#accordion-jquery\" href=\"#jquery-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" aria-expanded=\"true\" aria-controls=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n          "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n        </a>\n      </h5>\n    </div>\n\n    <div id=\"jquery-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\"jquery-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "-header\">\n      <div class=\"card-block doc-item\">\n        "
    + ((stack1 = ((helper = (helper = helpers.html || (depth0 != null ? depth0.html : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"html","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n      </div>\n    </div>\n  </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"accordion-jquery\" class=\"doc-list\" role=\"tablist\" aria-multiselectable=\"true\">\n  <label id=\"jquery-list-head\" data-toggle=\"collapse\" data-target=\"#jquery-list\"> <h2> JQuery Methods </h2></label>\n  <div id=\"jquery-page-result\"></div>\n  <div id=\"jquery-list\" class=\"collapse show\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.jquery : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n</div>\n";
},"useData":true});

this["Template"]["mdn"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <div class=\"card\">\n    <div class=\"card-header\" role=\"tab\" id=\""
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

  return "  <div class=\"card\">\n    <div class=\"card-header\" role=\"tab\" id=\"header-"
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

  return "  <div class=\"card\">\n    <div class=\"card-header\" role=\"tab\" id=\"header-"
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