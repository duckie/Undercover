/**
* The code conventions are:
* - A required module should be prefixed and suffixed by a _, except for UnderscoreJS.
* - A "private" variable or function must be prefixed with a _.
*/

// This module is designed for RequireJS()
define(['underscore'], function(_){

    /**
    * Protype used to created different objects, in particular those with
    * non-writable properties
    */

    var uc_object_prototype = {};

    /**
    * Creates a  new object
    * 
    * There is different methods to implement differential inhderitance in
    * javascript so I use this method to let me test different ways to do it.
    * This could also be ued to optimize depending on the running platform.
    */
    function create_object (proto, properties)
    {
        return Object.create(proto, properties);
    };

    /**
    * Creates a new object with non-writable yet enumerable properties
    *
    * This purpose could be achieved with create_object but this method helps by constructing
    * the parameter object of properties with writable set to false and enumerable set to true.
    */
    function create_protected_object(proto, properties)
    {
        var create_obj_parameter = {};
        _.each(properties, function(elem_value,key) {
            create_obj_parameter[key] = {value: elem_value, enumerable:true, writable:false};
        });
        return create_object(proto, create_obj_parameter);
    };

    function create_uc_object(properties)
    {
        return create_protected_object(uc_object_prototype, properties);
    }

    return create_uc_object({
        createUCObject: create_uc_object,
        createObject: create_object,
        createProtectedObject: create_protected_object
    });
});
