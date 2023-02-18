let nombre = '';
const inputName = document.getElementById('name');
if (inputName) {
    inputName.addEventListener('input', (event) => {
        const target = event.target as HTMLInputElement;
        nombre = target.value;
        console.log(nombre);
    });
}
