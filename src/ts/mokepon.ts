import random from './rockPapper.js';
const buttonFire = document.getElementById('buttonFire');
const buttonWater = document.getElementById('buttonWater');
const buttonEarth = document.getElementById('buttonEarth');
const buttonReload = document.getElementById('reload');
const yourPet = document.getElementById('yourPet');

const mokepons: NodeListOf<HTMLInputElement> =
    document.querySelectorAll('[name="mokepon"]');
const enemyPet = document.getElementById('enemyPet');
const buttonPet = document.getElementById('buttonPet');

const resultado: HTMLParagraphElement = document.getElementById(
    'resultado'
) as HTMLParagraphElement;

const attackPlayer = document.getElementById('attackPlayer');
const attackPC = document.getElementById('attackPC');

const containerParrafo = document.getElementById('message');

type TypeAtacks = 'FUEGO' | 'TIERRA' | 'AGUA';
const typeAtack: TypeAtacks[] = ['FUEGO', 'TIERRA', 'AGUA'];
let ataqueJugador: TypeAtacks;
let ataqueEnemigo: TypeAtacks;
let yourPetLife = 3;
let pcPetLife = 3;

const selectEnemyPet = () => {
    let randomPet = random(0, 5);

    if (!mokepons) {
        return 'error';
    }

    const selection = Array.from(mokepons)[randomPet];
    if (enemyPet) {
        enemyPet.innerHTML = selection.value;
        document.getElementById('selectPet')?.classList.add('none');
        document.getElementById('selection-attack')?.classList.remove('none');
    }
};

const ataqueAleatorioEnemigo = () => {
    const randomSelect = random(0, 2);
    const atacks: TypeAtacks[] = ['FUEGO', 'TIERRA', 'AGUA'];
    ataqueEnemigo = atacks[randomSelect];
};

const changeLife = (container: 'yourPetLife' | 'pcPetLife') => {
    const containerLife = document.getElementById(container);
    if (container === 'yourPetLife' && containerLife) {
        --yourPetLife;
        containerLife.innerHTML = String(yourPetLife);
    } else if (containerLife) {
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
    } else if (result === 0) {
        return 'empate';
    } else {
        changeLife('yourPetLife');
        return 'perdiste';
    }
};

const disableButtons = () => {
    (buttonFire as HTMLButtonElement).disabled = true;
    (buttonWater as HTMLButtonElement).disabled = true;
    (buttonEarth as HTMLButtonElement).disabled = true;
    buttonReload?.classList.remove('none');
    buttonReload?.classList.add('reload');
};

const resultCombat = () => {
    const parrafo = document.createElement('p');
    if (pcPetLife === 0) {
        parrafo.innerHTML = `GANASTE`;
        disableButtons();
    } else if (yourPetLife === 0) {
        parrafo.innerHTML = `PERDISTE :c`;
        disableButtons();
    }
    containerParrafo?.appendChild(parrafo);
};

const createMessage = () => {
    const parrafoPlayer = document.createElement('p');
    const parrafoPC = document.createElement('p');

    parrafoPlayer.innerHTML = ataqueJugador;
    parrafoPC.innerHTML = ataqueEnemigo;
    if (pcPetLife !== 0 && yourPetLife !== 0) {
        resultado.innerHTML = result();
        attackPlayer?.appendChild(parrafoPlayer);
        attackPC?.appendChild(parrafoPC);
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
    const selectPetPlayer = () => {
        const mokepon: HTMLInputElement | null = document.querySelector(
            '[name="mokepon"]:checked'
        );
        if (!mokepon) {
            return console.log('selecciona un mokepon');
        }
        if (yourPet) {
            yourPet.innerHTML = mokepon.value;
        }
        selectEnemyPet();
    };
    if (buttonFire && buttonWater && buttonEarth && buttonReload) {
        buttonFire.addEventListener('click', atackFire);
        buttonWater.addEventListener('click', atackWater);
        buttonEarth.addEventListener('click', atackEarth);
        buttonReload.addEventListener('click', reload);
    }

    buttonPet.addEventListener('click', selectPetPlayer);
}
