const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=__dirname,port=Number(process.env.PORT||4198);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.svg':'image/svg+xml'};
http.createServer((req,res)=>{
 let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return;}
 if(name.endsWith('/'))name+='index.html';
 const file=path.resolve(root,'.'+name),rel=path.relative(root,file);
 if(rel.startsWith('..')||path.isAbsolute(rel)||rel.split(path.sep).some(part=>part.startsWith('.'))){res.writeHead(403).end();return;}
 fs.readFile(file,(error,data)=>{if(error){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('文件不存在');return;}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'}).end(data);});
}).listen(port,'127.0.0.1',()=>console.log('ULAB UI: http://127.0.0.1:'+port+'/'));
