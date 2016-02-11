window.l = require('../aggr.js');
var domready = require("domready");


var app = l.compose(
  l.log.value,
  l.string.upper,
  l.object.getValue('innerHTML'),
  l.dom.getDomElement
);

l.log.value('--app created--');


domready(function() {
  l.log.value('--start app--');
  app('#mydiv');
});
