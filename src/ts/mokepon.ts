import random from './rockPapper.js';

const buttonReload = document.getElementById('reload');
const yourPet = document.getElementById('yourPet');

const enemyPet = document.getElementById('enemyPet');
const buttonPet = document.getElementById('buttonPet');

const resultado: HTMLParagraphElement = document.getElementById(
    'resultado'
) as HTMLParagraphElement;

const attackPlayer = document.getElementById('attackPlayer');
const attackPC = document.getElementById('attackPC');
const containerMokepons = document.getElementById('containerMokepons');

const containerParrafo = document.getElementById('message');

type TypeAtacks = 'FUEGO' | 'TIERRA' | 'AGUA';
interface Attack {
    type: TypeAtacks;
    weak: TypeAtacks[];
    function: (event: Event) => void;
}
let ataqueJugador: TypeAtacks;
let ataqueEnemigo: TypeAtacks;
let yourPetLife = 3;
let pcPetLife = 3;
const mokepones: Mokepon[] = [];
let turno = 0;
const containerAttacks = document.getElementById('containerAttacks');

const sectionMap = document.getElementById('sectionMap');
const map = document.getElementById('map') as HTMLCanvasElement;
const lienzo = map?.getContext('2d');

const moveUpButton = document.getElementById('moveUp');
const moveLeftButton = document.getElementById('moveLeft');
const moveDownButton = document.getElementById('moveDown');
const moveRigthButton = document.getElementById('moveRigth');
const mapBackground = new Image();
mapBackground.src = '../assets/mokemap.png';
let intervalo: number;
class Attacks {
    constructor(public attacks: Attack[]) {}
    create(attack: Attack) {
        this.attacks.push(attack);
    }
    getbyName(name: TypeAtacks): Attack {
        return this.attacks.find((attack) => attack.type === name) as Attack;
    }

    public get all(): Attack[] {
        return this.attacks;
    }
}
const attacks = new Attacks([]);
const disabledUsedButton = (event: Event) => {
    const element = event.target as HTMLButtonElement;
    element.disabled = true;
};

const atackFire = (event: Event) => {
    ataqueJugador = 'FUEGO';
    disabledUsedButton(event);
    ataqueAleatorioEnemigo();
    createMessage();
};
const atackEarth = (event: Event) => {
    ataqueJugador = 'TIERRA';
    disabledUsedButton(event);
    ataqueAleatorioEnemigo();
    createMessage();
};
const atackWater = (event: Event) => {
    ataqueJugador = 'AGUA';
    disabledUsedButton(event);
    ataqueAleatorioEnemigo();
    createMessage();
};
attacks.create({
    type: 'AGUA',
    function: (event) => atackWater(event),
    weak: ['TIERRA'],
});
attacks.create({
    type: 'FUEGO',
    function: (event) => atackFire(event),
    weak: ['AGUA'],
});
attacks.create({
    type: 'TIERRA',
    function: (event) => atackEarth(event),
    weak: ['FUEGO'],
});
class Mokepon {
    constructor(
        public name: string,
        public foto: string,
        public vida: number,
        public attacks: Attack[],
        public fotoMapa: string,
        public x = 20,
        public y = 30,
        public ancho = 40,
        public alto = 40,
        public mapaFoto = new Image(),
        public velocidadX = 0,
        public velocidadY = 0
    ) {
        this.mapaFoto.src = this.fotoMapa;
    }
    pintarMokepon() {
        lienzo?.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
    }
}

const hipodoge = new Mokepon(
    'hipodoge',
    '../assets/mokepons_mokepon_hipodoge_attack.png',
    3,
    [
        attacks.getbyName('AGUA'),
        attacks.getbyName('AGUA'),
        attacks.getbyName('AGUA'),
        attacks.getbyName('FUEGO'),
        attacks.getbyName('TIERRA'),
    ],
    '../assets/hipodoge.png'
);
const capipepo = new Mokepon(
    'capipepo',
    '../assets/mokepons_mokepon_capipepo_attack.png',
    3,
    [
        attacks.getbyName('TIERRA'),
        attacks.getbyName('TIERRA'),
        attacks.getbyName('TIERRA'),
        attacks.getbyName('FUEGO'),
        attacks.getbyName('AGUA'),
    ],
    '../assets/capipepo.png'
);
const ratigueya = new Mokepon(
    'ratigueya',
    '../assets/mokepons_mokepon_ratigueya_attack.png',
    3,
    [
        attacks.getbyName('FUEGO'),
        attacks.getbyName('FUEGO'),
        attacks.getbyName('FUEGO'),
        attacks.getbyName('AGUA'),
        attacks.getbyName('TIERRA'),
    ],
    '../assets/ratigueya.png'
);
mokepones.push(hipodoge, capipepo, ratigueya);
let yourMokeponSelection: Mokepon;
let enemyMokeponSelection: Mokepon;

