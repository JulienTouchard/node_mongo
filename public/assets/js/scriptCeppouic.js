const socket = io();
let privateUserId;
// declaration des elements HTML
const sendGlobalMessage = document.getElementById("sendGlobalMessage");
const usersList = document.getElementById("usersList");
const messages = document.getElementById("messages");
const privateMessage = document.getElementById("privateMessage");
const sendPrivateMessage = document.getElementById("sendPrivateMessage");
const privateBtn = document.getElementById("privateBtn");
// elements dediés à ma modale
const close = document.getElementsByClassName("close")[0];
const overlay = document.getElementsByClassName("overlay")[0];
const modale = document.getElementsByClassName("modale")[0];
// recuperation des parametres get de mon url 
let params = new URLSearchParams(document.location.search);
let name = params.get("name");
// function
const updateUser = (res) => {
    let users = res.users;
    usersList.innerHTML = "";
    users.forEach(element => {
        if (element.id !== socket.id) {
            // vider 
            tinyMCE.get('sendprivate').setContent("");
            console.log("element", element.id, "socket", socket.id)
            const li = document.createElement("li");
            li.innerText = element.name;
            usersList.append(li);
            li.addEventListener("click", () => {
                privateUserId = element.id;
                openCloseModale()
            })
        }
    });
}
// a developper car doit gérer 2 fenetres sendPrivateMessage et privateMessage
const openCloseModale = () => { 
    sendPrivateMessage.classList.toggle("hide");
    overlay.classList.toggle("hide");
    sendPrivateMessage.classList.toggle("show");
    overlay.classList.toggle("show");
}
const updateMessage = (res) => {
    let messagesServer = res.messages;
    messages.innerHTML = "";
    messagesServer.forEach((element) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p class="message-name">${element.name}</p>
            <p class="message-content">${element.content}</p>
            <p class="message-date">${moment(element.date).fromNow()}</p>
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
createTiny('#sendprivate');
privateBtn.addEventListener("click", () => {
    let content = tinyMCE.get('sendprivate').getContent();
    //erreur de ma part mais si vous avez read the fucking manual : https://socket.io/docs/v3/emit-cheatsheet/
    socket.emit("privateMessageTo", { secretMessage: content, target: privateUserId })
    openCloseModale()
})
close.addEventListener("click", () => {
    openCloseModale()
})
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
socket.on("messages", updateMessage);
socket.on("newMessageFromServer", updateMessage);
socket.on("secretMessageBofBof", res => {
    console.log(res.secretMessage);
    sendPrivateMessage.classList.add("hide");
    overlay.classList.remove("hide");
    sendPrivateMessage.classList.remove("show");
    overlay.classList.add("show");
    privateMessage.classList.add("show");
    privateMessage.classList.remove("hide");
    privateMessage.innerHTML = res.secretMessage;

})