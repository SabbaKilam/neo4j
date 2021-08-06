////| data and references  |/////
const loginForm = document.getElementById('loginForm');
const btnLogin = document.getElementById('btnLogin');
const inputUsername = document.getElementById('inputUsername');
const inputPassword = document.getElementById('inputPassword');

////| setup listeners  |/////
btnLogin.addEventListener('click', login)

////| event handlers   |/////
async function login(eo){
    const parameters = {
        method: "POST",
        headers: {
            username: inputUsername.value.trim(),
            password: inputPassword.value.trim()
        }
    }
    try{
        const result = await fetch('./login', parameters).then( r => r.text())
        console.log( result );
        document.body.innerHTML = result


    }
    catch(error){}

}
////| helpers   |/////

////| initializatioan  |/////

