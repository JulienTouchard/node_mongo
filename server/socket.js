const initSocket = (io,name) => {
    //console.log(io)
    io.on("connection",(socket)=>{
        console.log(name)
        //console.log(socket)
        socket.on("hello",(res)=>{
            console.log("reponse ",res)
        })
    })
}
export {initSocket}