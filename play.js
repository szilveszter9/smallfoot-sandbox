window.l = require('../aggr.js');
var domready = require("domready");


var app = l.compose(
  l.log.value,
  l.string.upper,
  l.object.getValue('innerHTML'),
  l.dom.getDomElement
);
l.log.value('--app created--');


var app2 = l.compose(
  l.log.obj,
  l.args.transparent(
    l.compose(
      l.log.obj,
      l.array.filter(
        function(val, idx, arr){
          return idx > 5
        }
      )
    )
  ),
  l.string.toArray,
  l.args.transparent(
    l.compose(
      l.log.obj,
      l.array.toString,
      l.array.slice(0,1),
      l.log.obj,
      l.string.split(' ')
    )
  ),
  l.args.transparent(l.log.value),
  l.string.upper,
  l.object.getValue('innerHTML'),
  l.dom.getDomElement
);
l.log.value('--app2 created--');


var getElSetHtml = l.compose(l.dom.setElHtml, l.args.opaque(1, l.dom.getDomElement));
var setMydiv = getElSetHtml('#mydiv');
var getElSetHtml = l.compose(l.dom.setElHtml, l.dom.getDomElement);
function app3(){
  l.log.value('--start app3--');
  var setMydiv = getElSetHtml('#mydiv');
  setMydiv('5 sec');
}


function app4(){
  l.log.value('--start app4--');
  var setMydiv = getElSetHtml('#mydiv');
  setMydiv('7 sec');
}


var userTemplate = l.template.set('<div class="avatar">{{login}}<img src="{{avatar_url}}"/></div>');
var url = "https://api.github.com/repos/mozilla/kuma/contributors";
var userTemplates = l.compose(l.map(userTemplate), l.http.getResponseJSON);
var usersTemplate = l.compose(l.array.toString, userTemplates);
var eitherUsersTemplate = l.compose(l.Either('could not generate the template'), l.array.toString, userTemplates);
function app5(){
  var setMydiv = getElSetHtml('#mydiv');
  var showUsers = l.compose(l.map(setMydiv), eitherUsersTemplate);
  l.http.get(showUsers)(url)();
}






domready(function() {
  l.log.value('--start app--');
  app('#mydiv');
  l.log.value('--start app2--');
  app2('#mydiv');
  setTimeout(app3, 5000);
  setTimeout(app4, 7000);
  setTimeout(app5, 10000);
});
