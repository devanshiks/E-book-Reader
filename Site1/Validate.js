const form = document.getElementById('form');
const username = document.getElementById('unm');
const email = document.getElementById('em');
const password = document.getElementById('pwd');
const password2 = document.getElementById('cpwd');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs(){
    const usernameValue =username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(usernameValue === ''){
        setErrorFor(username, 'Username cannot be blank');
    }
    else{
        setSuccessFor(username);
    }

    if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}

    if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	} else {
		setSuccessFor(password);
    }
    
    if(password2Value === '') {
		setErrorFor(password2, ' Confirm Password cannot be blank');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
	} else{
		setSuccessFor(password2);
    }
    

}

function setErrorFor(input, message){
    const ipt = input.parentElement;
    const small = ipt.querySelector('small');

    small.innerText = message;

    ipt.className = 'inputfield error';
}

function setSuccessFor(input) {
	const ipt = input.parentElement;
	ipt.className = 'inputfield success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}