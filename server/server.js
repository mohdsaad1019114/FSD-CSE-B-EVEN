import http from 'http';
import  os, { platform, totalmem } from 'os';

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/' && method=="GET") {
        res.end("Home Page")
    }
    else if (url === '/contact' && method=="GET") {
        res.end("Contact Page")
    }
        else if (url === '/system' && method=="GET") {
            const sysdata={
                platform: platform(),
                architecture: os.arch(),
                cpu: os.cpus().length,
                TotalMemory: os.totalmem(),
                FreeMemory: os.freemem(),
            }
            res.write("System Info")
            res.end()
        }
        else if (url === '/senddata' && method=="POST") {
            let body = "";
            req.on("data", (chunk) => {
                body=body+chunk;
            })
            req.on("end", () => {
                console.log(body, "Data send successfully");
                res.end(body);
            })
        }

    });
    server.listen(5001, () => {
        console.log("Server is running on port 5000");
    });