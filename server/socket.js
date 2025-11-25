const initSocket = (io,name) => {
    let users = [];
    let messages = [];
    //console.log(io)
    io.on("connection",(socket)=>{

        //console.log(socket)
        socket.on("hello",(res)=>{
            // envoie de la liste des utilisateur au nouveau client
            // connecté
            socket.emit("users",{"users":users})
            socket.emit("messages",{messages:messages})
            users.push({id:socket.id,name:res.name})
            socket["name"]=res.name;
            console.log("reponse ",res)
            // le serveur doit informer les autres utilisateurs connectés
            // de l'arrivée d'un nouveau en passant la liste users mise a jour
            socket.broadcast.emit("newUser",{"users":users});
        })
        socket.on("newMessage",(res)=>{
            
            let message ={
                id:socket.id,
                name:socket.name,
                content:res.monMessage,
                date: new Date(),
                //creation d'un token
            }
            messages.push(message);
            console.log("nouveau message ",message);
            //socket.broadcast.emit("newMessageFromServer",{messages:messages});
            io.emit("newMessageFromServer",{messages:messages})
        })
        socket.on("privateMessageTo",(res)=>{
            io.to(res.target).emit("secretMessageBofBof",{secretMessage:res.secretMessage})
        })
        socket.on("disconnect",()=>{
            users = users.filter(value=>value.id!==socket.id);
            // envoie aux clients encore connectés le tableau user mis a jour
            socket.broadcast.emit("userleft",{users:users})
        })
    })

}

export {initSocket}

