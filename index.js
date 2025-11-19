import express from 'express'
import http from 'http';
import { Server } from "socket.io";
import { initSocket } from './server/socket.js';
const app = express();
const server = http.Server(app);
const port = 3000;
const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:"+port, "http://127.0.0.1:"+port+"/"]
  },
  maxHttpBufferSize: 1e8//100Mo
});
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded());
app.post('/name', (req, res) => {
    if (req.body) {
        console.log(req.body)
        //socket
        
    }

})
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
})
initSocket(io,"Bob");

server.listen(port, "127.0.0.1", (req, res) => {
    console.log("serveur ouvert sur : http://127.0.0.1:" + port)
})