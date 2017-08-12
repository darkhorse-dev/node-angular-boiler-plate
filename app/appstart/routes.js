/**
 * Created by alex on 8/12/2017.
 */

var express = require('express');
var fs = require('fs');

module.exports = function(parent,options){
    var verbose = options.verbose;
    fs.readdirSync(__dirname + '/../controllers').forEach(function(name){
        verbose && console.log('\n   %s:',name);
        var obj = require('./../controllers/'+name);
        var name = obj.name || name;
        var prefix = obj.prefix || '';
        var app = express();
        var handler;
        var method;
        var path;

        if(obj.engine){
            app.set('view engine',obj.engine);
        }
        app.set('views',__dirname + '/../controllers/'+name+'/views');
        for(var key in obj){
            if(~['name','prefix','engine','before'].indexOf(key)){
                continue;
            }

            switch (key){
                case'show':
                    method = 'get';
                    path = '/' + name + '/:' + name + '_id';
                    break;
                case 'list':
                    method='get';
                    path = '/' + name + '/:' + name + '_id';
                    break;
                case 'edit':
                    method = 'get';
                    path = '/' + name + '/:' + name + '_id';
                    break;
                case 'create':
                    method = 'put';
                    path = '/' + name + '/:' + name + '_id';
                    break;
                case 'index':
                    method = 'get';
                    path = '/';
                    break;
                case 'login':
                    method = 'get';
                    path = '/' + name + '/' + key;
                    break;
                case 'authenticate':
                    method = 'post';
                    path = '/' + name + '/' + key;
                    break;
                default:
                    method = 'get';
                    path = '/' + name + '/' + key;
                    break;
            }
            handler = obj[key];
            path = prefix + path;

            if(obj.before) {
                app[method](path, obj.before, handler);
                verbose && console.log('    %s %s -> before -> %s', method.toUpperCase(), path, key);
            }else{
                app[method](path,handler);
                verbose && console.log('    %s %s -> %s', method.toUpperCase(), path, key);
            }
        }
        parent.use(app);
    });
};