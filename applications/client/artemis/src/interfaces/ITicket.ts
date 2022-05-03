interface ITicket {
    id: string;
    description: string;
    comment: string;
    priority: number;
    closeDate: string|null;
}

export type { ITicket };
