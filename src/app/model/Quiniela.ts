import { Vecino } from "../vecino";
import { Match } from "./Match";

export class Quiniela {
    constructor(
        public vecino: Vecino,
        public partidos: Match[]
    ){}
}