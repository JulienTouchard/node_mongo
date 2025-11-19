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
        })
        socket.on("newMessage",(res)=>{
            console.log("nouveau message ",res)
        })
    })

}
export {initSocket}