var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');

var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        //processAllFieldsOfTheForm(req, res);
        processFormFieldsIndividual(req, res);
    }
});


function insertText(arquivo, texto)
{
var fs = require('fs');
 
fs.appendFile(arquivo, '\r\n'+texto, function (err) {
 if (err) throw err;
  console.log('Saved!');
  });
 
}

function displayForm(res) {
    fs.readFile('formCadastroEmpresa.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields,
            files: files
        }));
    });
}

function processFormFieldsIndividual(req, res) {
    //Store the data from the fields in your data store.
    //The data store could be a file or database or any other store based
    //on your application.
    var fields = [];
	var index = 0;
	var text = '';
    var form = new formidable.IncomingForm();
	
    form.on('field', function (field, value) {
        console.log(field);
        console.log(value);		
		fields[index] = value;
		index++;
        //fields[field] = value;
    });

    form.on('end', function () {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data 1:\n\n');
		//res.toString(fields.value);
		for (i = 0; i < fields.length; i++) { 
			text = text + fields[i] + "|";
		}
		res.write('123: ' + fields.length + '-' + text);
		insertText('./cadastroEmpresa.txt', text);
		res.end();
        //res.end(util.inspect({
        //    fields: fields
        //}));
    });
    form.parse(req);
}

server.listen(1185);
console.log("server listening on 1185");