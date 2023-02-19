import random from './rockPapper.js';
type TypeAtacks = 'FUEGO' | 'TIERRA' | 'AGUA';
const typeAtack: TypeAtacks[] = ['FUEGO', 'TIERRA', 'AGUA'];
let ataqueJugador: TypeAtacks;
let ataqueEnemigo: TypeAtacks;
let yourPetLife = 3;
let pcPetLife = 3;
const selectEnemyPet = () => {
    let randomPet = random(0, 5);
    const mokepons: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('[name="mokepon"]');
    if (!mokepons) {
        return 'error';
    }
    const enemyPet = document.getElementById('enemyPet');
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
    const buttonFire = document.getElementById(
        'buttonFire'
    ) as HTMLButtonElement;
    const buttonWater = document.getElementById(
        'buttonWater'
    ) as HTMLButtonElement;
    const buttonEarth = document.getElementById(
        'buttonEarth'
    ) as HTMLButtonElement;
    buttonFire.disabled = true;
    buttonWater.disabled = true;
    buttonEarth.disabled = true;
    document.getElementById('reload')?.classList.remove('none');
    document.getElementById('reload')?.classList.add('reload');
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
    const containerParrafo = document.getElementById('message');
    containerParrafo?.appendChild(parrafo);
};

const createMessage = () => {
    const parrafo = document.createElement('p');
    if (pcPetLife !== 0 && yourPetLife !== 0) {
        parrafo.innerHTML = `tu mascota ataco con ${ataqueJugador}, la mascota del enemigo ataco con ${ataqueEnemigo} - ${result()}`;
        const containerParrafo = document.getElementById('message');
        containerParrafo?.appendChild(parrafo);
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

const buttonPet = document.getElementById('buttonPet');
if (buttonPet) {
    const selectPetPlayer = () => {
        const mokepon: HTMLInputElement | null = document.querySelector(
            '[name="mokepon"]:checked'
        );
        const yourPet = document.getElementById('yourPet');

        if (!mokepon) {
            return console.log('selecciona un mokepon');
        }
        if (yourPet) {
            yourPet.innerHTML = mokepon.value;
        }
        selectEnemyPet();
    };
    const buttonFire = document.getElementById('buttonFire');
    const buttonWater = document.getElementById('buttonWater');
    const buttonEarth = document.getElementById('buttonEarth');
    const buttonReload = document.getElementById('reload');
    if (buttonFire && buttonWater && buttonEarth && buttonReload) {
        buttonFire.addEventListener('click', atackFire);
        buttonWater.addEventListener('click', atackWater);
        buttonEarth.addEventListener('click', atackEarth);
        buttonReload.addEventListener('click', reload);
    }

    buttonPet.addEventListener('click', selectPetPlayer);
}
