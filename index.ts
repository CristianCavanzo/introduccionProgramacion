import express, { Response, Request } from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
const app = express();
app.use(express.json());

const jugadores: Jugador[] = [];

class Jugador {
    public mokepon: string = '';
    constructor(public id: string) {}
    asignMokepon(mokepon: string) {
        this.mokepon = mokepon;
    }
}

class Mokepon {
    constructor(public name: string) {}
}

app.get('/unirse', (req, res: Response) => {
    const id = uuidv4();
    const jugador = new Jugador(id);
    jugadores.push(jugador);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(jugador);
});

app.options('/mokepon/:id', cors());
app.post('/mokepon/:id', cors(), (req: Request, res: Response) => {
    const jugadorId = req.params.id;
    const name = req.body.mokepon;
    const mokepon = new Mokepon(name);
    jugadores
        .find((jugador) => jugador.id === jugadorId)
        ?.asignMokepon(mokepon.name);

    console.log(jugadores);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(jugadores);
});

app.listen(3000, () => {
    console.log(`Ejecutando http://localhost:3000/`);
});
