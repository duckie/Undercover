/**
* Core module
*
* The core module provides basic javascript patterns and
* utilities for the other modules. There is nothing about poker in it.
*
*
* The code conventions are:
* - A required module should be prefixed and suffixed by a _, except for UnderscoreJS.
* - A internal variable (closure) has the "boost" naming (this_is_a_name)
* - An public function of a module is camel cased.
* - I dont know yet which convention is good for public value properties 
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
    * This could also be used to optimize depending on the running platform.
    */
    function create_object (proto, properties)
    {
        var create_obj_parameter = {};
        if(_.isObject(properties)) {
            _.each(properties, function(elem_value,key) {
                create_obj_parameter[key] = {value: elem_value, enumerable:true, writable:true};
            });
        }
        return Object.create(proto, create_obj_parameter);
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
        if(_.isObject(properties)) {
            _.each(properties, function(elem_value,key) {
                create_obj_parameter[key] = {value: elem_value, enumerable:true, writable:false};
            });
        }
        return Object.create(proto, create_obj_parameter);
    };

    function create_uc_object(properties)
    {
        return create_protected_object(uc_object_prototype, properties);
    }

    function register_error(id, msg_function)
    {
        this.errors_dic[id] = msg_function;
    }

    /**
    * Basic assertion
    */
    function assert(assertion, error_id) {
        var error = null;
        var that = this;
        if(!assertion) {
            if(_.isUndefined(error_id)) {
                throw {
                    name:'Undercover internal',
                    message: 'assertion failed'
                }
            }
            else {
                throw {
                    name:'Undercover internal',
                    message: _.has(that.errors_dic,error_id) ? that.errors_dic[error_id]() : error_id
                }       
            }
        }
    }

    /**
    * Assumes that the given arguments are numbers
    */
    function integer_comparison(int1, int2)
    {
        return int1 === int2 ? 0 : ( int1 < int2 ? -1 : 1);
    }

    return create_uc_object({
        errors_dic:{},
        assert: assert,
        compareInt: integer_comparison,
        createUCObject: create_uc_object,
        createObject: create_object,
        createProtectedObject: create_protected_object
    });
});
