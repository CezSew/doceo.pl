export const sendForm = (e, formClass) => {
   
    const form = document.querySelector(formClass);

    form.dispatchEvent(new Event("submit"));
}