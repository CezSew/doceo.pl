export const handleSubmitRegisterForm = (e, history) => {
    e.preventDefault();

    const formElement = document.querySelector(".js-register-form");
    const loginInput: HTMLInputElement = formElement.querySelector('.js-register-login');
    const emailInput: HTMLInputElement = formElement.querySelector('.js-register-email');
    const passwordInput: HTMLInputElement = formElement.querySelector('.js-register-password');
    const password2Input: HTMLInputElement = formElement.querySelector('.js-register-password2');
    const passwordsAreTheSame = arePasswordsTheSame(passwordInput.value, password2Input.value);

    if(!passwordsAreTheSame) {
        clearPasswords(passwordInput,password2Input);
        alert('Powtórzone hasło różni się od pierwszego, spróbuj ponownie');
        return false;
    }

    //send data to backend and wait for response

    alert('Konto zostało pomyślnie utworzone, zostaniesz przekierowany na stronę logowania')
    history.push("/login")
}

const arePasswordsTheSame = (pass1, pass2) => {
    return pass1 === pass2;
}

const clearPasswords = (pass1El, pass2El) => {
    pass1El.value = '';
    pass2El.value = '';
}