const selectEnemyPet = (mokepons: NodeListOf<HTMLInputElement> | null) => {
    let randomPet = random(
        0,
        (mokepons as NodeListOf<HTMLInputElement>).length - 1
    );

    if (!mokepons) {
        return 'error';
    }

    const selection = Array.from(mokepons)[randomPet];
    if (enemyPet) {
        enemyPet.innerHTML = selection.value;
        document.getElementById('selectPet')?.classList.add('none');

        sectionMap?.classList.remove('none');
        const randomEnemy = mokepones.find(
            (mokepon) => mokepon.name === enemyPet.innerHTML
        ) as Mokepon;
        const clone: Mokepon = Object.assign(
            Object.create(Object.getPrototypeOf(randomEnemy)),
            randomEnemy
        );
        enemyMokeponSelection = clone;
        enemyMokeponSelection.x = random(0, map.width);
        enemyMokeponSelection.y = random(0, map.height);
    }
};
const createAttacks = () => {
    if (containerAttacks) {
        const mokeponSelected = mokepones.find(
            (mokepon) => mokepon.name === yourPet?.innerHTML
        );
        if (mokeponSelected) {
            mokeponSelected.attacks.forEach((type) => {
                const button = document.createElement('button');
                button.innerHTML = type.type;
                button.value = type.type;
                button.addEventListener('click', (event: Event) =>
                    type.function(event)
                );
                containerAttacks.appendChild(button);
            });
        }
    }
};
const ataqueAleatorioEnemigo = () => {
    const randomSelect = random(0, enemyMokeponSelection.attacks.length - 1);
    ataqueEnemigo = enemyMokeponSelection.attacks[randomSelect].type;
    enemyMokeponSelection.attacks.splice(randomSelect, 1);
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
    const weakUser = attacks.getbyName(ataqueJugador).weak;
    const winPC = weakUser.some((attack) => {
        return attack === ataqueEnemigo;
    });
    ++turno;
    if (!winPC && ataqueJugador !== ataqueEnemigo) {
        changeLife('pcPetLife');
        return 'ganaste';
    } else if (ataqueJugador === ataqueEnemigo) {
        return 'empate';
    } else {
        changeLife('yourPetLife');
        return 'perdiste';
    }
};

const disableButtons = () => {
    if (containerAttacks) {
        Array.from(containerAttacks.childNodes).map(
            (attack) => ((attack as HTMLButtonElement).disabled = true)
        );
    }
    buttonReload?.classList.remove('none');
};

const resultCombat = () => {
    const parrafo = document.createElement('p');
    let result = '';
    if (pcPetLife > yourPetLife) {
        result = 'Perdiste';
    } else if (pcPetLife < yourPetLife) {
        result = 'Ganaste';
    } else {
        result = 'Empate';
    }
    const text = `Ganaste ${3 - pcPetLife} veces y perdiste ${
        3 - yourPetLife
    }. El resultado de la batalla es: ${result}`;
    if (pcPetLife === 0 || yourPetLife === 0 || turno === 5) {
        parrafo.innerHTML = text;
        disableButtons();
    }
    containerParrafo?.appendChild(parrafo);
};

const createMessage = () => {
    const parrafoPlayer = document.createElement('p');
    const parrafoPC = document.createElement('p');

    parrafoPlayer.innerHTML = ataqueJugador;
    parrafoPC.innerHTML = ataqueEnemigo;
    if ((pcPetLife !== 0 && yourPetLife !== 0) || turno !== 4) {
        resultado.innerHTML = result();
        attackPlayer?.appendChild(parrafoPlayer);
        attackPC?.appendChild(parrafoPC);
    }
    resultCombat();
};

const reload = () => {
    window.location.reload();
};

const detenerMovimiento = () => {
    yourMokeponSelection.velocidadX = 0;
    yourMokeponSelection.velocidadY = 0;
};

