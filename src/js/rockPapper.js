let player = 0;
let pc = 0;
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const selectionLog = (typeUser, selection) => {
    console.log(`${typeUser} eligio ${selection}`);
};
const game = () => {
    let winPC = 0;
    let winUser = 0;
    const min = 0;
    const max = 2;
    const play = (selectionUser) => {
        let pcSelection = 0;
        pcSelection = random(min, max);
        const result = selectionUser - pcSelection;
        const emojisSelection = ['🪨', '📃', '✂️'];
        selectionLog('user', emojisSelection[selectionUser]);
        selectionLog('pc', emojisSelection[pcSelection]);
        if (winPC === 3 || winUser === 3) {
            return;
        }
        if (result === 1 || result === -2) {
            ++winUser;
            console.log('ganaste');
        }
        else if (result === 0) {
            console.log('empate');
        }
        else {
            ++winPC;
            console.log('perdiste');
        }
        console.log(winUser);
        if (winPC === 3 || winUser === 3) {
            return console.log(`ganaste ${winUser}, perdiste ${winPC}`);
        }
    };
    return play;
};
const selection = () => {
    // 0 ROCK
    // 1 PAPER
    // 2 SCISOR
    let play = game();
    const prueba = (event) => {
        const target = event.target;
        const selection = Number(target.value);
        return play(selection);
    };
    return prueba;
};
const doPlay = selection();
export default random;
