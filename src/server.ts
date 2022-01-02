import * as http from "http";

export default function(port: number): void {
  http.createServer(function(req, res) {
    res.writeHead(200, {
      "Content-Type": "text/html"
    })
    res.write("<h1>Hello</h1>");
    res.end()
  }).listen(port)
}