interface TicketModelEdit {
    state: "edit";
    title: string;
    description: string;
    id: string;
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