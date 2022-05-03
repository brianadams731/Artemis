interface TicketModelEdit {
    state: "edit";
    id: string;
    boardId: string;
    description: string;
    comment: string;
    priority: number;
    closeDate: string|null;
}

interface TicketModalNew {
    state: "new";
    boardId: string;
}

interface TicketModelClosed {
    state: "closed";
}

type TicketModalState = TicketModelEdit | TicketModalNew | TicketModelClosed;

export type {TicketModalState };