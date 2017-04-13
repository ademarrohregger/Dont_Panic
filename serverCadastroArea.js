var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
require('./dml.js');

function formCadastroArea(req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        //processAllFieldsOfTheForm(req, res);
        processFormFieldsIndividual(req, res);
    }
};


function insertText(arquivo, texto)
{
 
fs.appendFile(arquivo, '\r\n'+texto, function (err) {
 if (err) throw err;
  console.log('Saved!');processAllFieldsOfTheForm
  });
 
}

function displayForm(res) {
    fs.readFile('formCadastroArea.html', function (err, data) {
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

function existeEmpresa (ID)
{
	if (consultaID ('cadastroEmpresa.csv', ID) = 'no lines found')
		return 0;
	else
		return 1;
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
		for (i = 0; i < fields.length; i++) 
		{ 
			res.write(i + ' - ' + fields[i]);

			if (i == (fields.length - 1))
			{
				if (existeEmpresa(fields[i]) != 1)
				{
					rest.write('Erro ao cadastrar Area. Empresa não existe !');
					return;
				}
				text = text + fields[i];
			}
			else
				text = text + fields[i] + "|";
		}

		insertText('./cadastroArea.txt', text);
		res.end();
    });
    form.parse(req);
}