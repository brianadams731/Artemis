import { useState } from 'react';
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DroppableStateSnapshot, DropResult } from "react-beautiful-dnd"
import { produce } from "immer";
import { KeyedMutator } from 'swr';

import { IWorkspace, useFetchWorkspaceById } from '../hooks/swr/useFetchWorkspace';
import { getEndpoint } from '../utils/apiEndpoints';

import styles from '../styles/Workspace.module.scss';
import { TicketModal } from '../components/TicketModal';
import { TicketModalState } from '../interfaces/TicketModalState';
import { AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { postDataAsync } from '../utils/postDataAsync';


const Workspace = (): JSX.Element => {
    const { id } = useParams();

    const [ticketModalState, setTicketModalState] = useState<TicketModalState>({ state: "closed" });
    const { workspaceData, isWorkspaceLoading, workspaceHasError, mutateWorkspace } = useFetchWorkspaceById(id!);

    const dragEnd = async (result: DropResult, mutate: KeyedMutator<IWorkspace>) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        const sourceBoardId = source.droppableId;
        const destinationBoardId = destination.droppableId;

        const sourceTicketIndex = source.index;
        const destinationTicketIndex = destination.index;
        const ticketMoved = workspaceData.boards.find((board) => board.id === sourceBoardId)?.tickets[sourceTicketIndex];
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
        await postDataAsync(`${getEndpoint("board_update_ticket")}`, {
            source:{
                boardId: sourceBoardId,
                ticketIndex: sourceTicketIndex,
                ticketId: ticketMoved?.id
            },
            target:{
                boardId: destinationBoardId,
                ticketIndex: destinationTicketIndex
            }
        }, false)
        mutate();        
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
                {ticketModalState.state === "edit" && <TicketModal state={ticketModalState.state} id={ticketModalState.id} boardId={ticketModalState.boardId} description={ticketModalState.description} comment={ticketModalState.comment} closeModal={() => setTicketModalState({ state: "closed" })} mutateWorkspace={mutateWorkspace} />}
                {ticketModalState.state === "new" && <TicketModal state={ticketModalState.state} boardId={ticketModalState.boardId} closeModal={() => setTicketModalState({ state: "closed" })} mutateWorkspace={mutateWorkspace} />}
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
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="75%">
                                        <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/>
                                    </svg>
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
                                                            boardId: board.id,
                                                            description: ticket.description,
                                                            comment: ticket.comment,
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
