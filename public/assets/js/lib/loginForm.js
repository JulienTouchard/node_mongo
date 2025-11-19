const initLoginForm = () => {
    document.forms.login.addEventListener("submit", (event) => {
        event.preventDefault();
        if (document.forms.login.name.value) {
            console.dir(document.forms.login.name.value)
            document.forms.login.submit()
            setTimeout(() => {
                window.location = "http://localhost:3000/ceppouic?name="
                +document.forms.login.name.value;
            }, 1000)
        } else {
            console.log("mechant client tu n's pas mis de pseudo")
        }
    })
}
export { initLoginForm }