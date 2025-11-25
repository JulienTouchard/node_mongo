const socket = io();
// declaration des elements HTML
const sendGlobalMessage = document.getElementById("sendGlobalMessage");
const usersList = document.getElementById("usersList");
// recuperation des parametres get de mon url 
let params = new URLSearchParams(document.location.search);
let name = params.get("name");
// function
const updateUser = (res) => {
    users = res.users;
    usersList.innerHTML = "";
    users.forEach(element => {
        if(element.id !== socket.id){
            console.log("element",element.id,"socket",socket.id)
            const li = document.createElement("li");
            li.innerText = element.name;
            usersList.append(li);
        }
    });
}
// envoie du nom utilisateur au serveur à la première connexion
socket.emit("hello", { name: name })
// utilisation de tinyMCE pour la saisie des messages
tinymce.init({
    selector: '#message',
    plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
        'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons'
    ],
    toolbar: 'undo redo | formatpainter casechange blocks | bold italic backcolor emoticons | ' +
        'alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help'
});
// au clique sur le bonton envoyer du message je recupere le contenu 
// tinyMCE ...
sendGlobalMessage.addEventListener("click", () => {
    let monMessage = tinyMCE.get('message').getContent();
    // ... et l'envoie au serveur
    socket.emit("newMessage", { monMessage: monMessage })
})
// recupération et affichage de la liste de mes
// users
let users;
socket.on("users", (res) => {
    updateUser(res);
})
// un nouvel utilisateur se connecte sur Ceppouic
socket.on("newUser", (res) => {
    updateUser(res);
})
