function set_error(element, msg) {
    element.value = "";
    element.classList.add("error_input");
    element.placeholder = msg;
    setTimeout(() => {
      element.classList.remove("error_input");
      element.placeholder = "";
    }, 5000);
}

function redirect(url){
    const link = document.createElement("a");
    link.href = url;
    link.click();
}

function toggleEye(e){

    const inputs = document.querySelectorAll('[input-type="pass"]');

    inputs.forEach(inp=>{
        const field = inp.querySelector('input');
        const img = inp.querySelector('img');
        
        if(img.getAttribute('data-status')==='close'){
            img.src="./assets/eye-open.svg";
            img.setAttribute('data-status',"open")
            field.type = 'text';
        }else{
            img.src="./assets/eye-close.svg";
            img.setAttribute('data-status',"close")
            field.type = 'password';
        }

    })


}

function setToast(title,ctn,type){
    const toast = document.querySelector('.toast');
    const heading = toast.querySelector('h4');
    const content = toast.querySelector('p');

    heading.textContent=title ? title : "";
    content.textContent=ctn ? ctn : "";
    toast.setAttribute('type',type);
    toast.classList.add('toast_active');
    setTimeout(()=>{
        toast.classList.remove('toast_active');
    },4000)
}

function beforeLoad(){
    const welcome = document.querySelector('.welcome');
    
    const key = Object.keys(sessionStorage)[0];
    const user = JSON.parse(sessionStorage.getItem(key));
    
    if(!window.localStorage.getItem(key)) redirect('/sign_in.html')

    welcome.textContent=`Welcome ${user.name ? user.name:""}, This is your personalized Dashboard`;
}

function beforeAuthLoad(){
    const key = Object.keys(sessionStorage)[0];

    if(window.localStorage.getItem(key)) redirect('/index.html')
    
}

function register(e) {
    if (e) e.preventDefault();
    let name = document.querySelector("#full_name");
    let email = document.querySelector("#user_email");
    let pass = document.querySelector("#user_pass");
    let confirm = document.querySelector("#user_confirm");
    let req_email = "";
  
    if (!name.value) return set_error(name, "Please fill this field");
    else if (!email.value) return set_error(email, "Please fill this field");
    else if (!pass.value) return set_error(pass, "Please fill this field");
    else if (!confirm.value) return set_error(confirm, "Please fill this field");
    else if(pass.value!==confirm.value){
        return set_error(confirm, "Password does not match");
    }


    email = email.value;
    name = name.value;
    confirm = confirm.value;
    pass = pass.value;
  
    const btn = document.querySelector(".register_btn");

    if(window.localStorage.getItem(email)) return setToast('Account Exists','Please try with a different email','fail');

    window.localStorage.setItem(email,JSON.stringify({name,email,pass}));
    
    setToast('Account Created','Next step: Login to dashboard','success');

    setTimeout(()=>{
        redirect('/sign_in.html')
    },5000)

}

function login(e){
    if(e) e.preventDefault();

    let email = document.querySelector("#login_email");
    let pass = document.querySelector("#login_pass");

    if (!email.value) return set_error(email, "Please fill this field");
    else if (!pass.value) return set_error(pass, "Please fill this field");

    email=email.value;
    pass=pass.value;

    if(!window.localStorage.getItem(email)) return setToast('Login Failed','No Account with that email','fail');
    
    let user = JSON.parse(window.localStorage.getItem(email))
    
    if(!user.pass || user.pass!==pass) return setToast('Login Failed','Wrong Password','fail');

    setToast('Login Successful','Logging you into the dashboard','success');

    sessionStorage.setItem(user.email,JSON.stringify(user));

    setTimeout(()=>{
        redirect('/index.html')
    },5000)

}