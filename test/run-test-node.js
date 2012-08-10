var requirejs = require("requirejs"),
fs = require("fs"),
jasmine = require("jasmine-node"),
TerminalReporter = require("jasmine-node/lib/jasmine-node/reporter").jasmineNode.TerminalReporter;

var spec_list = [];
var executeJasmine;

requirejs.config({
    nodeRequire: require,
    baseUrl: 'src/'
});

["test/specs"].forEach(function (path) {
    fs.readdirSync(path).forEach(function (file) {
    	var file_name = ('../'+path+'/'+file); // '../' is because 'src/' is the root for RequireJS as configured previously
    	var base_name = file_name.substr(0,file_name.length - 3);
    	var ext = file_name.substr(file_name.length - 3);

        //requirejs(path+"/"+file);
        if('.js' === ext) {
        	spec_list.push(base_name);
        }
        
    });
});

executeJasmine = function () {
	jasmine.getEnv().addReporter(new TerminalReporter({}));
	jasmine.getEnv().execute();
};

requirejs.apply(requirejs, [spec_list, executeJasmine]);
