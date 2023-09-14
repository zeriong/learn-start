const loginForm = document.querySelector('#login-form');
const loginInput = loginForm.querySelector('input');
const greeting = document.querySelector('#greeting');
const logoutBTN = document.querySelector('#log-out');
const USERNAME_KEY = "username";
const HIDE_CLASSNAME = "hide"

function greetingPaint() {
    const username = localStorage.getItem(USERNAME_KEY);
    greeting.innerText = `Hello, ${username}`;
    loginForm.classList.add(HIDE_CLASSNAME);
    greeting.classList.remove(HIDE_CLASSNAME);
    logoutBTN.classList.remove(HIDE_CLASSNAME);
}

loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY,username);
    greetingPaint();
});
logoutBTN.addEventListener("click",(e)=>{
   localStorage.removeItem(USERNAME_KEY);
   greeting.classList.add(HIDE_CLASSNAME);
   loginForm.classList.remove(HIDE_CLASSNAME);
   logoutBTN.classList.add(HIDE_CLASSNAME);
});

const savedUserName = localStorage.getItem(USERNAME_KEY);
if(savedUserName){
    greetingPaint();
}
else{
    loginForm.classList.remove(HIDE_CLASSNAME);
    greeting.classList.remove(HIDE_CLASSNAME);
}