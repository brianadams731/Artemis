import { IBoard } from "./IBoard";

interface BoardModalOpen {
    state: "open";
    board: IBoard;
}

interface BoardModalClosed {
    state:"closed";
}

type BoardModalState = BoardModalOpen | BoardModalClosed;

export type { BoardModalState };
