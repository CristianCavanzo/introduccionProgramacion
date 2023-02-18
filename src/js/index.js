"use strict";
let nombre = '';
const inputName = document.getElementById('name');
if (inputName) {
    inputName.addEventListener('input', (event) => {
        const target = event.target;
        nombre = target.value;
        console.log(nombre);
    });
}
