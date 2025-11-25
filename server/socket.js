const initSocket = (io,name) => {
    const users = [];
    //console.log(io)
    io.on("connection",(socket)=>{
        console.log(name)
        //console.log(socket)
        socket.on("hello",(res)=>{
            // envoie de la liste des utilisateur au nouveau client
            // connecté
            socket.emit("users",{"users":users}),
            users.push({id:socket.id,name:res.name})
            console.log("reponse ",res)
            // le serveur doit informer les autres utilisateurs connectés
            // de l'arrivée d'un nouveau en passant la liste users mise a jour
            socket.broadcast.emit("newUser",{"users":users});
        })
        socket.on("newMessage",(res)=>{
            console.log("nouveau message ",res)
        })
    })

}
export {initSocket}