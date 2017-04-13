var http = require('http');
var fs = require('fs');
require('./serverCadastroArea.js');

http.createServer(

function (req, res) {

  if(req.url == "/") {
    html = fs.readFileSync("index.html", "utf8");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);  
  }
  
  if(req.url == "/formCadastroArea.html") {
    html = fs.readFileSync("formCadastroArea.html", "utf8");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);  
    //formCadastroArea(req,res);
  }
  
  if(req.url == "/indexArea.html") {
    html = fs.readFileSync("indexArea.html", "utf8");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  } 
  
  if(req.url == "/formEditArea.html") {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var id = '1'; 
    res.end(getFormEditArea(id));
  }
    
  if(req.url == "/formCadastroEmpresa.html") {
    html = fs.readFileSync("formCadastroEmpresa.html", "utf8");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  }
  
  if(req.url == "/indexEmpresa.html") {
    html = fs.readFileSync("indexEmpresa.html", "utf8");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  }
    
  if(req.url == "/formEditEmpresa.html") {
    html = fs.readFileSync("formEditEmpresa.html", "utf8");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  }
  
  if (req.url == "/postLocation") {
  
    console.log("Longitude" + req.headers["lon"]);
    console.log("Latitude" + req.headers["lat"]);
    res.end();
  }

}).listen(8080);


// Retorna a página HTML com os dados do ID 
// TODO mudar isso pra um arquivo js separado
function getFormEditArea(id)
{
    html = fs.readFileSync("formEditArea.html", "utf8");
    var resp = html;
    resp += "<script>var formCadArea = document.getElementById(\"formCadArea\");formCadArea.id_area.value = " + id + ";formCadArea.nome_area.value = \"mock2\";formCadArea.latitude_a.value = \"mock3\";formCadArea.longitude_a.value = \"mock4\";formCadArea.latitude_b.value = \"mock5\";formCadArea.longitude_b.value = \"mock6\";</script>";
    return resp;
}

console.log('Server running at http://localhost:8080/');