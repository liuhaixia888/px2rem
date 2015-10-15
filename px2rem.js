#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var commander = require('commander');
var argv = process.argv.slice(2);
var cwd = process.cwd();

var patPX = /\d{1,}px/gi;
var patREM = /\d{1,}(.)\d{1,}rem/gi;
var cons = argv[3] || 100;
var result = '';

// 命令执行入口
this.run = function(argv){
    argv.length === 2 ? argv.push('--help') : argv;
    commander.parse(argv)
    return this;
}

commander
	.version(require('./package.json').version)
	.option('-rem', '页面中所有的px转化为rem')
	.option('-px', '页面中所有的rem转化为px')
	.parse(process.argv);

if (!argv.length) {
	return commander.outputHelp();
}

var rfile = path.join(process.cwd(), argv[0]);
var tfile = path.join(process.cwd(), argv[1]);
var unit = argv[2] || '-rem';

//读写文件
var readWriteFile = function(callback){
	fs.readFile(rfile, 'utf-8', function(err, data){
	    if(err){
	        console.log(err);
	    }else{
	    	callback(data);
	    }
	    
	    fs.writeFile(tfile, result, 'utf-8');  
	});	
};

// px转换为rem
if(unit == '-rem'){
	readWriteFile(function(data){
		result = data.replace(patPX,function(num){
            var num = num.replace('px', '');
            var val = num/cons;
            return val + 'rem';
        })		
	});
}

//rem转换为px
if(unit == '-px'){
	readWriteFile(function(data){
		result = data.replace(patREM,function(num){
            var num = num.replace('rem', '');
            var val = num*cons;
            return val + 'px';
        })
	});
}