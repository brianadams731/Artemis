import { useState } from 'react';
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DroppableStateSnapshot, DropResult } from "react-beautiful-dnd"
import { produce } from "immer";
import { KeyedMutator } from 'swr';

import { IWorkspace, useFetchWorkspaceById } from '../hooks/swr/useFetchWorkspace';
import { postDataAsync } from '../utils/postDataAsync';
import { getEndpoint } from '../utils/apiEndpoints';

import styles from '../styles/Workspace.module.scss';
import { patchDataAsync } from '../utils/patchDataAsync';
import { TicketModal } from '../components/TicketModal';
import { TicketModalState } from '../interfaces/TicketModalState';
import { AnimatePresence } from 'framer-motion';

interface Props {
    id: string;
}


const Workspace = ({ id }: Props): JSX.Element => {
    const [ticketCount, setTicketCount] = useState<number>(5)

    const [ticketModalState, setTicketModalState] = useState<TicketModalState>({ state: "closed" });
    const { workspaceData, isWorkspaceLoading, workspaceHasError, mutateWorkspace } = useFetchWorkspaceById(id);

    const dragEnd = async (result: DropResult, mutate: KeyedMutator<IWorkspace>) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        const sourceBoardId = source.droppableId;
        const destinationBoardId = destination.droppableId;

        const sourceTicketIndex = source.index;
        const destinationTicketIndex = destination.index;
        // Mutated cache here, this is now out of sync with the backend!
        mutate(
            produce<IWorkspace>((draft) => {
                const sourceBoard = draft.boards.find((board) => board.id === sourceBoardId);
                const destinationBoard = draft.boards.find((board) => board.id === destinationBoardId)
                const moveTicket = sourceBoard?.tickets[sourceTicketIndex];

                sourceBoard?.tickets.splice(sourceTicketIndex, 1);
                destinationBoard?.tickets.splice(destinationTicketIndex, 0, moveTicket!);
            })
            , false)
        // TODO: Post Request
        await patchDataAsync(`${getEndpoint("workspace_by_id")}/${id}`, {
            //TODO: Update workspace here
        }, false)
        // TODO: Uncomment when endpoint is created to sync with backend
        //mutate();        
    }

    if (isWorkspaceLoading) {
        // TODO: Add loading spinner
        return <h1>Loading...</h1>
    }
    if (workspaceHasError) {
        console.log(workspaceHasError);
        return <h1>Error</h1>
    }

    return (
        <div className={styles.outerWrap}>
            <AnimatePresence>
                {ticketModalState.state === "edit" && <TicketModal id={ticketModalState.id} title={ticketModalState.title} description={ticketModalState.description} closeModal={() => setTicketModalState({ state: "closed" })} mutateWorkspace={mutateWorkspace} />}
                {ticketModalState.state === "new" && <TicketModal boardId={ticketModalState.boardId} closeModal={() => setTicketModalState({ state: "closed" })} mutateWorkspace={mutateWorkspace} /> }
            </AnimatePresence>

            <div className={styles.wrapper}>
                <DragDropContext onDragEnd={(result) => dragEnd(result, mutateWorkspace)}>
                    {workspaceData.boards.map((board) => (
                        <div key={board.id}>
                            <div className={styles.boardHead}>
                                <button className={styles.addTicket} onClick={async () => {
                                    setTicketModalState({
                                        state: "new",
                                        boardId: board.id
                                    });
                                    
                                    // mutation will happen inside modal, remove this once endpoint is hooked up
                                    mutateWorkspace(
                                        produce<IWorkspace>(draft => {
                                            const sourceBoard = draft.boards.find((item) => item.id === board.id);
                                            sourceBoard?.tickets.push({
                                                id: `ticket${ticketCount + 1}`,
                                                description: `Ticket ${ticketCount + 1}`,
                                            })
                                        })
                                        , false)
                                    setTicketCount(prev => prev + 1);
                                    await postDataAsync(`${getEndpoint("workspace_by_id")}/${id}`, {
                                        // TODO: Add tickets here
                                    })
                                    //TODO: Uncomment out below to sync with backend
                                }}>
                                    +
                                </button>
                                <h2>{board.name}</h2>
                            </div>
                            <Droppable droppableId={board.id}>
                                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps} className={styles.board} style={snapshot.isDraggingOver ? { backgroundColor: '#00F0FF' } : {}}>
                                        {board.tickets.map((ticket, index) => (
                                            <Draggable draggableId={ticket.id} index={index} key={ticket.id}>
                                                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                                    <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className={styles.ticket} style={{ ...provided.draggableProps.style }} onClick={() => {
                                                        setTicketModalState({
                                                            state: "edit",
                                                            id: ticket.id,
                                                            title: ticket.description,
                                                            description: ticket.description,
                                                        });
                                                    }}>
                                                        {ticket.description}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </DragDropContext>
            </div>
        </div>
    )
}

export { Workspace };
