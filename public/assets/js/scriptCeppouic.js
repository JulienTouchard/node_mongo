const socket = io();
console.log(socket)
let params = new URLSearchParams(document.location.search);
let name = params.get("name"); // is the string "Jonathan"
socket.emit("hello",{name:name})
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