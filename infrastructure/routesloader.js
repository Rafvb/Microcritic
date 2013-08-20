var fs = require('fs'),
    path = require('path');

exports.init = function(app) {
  var RouteDir = 'routes',
      files = fs.readdirSync(RouteDir);
  
  files.forEach(function (file) {
      var filePath = path.resolve('./', RouteDir, file),
          route = require(filePath);
      route.init(app);
  });
};