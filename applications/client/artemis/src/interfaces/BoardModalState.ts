import { IWorkspace } from "../hooks/swr/useFetchWorkspace";
import { IBoard } from "./IBoard";

interface BoardModalOpen {
    state: "edit";
    board: IBoard;
}

interface BoardModalNew {
    state:"new";
    workspace: IWorkspace;
}

interface BoardModalClosed {
    state:"closed";
}

type BoardModalState = BoardModalOpen | BoardModalClosed | BoardModalNew;

export type { BoardModalState };