const revisarColision = (enemigo: Mokepon, mascota: Mokepon) => {
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const izquierdaEnemigo = enemigo.x;
    const derechaEnemigo = enemigo.x + enemigo.ancho;

    const arribaMascota = mascota.y;
    const abajoMascota = mascota.y + mascota.alto;
    const izquierdaMascota = mascota.x;
    const derechaMascota = mascota.x + mascota.ancho;
    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return;
    }
    detenerMovimiento();
    document.getElementById('selection-attack')?.classList.remove('none');
    document.getElementById('sectionMap')?.classList.add('none');
    clearInterval(intervalo);
};

const pintarCanvas = () => {
    if (!yourMokeponSelection) {
        return;
    }

    if (
        yourMokeponSelection.velocidadX !== 0 ||
        yourMokeponSelection.velocidadY !== 0
    ) {
        revisarColision(enemyMokeponSelection, yourMokeponSelection);
    }
    yourMokeponSelection.x =
        yourMokeponSelection.x + yourMokeponSelection.velocidadX;
    yourMokeponSelection.y =
        yourMokeponSelection.y + yourMokeponSelection.velocidadY;
    lienzo?.clearRect(0, 0, map.width, map.height);
    lienzo?.drawImage(mapBackground, 0, 0, map.width, map.height);
    yourMokeponSelection.pintarMokepon();
    enemyMokeponSelection.pintarMokepon();
};

const moveUp = () => {
    yourMokeponSelection.velocidadY = -5;
};
const moveLeft = () => {
    yourMokeponSelection.velocidadX = -5;
};
const moveDown = () => {
    yourMokeponSelection.velocidadY = 5;
};
const moveRigth = () => {
    yourMokeponSelection.velocidadX = 5;
};

if (moveUpButton && moveLeftButton && moveDownButton && moveRigthButton) {
    intervalo = setInterval(pintarCanvas, 100);
    moveUpButton.addEventListener('mousedown', moveUp);
    moveLeftButton.addEventListener('mousedown', moveLeft);
    moveDownButton.addEventListener('mousedown', moveDown);
    moveRigthButton.addEventListener('mousedown', moveRigth);
    moveUpButton.addEventListener('mouseup', detenerMovimiento);
    moveLeftButton.addEventListener('mouseup', detenerMovimiento);
    moveDownButton.addEventListener('mouseup', detenerMovimiento);
    moveRigthButton.addEventListener('mouseup', detenerMovimiento);
    document.onkeydown = (e) => {
        type Keys = 'ArrowDown' | 'ArrowUp' | 'ArrowLeft' | 'ArrowRight';
        const keypress: Keys = e.key as Keys;
        switch (keypress) {
            case 'ArrowDown':
                moveDown();
                break;
            case 'ArrowUp':
                moveUp();
                break;
            case 'ArrowLeft':
                moveLeft();
                break;
            case 'ArrowRight':
                moveRigth();
                break;
        }
    };
    document.onkeyup = (e) => {
        type Keys = 'ArrowDown' | 'ArrowUp' | 'ArrowLeft' | 'ArrowRight';
        const keypress: Keys = e.key as Keys;
        switch (keypress) {
            case 'ArrowDown':
                detenerMovimiento();
                break;
            case 'ArrowUp':
                detenerMovimiento();
                break;
            case 'ArrowLeft':
                detenerMovimiento();
                break;
            case 'ArrowRight':
                detenerMovimiento();
                break;
        }
    };
}

if (buttonPet) {
    map.width = 320;
    map.height = 240;
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
        containerMokepons?.appendChild(label);
    });
    const mokepons: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('[name="mokepon"]');
    const selectPetPlayer = () => {
        const mokepon: HTMLInputElement | null = document.querySelector(
            '[name="mokepon"]:checked'
        );
        if (!mokepon) {
            return console.log('selecciona un mokepon');
        }
        if (yourPet) {
            yourPet.innerHTML = mokepon.value;
            yourMokeponSelection = mokepones.find(
                (mokepon) => mokepon.name === yourPet?.innerHTML
            ) as Mokepon;
            createAttacks();
        }
        selectEnemyPet(mokepons);
    };
    buttonPet.addEventListener('click', selectPetPlayer);
    buttonReload?.addEventListener('click', reload);
}
