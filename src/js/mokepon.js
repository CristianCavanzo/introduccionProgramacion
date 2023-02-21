import random from './rockPapper.js';
const buttonFire = document.getElementById('buttonFire');
const buttonWater = document.getElementById('buttonWater');
const buttonEarth = document.getElementById('buttonEarth');
const buttonReload = document.getElementById('reload');
const yourPet = document.getElementById('yourPet');
const enemyPet = document.getElementById('enemyPet');
const buttonPet = document.getElementById('buttonPet');
const resultado = document.getElementById('resultado');
const attackPlayer = document.getElementById('attackPlayer');
const attackPC = document.getElementById('attackPC');
const containerMokepons = document.getElementById('containerMokepons');
const containerParrafo = document.getElementById('message');
const typeAtack = ['FUEGO', 'TIERRA', 'AGUA'];
let ataqueJugador;
let ataqueEnemigo;
let yourPetLife = 3;
let pcPetLife = 3;
let opcionesDeMokepones;
const mokepones = [];
class Mokepon {
    constructor(name, foto, vida, atacks) {
        this.name = name;
        this.foto = foto;
        this.vida = vida;
        this.atacks = atacks;
    }
}
const hipodoge = new Mokepon('hipodoge', '../assets/mokepons_mokepon_hipodoge_attack.png', 3, [
    {
        nombre: 'AGUA',
    },
]);
const capipepo = new Mokepon('capipepo', '../assets/mokepons_mokepon_capipepo_attack.png', 3, [
    {
        nombre: 'TIERRA',
    },
]);
const ratigueya = new Mokepon('ratigueya', '../assets/mokepons_mokepon_ratigueya_attack.png', 3, [
    {
        nombre: 'FUEGO',
    },
]);
mokepones.push(hipodoge, capipepo, ratigueya);
const selectEnemyPet = (mokepons) => {
    var _a, _b;
    let randomPet = random(0, (mokepons === null || mokepons === void 0 ? void 0 : mokepons.length) || 3);
    if (!mokepons) {
        return 'error';
    }
    const selection = Array.from(mokepons)[randomPet];
    if (enemyPet) {
        enemyPet.innerHTML = selection.value;
        (_a = document.getElementById('selectPet')) === null || _a === void 0 ? void 0 : _a.classList.add('none');
        (_b = document.getElementById('selection-attack')) === null || _b === void 0 ? void 0 : _b.classList.remove('none');
    }
};
const ataqueAleatorioEnemigo = () => {
    const randomSelect = random(0, 2);
    const atacks = ['FUEGO', 'TIERRA', 'AGUA'];
    ataqueEnemigo = atacks[randomSelect];
};
const changeLife = (container) => {
    const containerLife = document.getElementById(container);
    if (container === 'yourPetLife' && containerLife) {
        --yourPetLife;
        containerLife.innerHTML = String(yourPetLife);
    }
    else if (containerLife) {
        --pcPetLife;
        containerLife.innerHTML = String(pcPetLife);
    }
};
const result = () => {
    const resultUser = typeAtack.findIndex((type) => type == ataqueJugador);
    const resulPC = typeAtack.findIndex((type) => type == ataqueEnemigo);
    const result = resultUser - resulPC;
    if (result === -1 || result === 2) {
        changeLife('pcPetLife');
        return 'ganaste';
    }
    else if (result === 0) {
        return 'empate';
    }
    else {
        changeLife('yourPetLife');
        return 'perdiste';
    }
};
const disableButtons = () => {
    buttonFire.disabled = true;
    buttonWater.disabled = true;
    buttonEarth.disabled = true;
    buttonReload === null || buttonReload === void 0 ? void 0 : buttonReload.classList.remove('none');
    buttonReload === null || buttonReload === void 0 ? void 0 : buttonReload.classList.add('reload');
};
const resultCombat = () => {
    const parrafo = document.createElement('p');
    if (pcPetLife === 0) {
        parrafo.innerHTML = `GANASTE`;
        disableButtons();
    }
    else if (yourPetLife === 0) {
        parrafo.innerHTML = `PERDISTE :c`;
        disableButtons();
    }
    containerParrafo === null || containerParrafo === void 0 ? void 0 : containerParrafo.appendChild(parrafo);
};
const createMessage = () => {
    const parrafoPlayer = document.createElement('p');
    const parrafoPC = document.createElement('p');
    parrafoPlayer.innerHTML = ataqueJugador;
    parrafoPC.innerHTML = ataqueEnemigo;
    if (pcPetLife !== 0 && yourPetLife !== 0) {
        resultado.innerHTML = result();
        attackPlayer === null || attackPlayer === void 0 ? void 0 : attackPlayer.appendChild(parrafoPlayer);
        attackPC === null || attackPC === void 0 ? void 0 : attackPC.appendChild(parrafoPC);
    }
    resultCombat();
};
const atackFire = () => {
    ataqueJugador = 'FUEGO';
    ataqueAleatorioEnemigo();
    createMessage();
};
const atackEarth = () => {
    ataqueJugador = 'TIERRA';
    ataqueAleatorioEnemigo();
    createMessage();
};
const atackWater = () => {
    ataqueJugador = 'AGUA';
    ataqueAleatorioEnemigo();
    createMessage();
};
const reload = () => {
    window.location.reload();
};
if (buttonPet) {
    mokepones.forEach((mokepon) => {
        const name = mokepon.name;
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'mokepon';
        input.id = name;
        input.value = name;
        const label = document.createElement('label');
        label.htmlFor = name;
        label.className = name;
        const p = document.createElement('p');
        p.innerHTML = name;
        label.appendChild(input);
        label.appendChild(p);
        containerMokepons === null || containerMokepons === void 0 ? void 0 : containerMokepons.appendChild(label);
    });
    const mokepons = document.querySelectorAll('[name="mokepon"]');
    const selectPetPlayer = () => {
        const mokepon = document.querySelector('[name="mokepon"]:checked');
        if (!mokepon) {
            return console.log('selecciona un mokepon');
        }
        if (yourPet) {
            yourPet.innerHTML = mokepon.value;
        }
        selectEnemyPet(mokepons);
    };
    if (buttonFire && buttonWater && buttonEarth && buttonReload) {
        buttonFire.addEventListener('click', atackFire);
        buttonWater.addEventListener('click', atackWater);
        buttonEarth.addEventListener('click', atackEarth);
        buttonReload.addEventListener('click', reload);
    }
    buttonPet.addEventListener('click', selectPetPlayer);
}
