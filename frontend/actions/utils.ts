export function clearInputs(form: HTMLFormElement): void {
    const inputs = Array.from(form.querySelectorAll('input:not([type=submit])'));

    inputs.forEach(el => {
        const input = el as HTMLInputElement;
        input.value = '';
    })
}
