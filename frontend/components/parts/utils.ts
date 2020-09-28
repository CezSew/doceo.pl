import axios from "axios";

export const handleSubmitRegisterForm = (e, history, setLoading, host) => {
    e.preventDefault();

    const formElement = document.querySelector(".js-register-form");
    const loginInput: HTMLInputElement = formElement.querySelector('.js-register-login');
    const emailInput: HTMLInputElement = formElement.querySelector('.js-register-email');
    const passwordInput: HTMLInputElement = formElement.querySelector('.js-register-password');
    const password2Input: HTMLInputElement = formElement.querySelector('.js-register-password2');
    const passwordsAreTheSame = arePasswordsTheSame(passwordInput.value, password2Input.value);
    const passwordIsNotLongEnough = isPasswordLongerThanValue(passwordInput.value , 5);

    if(!passwordsAreTheSame) {
        clearPasswords(passwordInput,password2Input);
        alert('Powtórzone hasło różni się od pierwszego, spróbuj ponownie');
        return false;
    }

    if(!passwordIsNotLongEnough) {
        clearPasswords(passwordInput,password2Input);
        alert('Hasło musi być dłuższe niż 5 znaków');
        return false;
    }

    axios.post(`${host}/api/register`, {
        name: loginInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        password_confirmation: password2Input.value
    }).then(res => {
        alert('Konto zostało pomyślnie utworzone, zostaniesz przekierowany na stronę logowania')
        history.push("/login")
    }).catch(e => {
        console.log(e)
        alert('Wystąpił błąd, spróbuj ponownie.')
    });
}

export const toggleMobileMenu = () => {
    const menuElement = document.querySelector('.c-header__menu');
    const hamburgerElement = document.querySelector('.c-header__hamburger');

    menuElement.classList.toggle('c-header__menu--mobile-hidden');
    hamburgerElement.classList.toggle('c-header__hamburger--closed');
}

const arePasswordsTheSame = (pass1, pass2) => {
    return pass1 === pass2;
}

const clearPasswords = (pass1El, pass2El) => {
    pass1El.value = '';
    pass2El.value = '';
}

const isPasswordLongerThanValue = (pass, num) => {
    return pass.length > num;
}
