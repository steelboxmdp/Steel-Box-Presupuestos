const http = require("http"), fs = require("fs"), path = require("path");
const port = process.env.PORT || 3000;
const mime = {".html":"text/html; charset=utf-8",".png":"image/png",".js":"text/javascript",
  ".css":"text/css",".json":"application/json",".webmanifest":"application/manifest+json"};
http.createServer((req, res) => {
  let f = decodeURIComponent((req.url || "/").split("?")[0]);
  if (f === "/" || f === "") f = "/index.html";
  const fp = path.join(__dirname, path.normalize(f).replace(/^(\.\.[\/\\])+/, ""));
  fs.readFile(fp, (e, data) => {
    if (e) { res.writeHead(404, {"Content-Type":"text/plain"}); res.end("Not found"); return; }
    res.writeHead(200, {"Content-Type": mime[path.extname(fp)] || "application/octet-stream", "Cache-Control":"no-cache"});
    res.end(data);
  });
}).listen(port, () => console.log("SteelBox Presupuestos escuchando en puerto " + port));
