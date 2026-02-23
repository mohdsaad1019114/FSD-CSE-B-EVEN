import http from "http";
const port = 5001;
const users = [
    { id: 1, name: "John", email: "john@example.com" },
    { id: 2, name: "Jane", email: "jane@example.com" },
    { id: 3, name: "Doe", email: "doe@example.com" }
];
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url == "/users" && method == "GET") {
        res.end(JSON.stringify(users));
    }
    else if (url.startsWith("/users/") && method == "GET") {
        const id = url.split("/")[2];
        const user = users.find(u => u.id == id);
        if (!user) {
            res.statusCode = 400;
            console.log(`User id ${id} Not Found`);
            return res.end(`User id ${id} Not Found`);
        }
        console.log(`User id ${id} Found`);
        res.end(JSON.stringify(user));
    }
    else if(url.startsWith("/users/") && method == "PUT") {
        const id = url.split("/")[2];
        let body = "";
        req.on("data", (chunk) => {
            body = body + chunk;
        });
        req.on("end", () => {
        const userIndex = users.findIndex(u => u.id == id);
        if (userIndex == -1) {
            res.statusCode = 400;
            console.log(`User id ${id} Not Found`);
            return res.end(`User id ${id} Not Found`);
        }
        
        const updateddata = JSON.parse(body);
        users[userIndex] = { ...users[userIndex], ...updateddata };
        console.log(`User id ${id} Updated Successfully`)
        res.end(`User id ${id} Updated Successfully`);
    });
    }
    else if (url.startsWith("/users/") && method == "DELETE") {
        const id = url.split("/")[2];
        const userIndex = users.findIndex(u => u.id == id);
        if (userIndex == -1) {
            res.statusCode = 400;
            console.log(`User id ${id} Not Found`);
            return res.end(`User id ${id} Not Found`);
        }
        users.splice(userIndex, 1);
        console.log(`User id ${id} Deleted Successfully`);
        res.end(`User id ${id} Deleted Successfully`);
    }
    else if (url == "/createuser" && method == "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body = body + chunk;
        });
        req.on("end", () => {
            const data = JSON.parse(body);
            if (data.name==null || data.email==null) {
                res.statusCode = 400;
                console.log("Name and Email are required");
                return res.end("Name and Email are required");
            }
            const newUser = {
                id: Date.now(),
                name: data.name,
                email: data.email
            }
            users.push(newUser);
            res.statusCode = 201;
            console.log(`User id ${newUser.id} Created Successfully`);
            res.end(`User id ${newUser.id} Created Successfully`);
        });
    }
    else {
        res.statusCode = 404;
        res.end("Error Page Not Found");
    }
});
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});