import { ITicket } from "./ITicket";

interface IBoard {
    id: string;
    name: string;
    tickets: ITicket[];
}

export type { IBoard };
