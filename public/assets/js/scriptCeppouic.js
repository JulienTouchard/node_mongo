const socket = io();
// declaration des elements HTML
const sendGlobalMessage = document.getElementById("sendGlobalMessage");
const usersList = document.getElementById("usersList");
const messages = document.getElementById("messages");
const privateMessage  = document.getElementById("privateMessage");
const sendPrivateMessage =  document.getElementById("sendPrivateMessage");
// recuperation des parametres get de mon url 
let params = new URLSearchParams(document.location.search);
let name = params.get("name");
// function
const updateUser = (res) => {
    let users = res.users;
    usersList.innerHTML = "";
    users.forEach(element => {
        if (element.id !== socket.id) {
            console.log("element", element.id, "socket", socket.id)
            const li = document.createElement("li");
            li.innerText = element.name;
            usersList.append(li);
            li.addEventListener("click",()=>{

            })
        }
    });
}
const updateMessage = (res) => {
    let messagesServer = res.messages;
    messages.innerHTML = "";
    messagesServer.forEach((element) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p>${element.name}</p>
            <p>${element.content}</p>
            <p>${moment(element.date).fromNow()}</p>
        `
        messages.append(div);
    })
}
// utilisation de tinyMCE pour la saisie des messages
const createTiny = (component) => {
    tinymce.init({
        selector: component,
        plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
            'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons'
        ],
        toolbar: 'undo redo | formatpainter casechange blocks | bold italic backcolor emoticons | ' +
        'alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help'
    });
    
}
// envoie du nom utilisateur au serveur à la première connexion
createTiny('#message');

socket.emit("hello", { name: name })
// au clique sur le bonton envoyer du message je recupere le contenu 
// tinyMCE ...
sendGlobalMessage.addEventListener("click", () => {
    let monMessage = tinyMCE.get('message').getContent();
    // ... et l'envoie au serveur
    socket.emit("newMessage", { monMessage: monMessage })

})
// recupération et affichage de la liste de mes
socket.on("users", (res) => {
    updateUser(res);
})
// un nouvel utilisateur se connecte sur Ceppouic
socket.on("newUser", (res) => {
    updateUser(res);
})
// un utilisateur s'est deconnecté'
socket.on("userleft", (res) => {
    updateUser(res);
})
socket.on("messages",updateMessage);
socket.on("newMessageFromServer",updateMessage);