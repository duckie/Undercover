/**
* The code conventions are:
* - A required module should be prefixed and suffixed by a _, except for UnderscoreJS.
* - A "private" variable or function must be prefixed with a _.
*/

// This module is designed for RequireJS()
define(['underscore'], function(_){

    /**
    * Creates a  new object
    * 
    * There is different methods to implement differential inhderitance in
    * javascript so I use this method to let me test different ways to do it.
    * This could also be ued to optimize depending on the running platform.
    */
    var create_object = function(proto)
    {
        var that = Object.create(proto);
        //that.prototype = proto;
        return that;
    };

    return {
        _create_object: create_object
    };
});
